FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Inicia o Next.js em modo produção
CMD ["npm", "start"]