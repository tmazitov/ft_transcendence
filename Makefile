# Makefile for Docker Compose

compose = docker-compose \
	--env-file .env.production \
	-f docker-compose.yml

all:
	@$(compose) up --build -d

build:
	@$(compose) build

up:
	@$(compose) up -d 

up-logs:
	@$(compose) up

logs:
	@$(compose) logs -f

stop:
	@$(compose) stop

clean:
	@$(compose) down
	docker image prune -af

fclean:
	@$(compose)  down -v --remove-orphans
	docker image prune -af
	docker volume prune -f
	docker network prune -f

re: clean
	@$(MAKE) all

dev_compose = docker-compose \
	--env-file development/.env \
	-f development/docker-compose.yml

dev:
	@$(dev_compose) up --build

dev-down:
	@$(dev_compose) down

dev_fclean:
	@$(dev_compose) down -v --remove-orphans
	docker image prune -af
	docker volume prune -f

nuke:
	@docker stop $(docker ps -q)
	@docker rm -f $(docker ps -aq)
	@docker rmi -f $(docker images -q)
	@docker volume rm -f $(docker volume ls -q)
	@docker network prune -f

submodule-update:
	./submodule-update.sh

.PHONY: dev dev-down dev_fclean all build up up-logs logs clean fclean re submodule-update nuke 
