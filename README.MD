# Description

This is a project for IAB (internet database applications) course. It's a simple ecommerce system.

## Technologies used

* php + apache
* mysql
* angular
* docker

# Docs

## Running the application

### Running backend

Use the provided ```docker-compose.yaml``` file to run the backend in Docker.
```
docker-compose up 
```

It will spin up a container with Apache, and container with a Mysql database. 

Execute the provided database schema located in ```backend/database_schema```
against the database to set it up. The schema also contains some predefined data.

By default backend is available at ```localhost:8000```

### Running frontend

```
cd frontend 
npm install
npm run start 
```

This will spin up an Angular application that will be by default available at ```localhost:4200```


## Predefined accounts:

| Login | Password | Role |
| ----- | -------- | ---- |
| teryD | teryD | user |
| adam | adam | employee |
| admin | admin | admin |