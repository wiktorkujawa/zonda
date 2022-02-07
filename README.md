# Zonda app

## About
App diplays api data from: https://api.zonda.exchange/rest/trading/orderbook-limited/
Docs are here: https://docs.zonda.exchange/v1.0.4-en/reference/orderbook-limited
Used tech:
- backend: nodejs, typescript, express, axios
- frontend: React, redux, tailwind

## Scripts usage
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run watch`

You can watch server build while making changes

### `npm run dev`
You can watch server from localhost:4000 and client on localhost:3000 without building frontend, server build required( run npm watch or npm build to build server before)

### `npm run build`

Builds react-scripts app and move it to dist folder, than the server is build and saved in dist folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deployment
Page is deployed on https://zonda-app.herokuapp.com/

