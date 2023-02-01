# JaM

ToDo:

1.) Configure a process to dump all nba odds for the day into a db (Cloud Function / Lambda Function)

2.) Configure an API to get that data from the db (Kubernetes backend API)

3.) Frontend to call that API and display data from the db (NEXT.js Frontend on either K8s or just  Cloud hosted)

Summary: 
  We are focusing on 3 seperate services to create our larger application. The first will be called on a schedule and will hitting the-odds-api and populating our db, the second will be called by the frontend and serving data from our db, the third will be the frontend that is interacted with and will be calling our api(2). We are going to go 123 as far as implementing these. We need to be able to populate our db with the games of the day, then be able to grab that data, then be able to present that data. From there we will build out functionality where needed, but it will likely follow that process flow.

#How to Build and Deploy Locally
Only needed once:
```
brew install packer
```
#Build using packer instead of docker
```
  pack build --builder=gcr.io/buildpacks/builder:v1 --env=GOOGLE_FUNCTION_SIGNATURE_TYPE=http --env=GOOGLE_FUNCTION_TARGET=listen nba_scores
```
#Run container in a Docker instance, will be available in Docker Desktop application
```
docker run --rm -p 8080:8080 <app-name>
```
