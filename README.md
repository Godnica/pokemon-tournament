# Pokemon-tournament

Open the terminal in the root of the project, from the root:
```
cd app
```

then launch the docker image for the frontend app application:
```
docker build -t pokemon-app .
```

now let's launch the container:
```
docker run -p 8080:8080 pokemon-app
```

let's now start the backend application in nest returning to the root of the project.
```
cd ../api
```

then we launch the docker for the backend application image via the docker-compose.yml
```
docker-compose up
```

Now you can open your browswe on [localhost:8080](localhost:8080)