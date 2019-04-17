## FAQ

#### Where is the backend?

The "backend" is serverless and is using Netlify Functions, which are basically AWS Lambda functions.

#### Where is the "historical data" for the last 30 days for each location?
  
I haven't included it in this version of the app, but I'd be happy to add it if you'd like to 🙂. I felt like it would require a separate UI / UX flow as the users looking for forecasts and historical data are fundamentally interested in different things.

## Setup

In order to run the app locally, you'll want to create an .env file with:
```
REACT_APP_DARKSKY_TOKEN=<your token>
REACT_APP_MAPBOX_TOKEN=<your token>
```

## Below is copied straight from the project starter (https://github.com/netlify/create-react-app-lambda)

### Option 1: Starting both servers at once

Most people should be able to get up and running just by running:

```bash
yarn start
```

This uses [npm-run-all](https://github.com/mysticatea/npm-run-all#readme) to run the functions dev server and app dev server concurrently.

### Option 2: Start each server individually

**Run the functions dev server**

From inside the project folder, run:

```
yarn start:lambda
```

This will open a local server running at `http://localhost:9000` serving your Lambda functions, updating as you make changes in the `src/lambda` folder.

You can then access your functions directly at `http://localhost:9000/{function_name}`, but to access them with the app, you'll need to start the app dev server. Under the hood, this uses `react-scripts`' [advanced proxy feature](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#configuring-the-proxy-manually) with the `setupProxy.js` file.

**Run the app dev server**

While the functions server is still running, open a new terminal tab and run:

```
yarn start:app
```

This will start the normal create-react-app dev server and open your app at `http://localhost:3000`.

Local in-app requests to the relative path `/.netlify/functions/*` will automatically be proxied to the local functions dev server.