Сборка Docker-образа:

docker build -t my-vite-react-app .
Запуск Docker-контейнера:

docker run -p 3000:3000 -p 4173:4173 my-vite-react-app