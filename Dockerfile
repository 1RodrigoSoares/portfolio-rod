FROM node:18

# Argumentos que serão passados no build
ARG NEXT_PUBLIC_DATADOG_APP_ID
ARG NEXT_PUBLIC_DATADOG_CLIENT_TOKEN

# Expor as variáveis como ENV para que o Next.js as acesse
ENV NEXT_PUBLIC_DATADOG_APP_ID=$NEXT_PUBLIC_DATADOG_APP_ID
ENV NEXT_PUBLIC_DATADOG_CLIENT_TOKEN=$NEXT_PUBLIC_DATADOG_CLIENT_TOKEN

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]