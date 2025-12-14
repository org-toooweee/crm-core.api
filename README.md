<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Описание

Global CRM - это тото, этого.

## Структура проекта

docker - содержит все композ и другие файлы, включая енв, требуемые для успешного старты приложения. для локальной разработки использовать .env в корне

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