# Базовый образ
FROM node:16

# Установка необходимых зависимостей
WORKDIR /app

COPY package.json /app/package.json

RUN npm install

# Копируем проект
COPY . /app

# Команда по умолчанию для запуска hardhat node
CMD ["npx", "hardhat", "node"]
