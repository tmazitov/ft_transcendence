# Makefile for Docker Compose

build :
	docker-compose build

up : build
	docker-compose up 
down :
	docker-compose down