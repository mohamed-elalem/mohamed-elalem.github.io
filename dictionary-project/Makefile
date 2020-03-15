up:
	docker-compose up -d
down:
	docker-compose down
stop:
	docker-compose stop

restart: stop up

build:
	docker-compose build

rebuild: down build up

import:
	docker cp ./sql/englishdictionary.sql mysql:/tmp
	docker exec -t mysql bash -c 'mysql -u root --password=root dict < /tmp/englishdictionary.sql'
	docker exec mysql rm /tmp/englishdictionary.sql

.PHONY: up down stop restart build rebuild init import