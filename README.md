<h1>Herdsman</h2>
<h2>This game is a test task.</h2>
<h3>Install Node js version at least 16.14.0 <h3>
<h3>Run it:</h3>

```bash 
$ npm install
``` 
```bash 
$ webpack serve
``` 
The game is divided into modules.\
The game starts from the index.ts file.\
The logic for creating individual modules is written in the app.\
The driving module consists of two or three components:
- visual part (view)
- the controller (where the logic above the view is described)
View and controller communicate with each other using an emitter.
Global data should be stored in Proxy.

Enjoy the game :)
