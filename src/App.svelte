<script>
let shown = 'app';




let security_code = localStorage.getItem("security_code") || '';
let domain = localStorage.getItem("domain") || 'https://canvas.wisc.edu/api/v1/';
let getorput = 'GET';
let endpoint = '';
let data = '';

let response = ''
let respelt;

$: localStorage.setItem("security_code", security_code)
$: localStorage.setItem("domain", domain)

function submit(){
	let body = {
		security_code,
		domain,
		getorput,
		endpoint
	};
	if(getorput!='GET')	{
		body["data"]=JSON.stringify(JSON.parse(data));
	}
	fetch('https://us-central1-canvas-node-server.cloudfunctions.net/helloWorld', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
	},
    body: JSON.stringify(body) 
  }).then(resp=>resp.json()).then(resp=>{
	  response = resp;
	  console.log('resp: ', resp);
  }).then(resp=>respelt.scrollIntoView()).catch(err=>console.log(err));
}

</script>


<style>
	.active{
		font-weight: bold;
	}
</style>

<nav class="navbar" role="navigation" aria-label="main navigation">




  <div id="navbarBasicExample" class="navbar-menu" >
    <div class="navbar-start">
      <a class="navbar-item" class:active={shown=='app'} on:click={()=>{shown='app'}}>
        App
      </a>

      <a class="navbar-item" class:active={shown=='code'} on:click={()=>{shown='code'}}>
        Code
      </a>

    </div>
  </div>
</nav>


{#if shown=='app'}

<section class="section">
	<div class="container">

		<h1 class="title">This is a user-friendly interface to hit the Canvas API using your own security code.</h1>

		<p>
			<strong>You</strong> should definitely be afraid to share your security code with me. While <strong>I</strong> know that I am not saving your code somewhere, you cannot be so sure.
		</p>
		<p>
			The right solution, if you want to use something like this, is to go clone the github repo and look at both what the front-end and back-end code does. Then, you can spin up your own firebase project. You can see the active parts of the code <a href="" on:click|preventDefault={()=>{shown='code'}}>here</a>.
		</p>
	</div>
</section>


<section class="section">
	<div class="container">

		<div class="field">
		<label class="label">Security Code</label>
		<div class="control">
			<input class="input" type="password" placeholder="Your security code" bind:value={security_code}>
		</div>
		</div>


		<div class="field">
		<label class="label">Canvas Domain</label>
		<div class="control">
			<input class="input" type="text" placeholder="Domain of your canvas server" bind:value={domain}>
		</div>
		</div>



		<div class="field">
		<label class="label">API Endpoint</label>
		<div class="control">
			<input class="input" type="text" placeholder="API endpoint" bind:value={endpoint}>
		</div>
		</div>

		<div class="select">
		<select bind:value={getorput}>
			<option value="GET">GET</option>
			<option value="PUT">PUT</option>
			<option value="POST">POST</option>
		</select>
		</div>

		{#if getorput != 'GET'}
			<div class="field">
				<label class="label">Message</label>
				<div class="control">
					<textarea class="textarea" placeholder="Data to send in JSON" bind:value={data}></textarea>
				</div>
			</div>

		{/if}
		<div class="container has-text-centered">
			<button class="button is-primary" on:click={submit}>Submit</button>
		</div>

	</div>
</section>


<section class="section">
	<div class="container has-text-centered" bind:this={respelt}>

		{#if response!=''}
			<h2 class="title has-text-centered">Your API response:</h2>
			<div class="container has-text-left" style="max-width:970px;overflow-wrap: anywhere;">
				{JSON.stringify(response)}
			</div>
		{/if}
	</div>
</section>

{/if}

{#if shown=='code'}
	<h1 class="title has-text-centered">The important bits of code:</h1>


	<div class="container" style="max-width:970px;overflow-wrap: anywhere;">
		On the front-end, this function submits the form.
		
		<pre><code>
{`function submit(){
	let body = {
		security_code,
		domain,
		getorput,
		endpoint
	};
	if(getorput!='GET')	{
		body["data"]=JSON.stringify(JSON.parse(data));
	}
	fetch('https://us-central1-canvas-node-server.cloudfunctions.net/helloWorld', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
	},
    body: JSON.stringify(body) 
  }).then(resp=>resp.json()).then(resp=>{
	  response = resp;
	  console.log('resp: ', resp);
  }).then(resp=>respelt.scrollIntoView()).catch(err=>console.log(err));
}`}
		</code></pre>
	</div>


		<div class="container" style="max-width:970px;overflow-wrap: anywhere;margin-top:50px;">
		On the back-end, this function redirects the traffic over to canvas and relays the result.
		<pre><code>
{`app.post('/', async (req, res) => {
const url = req.body.domain + req.body.endpoint;
const options = {
	'method': req.body.getorput,
	'headers': {
		'Content-Type': 'application/json',
		'authorization': 'Bearer ' + req.body.security_code,
		'accept': 'application/json'
	},
	'body': req.body.data,
	'timeout': 5000
};
fetch(url, options).then(response=>response.json())
.then(response=>{return res.send(response);})
.catch(err=>{return res.send(err)});
});`}
		</code></pre>
	</div>
	<div class="container" style="max-width:970px;overflow-wrap: anywhere;margin-top:50px;margin-bottom:50px;">
		As a matter of fact, neither of those functions saves your security code anywhere or does anything malicious like change your name in canvas to "Professor McTrusty-Face". But there's no way you could be sure that I'm not, so please do fork the repo and run your own version of this if you intend to use this or any other tool that asks for any of your passwords.
	</div>
{/if}