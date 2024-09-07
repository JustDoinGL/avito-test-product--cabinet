# Используем официальный образ Node.js 20
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock, если используете Yarn)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Указываем команду для запуска приложения и json-server
CMD ["npm", "run", "dev"]

# Открываем порты, на которых будут работать приложение и json-server
EXPOSE 3000 4173