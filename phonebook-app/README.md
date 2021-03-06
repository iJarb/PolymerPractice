# \<phonebook-app\>

A very simple app with lit-element.

## Setup the project

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Run the app

```
$ npm start
```

## Viewing result
 * http://127.0.0.1:8081

## Running Tests

```
$ npm run test
```
Note: This configuration will test the app with Chrome only, to test on other browsers,
please run `polymer test --npm`.

## Deployment
```
npm run build
```
This command will bundle the app in to `es5`, `es6`, `esm` bundles in `/build` directory.
Each of those bundle can then be deploy into any front-end web server.

### Heroku
* https://git.heroku.com/phonebook-web-component.git
* http://phonebook-web-component.herokuapp.com

## References
* Child element [data binding](https://lit-element.polymer-project.org/docs/templates/databinding)