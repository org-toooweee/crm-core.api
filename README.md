<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Описание

Global CRM - программное обеспечение, предоставляющее компании централизованное управление всеми системами, продажами, клиентами и сотрудниками в одном удобном месте. Функционал включает в себя:

1. Авторизация пользователей
2. Воронка продаж, специфичная компании - от подачи заявки на регистрацию, до покупки первого пакета компании. (Подать заявку (Lead) => Обзвонить => Подтвердить => Тестовый пакет => Client => Покупка пакетов)
3. Управление сотрудниками (Регистрация сотрудников по отделам, назначение задач)
4. Управление своим профилем, аватарки, напоминания
5. Интеграция с платежной системой, и в будущем телеграм для уведомлений
6. Управление каталогом пакетов 
7. Удобные чаты с клиентами, между сотрудниками
8. История отношений

## Структура проекта

docker - содержит все композ и другие файлы, включая енв, требуемые для успешного старты приложения. для локальной разработки использовать .env в корне

Некоторые папки немного не гексагональны, и не ддд, но это сделано для удобства. Главное - это комфорт в разработке и поддержке системы, а не слепой путь по книжке крутых архитектур. И еще, структура папок никак не отражает взаимодействие между слоями, и Dependency Rule не нарушен.

## Начало работы

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Stay in touch

- Author - [Ислам Гадиляев](https://t.me/toooweee)
- Исходный код - [GitHub](https://github.com/org-toooweee/crm-core.api.git)

## Commands

1. `docker ps` - list of docker containers
2. `docker image ls` - list of docker images
3. `docker exec -it 'container-name' bash` - open bash in container
4. `docker rm 'name' -f` - removes container
5. `docker image rm 'id'` - removes an image
6. `docker build -t 'name' .` - builds an image from a Dockerfile
7. `docker run -v ${pwd}:/app -p 3000:3000 -d --name crm-core.api crm-core.api-image` - creates container from image, exposes port 3000 and free terminal. binding mount.
8. `cat` - open file 
9. `ls` - list of files
10. `${pwd}` - powershells currentdir
11. `$(pwd)` - linuxs currentdir
12. `docker compose -f docker/compose/docker-compose.yml -f docker/compose/docker-compose.dev.yml up --build`