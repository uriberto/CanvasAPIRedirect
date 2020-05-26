## This gives an in-browser interface to hit the canvas API.

The purpose of this repo is just to have a convenient way to test out canvas API calls in-browser.

For CORS reasons, you cannot run client-side javascript to hit the canvas API, so this provides a relay server on cloud functions. That's all it is.

Since it's designed for individual use (and I have no OAuth permissions for it), you have to create and enter your canvas access token (go to settings in canvas to create). Of course you should verify that the code doesn't do anything malicious with your access token (it doesn't). It should be easy to check that no funny business is happening in App.svelte (you only have to check the few lines inside <script> tags) or index.html (which is straight from the svelte-template except for including bulma). And you can just use that App.svelte with the svelte template.


## Deploying your own

You can fork this repo and install firebase with the blaze plan. Create a project and activate functions and hosting in the firebase console.

Then you have to run npm install in the functions folder (I think that'll install the firebase cli tools, but for sure it's needed to get node-fetch). If you want to re-compile the front end from the code in App.svelte, you have to "npm install" and "npm run build".

Then just "firebase deploy" and you should be up and running.

```
