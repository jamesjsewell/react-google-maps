# SETUP

Note that this was my submission to a coding challenge. the api was provided by the author of the challenge and it consumed mapquest. The frontend portion of this project can easily be modified to read directly from the googlemaps api for geolocation data

## Frontend

create a file in the `src` folder called `credentials.ts` and add this code to it
`export const MAPS_API_TOKEN = 'your_googlemaps_api_token'`

run `npm install` from the root directory of this project

run `npm start` here after running it in the backend folder, it will open a tab on http://localhost:3000/ i set the api server to run on 3001

## Backend

( these are instructions for when i had the api included, since i didn't write that code i removed it from this project )

create a file called `.env` in the folder called `backend` and add this code to it

```
# Backend Env
DB_USER=yourMongoUser
DB_PASSWORD=yourMongoPass
DB_SERVER=yourMongoServer
MQ_API_KEY=YourMapQuestKey
```

run `npm install` from this folder and `npm start` ( i changed the port to 3001 since react is on 3000 by default)

# Todo:

- add tween animation for transitioning between searches
- switch to using a library to handle googlemaps so that react components can be placed on the map

## Learn More About CREATE REACT APP

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
