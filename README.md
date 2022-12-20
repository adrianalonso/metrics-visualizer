# 📊 Metrics Visualizer

This repository contains a demo app to visualize some metrics in a timeline chart 📉

## Getting started

This repo contains a Makefile. You can start using this next command:

```
make start
```

This command run all necesary resources in order to start up the application.

When you finish you can execute `make stop` or `make clean` in order to stop or clean all dependencies

## Decisions

### Database

First of all, I had to decide which database was better to resolve the problem. I had not worked before with [`ìnfluxdb`](https://www.influxdata.com/), but I had heard about this database and I really think that this kind of database `(Times Series Database)` could be great for this toybox.

I used the official influxdb **docker** image in order to start up this service easily. I had some issues how to config, and how to integrate new starter data in the project, but finally, researching about their line protocol, I could do a simple generator in order to start database with some fake data.

### Backend

Preferred to use something I felt comfortable with on backend, and since the frontend is also built using typescript, I decided to use `nestjs` to build api.

I have organized the folders using the `hexagonal architecture` folder structure, to show my knowledge about this architecture and their layers. Also I did a simple implementation directly consuming queries against `influxdb` using the **flux** query language.

This query language helps me to aggregate datapoints where there was a large amount.

### Frontend

I have decided to use `NextJS`, in order to show how i work with this framework. I had to take some decissions:

- In fetching layer, I decided to use `react query`. This library helped me to cache and simplify fetching data
- To render the chart I decided use `react-chart`. This library have a lot of kind of charts and it was enough for the time required.
- Also i used scss and css modules in order to create style files with component scoped.

### Finally

It was great build some side project and i hope meet expectations making decisions at different levels.
