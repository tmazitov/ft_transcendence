# Makefile for Docker Compose

build :
	docker-compose build

up :
	docker-compose up -d 

up-logs :
	docker-compose up

down :
	docker-compose down

submodule-update:
	git submodule update --init --recursive
