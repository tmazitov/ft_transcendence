# Makefile for Docker Compose

prod:
	docker-compose \
		--env-file nginx/production/.env.production \
		-f nginx/production/docker-compose.yml \
		up --build
build :
	docker-compose build

up :
	docker-compose up -d 

up-logs :
	docker-compose up

down :
	docker-compose down

submodule-update:
	./submodule-update.sh

.PHONY: prod build up up-logs down submodule-update