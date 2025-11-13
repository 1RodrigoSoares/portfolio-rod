resource "aws_vpc" "main" {
  cidr_block           = "10.123.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "PortfolioVPC"
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.123.1.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "PortfolioPublicSubnet"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "PortfolioIGW"
  }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "PortfolioPublicRT"
  }
}

resource "aws_route" "default_route" {
  route_table_id         = aws_route_table.public_rt.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.igw.id
}

resource "aws_route_table_association" "public_rt_assoc" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_security_group" "web_sg" {
  name        = "PortfolioWebSG"
  description = "Allow HTTP and SSH traffic"
  vpc_id      = aws_vpc.main.id

  #Acesso ssh
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["186.235.99.148/32"]
  }

  #Acesso http
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  #Acesso https
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  #Acesso 3000
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_key_pair" "deployer_key" {
  key_name   = "deployer-key"
  public_key = file("~/.ssh/ec2-portfolio-key.pub")
}

resource "aws_instance" "portfolio_web" {
  ami                         = data.aws_ami.latest_ubuntu.id
  instance_type               = "t2.micro"
  subnet_id                   = aws_subnet.public_subnet.id
  vpc_security_group_ids      = [aws_security_group.web_sg.id]
  key_name                    = aws_key_pair.deployer_key.key_name
  user_data                   = file("userdata.tpl")
  associate_public_ip_address = true

  tags = {
    Name = "PortfolioWebServer"
  }
}

resource "aws_eip" "static_ip" {
  depends_on = [aws_internet_gateway.igw]
  tags = {
    Name = "meu-ip-fixo-portfolio"
  }
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.portfolio_web.id
  allocation_id = aws_eip.static_ip.id
}