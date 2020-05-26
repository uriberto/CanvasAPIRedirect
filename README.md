#This gives you an in-browser interface to hit the canvas API.

Since it's designed for individual use, you have to create and enter your canvas access token (go to settings in canvas to create). 

## Deploying your own

You can fork this repo and install firebase. Create a project and activate functions and hosting

Then you have to run npm install in the functions folder. If you want to re-compile the front end from the code in App.svelte, you have to "npm install" and "npm run build".

Then just "firebase deploy" and you should be up and running.

```
