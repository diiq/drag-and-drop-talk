# Circonference Frontend

## Setup

You'll need npm (> 3.0) and node (> 4.2.1)  already installed.

To install dependencies, run the following:

```
$ npm install
```

## Development

Components are self-contained; specs, sub-components, etc, all live inside the directory for a component.

To run a dev server,

```
$ npm start
```

A browser window should open with the app happily running on it.


## Testing

`$ npm test` will run unit tests once in a browser.

`$ npm test -- --watch` (note the extra dashes) will watch for file changes and re-run the tests in PhantomJS. Note that phantomjs does not allow for sourcemapping; so if your tests have errors, it can be useful to connect a browser to the karma server, or else run the one-shot tests (as above) to get an actual file and line number.


## Deployment

Make sure you've got aws-cli installed, and set up with a 'circonference' profile. Then:

`$ npm run deploy`

## Generators

```
$ npm run generate -- component

$ npm run generate -- service

$ npm run generate -- module

$ npm run generate -- pipe
```

These commands will ask a few questions then build a scaffold for you to build from.
