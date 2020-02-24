# Spotlight
This is a sample project to demostrate full stack development and deployment

The project uses:

* Node 10
* Angular 7
* SyncFusion
* postgres 12
* pgadmin4
* Docker

Project goal:
To generate a process flow diagram supported by a restful server and a postgres database and deploy the project into a hosted environment using Terrafom.

## Timeline of build
* On Thursday 02/20/2020 
##### 7 pm I conceived of this project
Then performed some simple investigatoin on thursday night looking for the poper library to use for the front end
Built a quick investigative project to test out some ideas.
Discovered GoJS but then found it was a bit out of date and not really friendly towards Angular
Further investigation pointed me to SyncFusion's library

* On Frida 02/21/2020 started building
#### 6 am 
started by taking my investigative project from the night before and formalizing it.
Added the libraries, read through a tutorial from SyncFusion and used some of their content
Build up the app to render the basic example JSON objects as a simplistic Flow Chart 

#### Noon 
refactored the prototype to move the flow chart logic and code into its own component.
Added a simplified development JSON based REST server to provide a source to build against
added an angular service to call the rest server and retreive the basic JSON data
Moved the sample JSON to files in a server directory
Wrote a swagger file to describe the REST endpoints needed for the project based on current code

#### 4 pm 
Designed database tables to store the flow chart node and connector data based on the definitons found
in the swagger file and SyncFusions data model. 
Wrote bash script to build and deploy postgres and pgadmin and deploy the SQL files describing the DDL
Wrote SQL files to insert test data records into the schema and tested the loading of that data.

* Saturday 02/22/2020 finished basic full stack
#### 6 am
Finalized deploying the database schema and data and used swagger generator to produce a NodeJs framework 
for the rest server to replace the JSO rest server. Added the new server code to the src directory under server.
Added in the postgres driver and configuration into the rest server and wrote the SQL code to select and update the database
Finalized the REST severs interface to the postgres database and tested through the Swagger UI to make sure it was all working

#### Noon
Updated the Angular front end code to call the REST server endpoints
Modified the REST server to deliver the properly structured objects to match the expected format for SyncFusion
Added in the primary key for the objects into the model to provide a way to look them up when updates were submitted.
* Ran the first successful test of rendering a Flow Chart Diagram based on Database data using REST API server.

#### 4 pm
after the successful test started into the process of deployment coding. Build Dockerfile for each area:
* SpotLight Front End
* Spotlight Back End
* Postgres database
* Postgres Admin Tool pgadmin

Then started into docker-compose build to create a single point of build and deploy for the project.

* Sunday 02/23/2020 
#### 10 am
Built docker-compose to build and deploy all containers 
Added database DDL execution to create tables in fresh database on startup
Added data loading to ensure that the diagram has working nodes in the database after fresh startup
Worked on local kuberentes Rancher deployment to get the docker images to deploy into kubernetes cluster
copied repo to Gitlab from GitHub to use their runners, problem with GitLab free tier account locked repository in read only mode

```
docker-compose up --build
Starting spotlight_postgres_1
Starting spotlight_pgadmin_1
Creating spotlight_spotlight-be_1
Creating spotlight-fe
Starting spotlight_spotlight-be_1
Starting spotlight-fe
```
#### 4 pm
Resolved javascript event capture for node moves
Fixed minor cors error when calling POST and PUT
Updating database based on new coordinates of FlowNode object based on event firing, calling service and executing update sql
tested updating from the Swagger page, experiment to add new node to diagram

* Monday 02/24/2020 
#### 7 am
Clean up docker compose and test to ensure everything is working as expected
   found defects in some node types movement data being incorrect
   throwing console errors for grid based click events
Worked on Rancher Kubernetes deployment