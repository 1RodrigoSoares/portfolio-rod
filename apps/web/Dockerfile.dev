# Imagem base com Node
FROM node:18

# Cria a pasta de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

COPY . /app

# Expõe a porta usada pelo Next.js
EXPOSE 3000

# Comando padrão ao rodar o container
CMD ["npm", "run", "dev"]