#!make
include .env

INFLUX_DB_CONTAINER_OUTPUT_DIR = /home/influxdb/series.csv 

data/series.csv: 
	sh ./generator.sh

dcu:
	docker compose up -d
	@sleep 3 | echo "Waiting docker compose up..."

load_series: data/series.csv dcu
	docker compose exec influxdb influx write dryrun -b ${INFLUX_DB_BUCKET} -f ${INFLUX_DB_CONTAINER_OUTPUT_DIR} 
	docker compose exec influxdb influx write -b ${INFLUX_DB_BUCKET} -f ${INFLUX_DB_CONTAINER_OUTPUT_DIR}

backend/node_modules:
	cd backend && npm install

backend_deps: ./backend/node_modules

backend_start: backend_deps
	echo "Launching backend..."
	cd backend && npm run start --silent &

frontend/node_modules:
	cd frontend && npm install 

frontend_deps: ./frontend/node_modules

frontend_start: frontend_deps
	cd frontend && npm run dev

start: load_series backend_start frontend_start
	echo "Running on http://localhost:3000"

stop: 
	docker compose down

clean: stop 
	docker volume ls | awk '$$2 == "factorial_data_influxdb" {print $$2}' | xargs -L1 docker volume rm
	rm -rf data/series.csv || true
	rm -rf backend/node_modules
	rm -rf frontend/node_modules