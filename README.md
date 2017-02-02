The Library
===

## Installation

Requirements:
* Node >= 6.9

Instructions:
* `git clone https://github.com/luishdz1010/the-library`
* `cd the-library`
* `yarn install` or `npm install`
* `yarn start` or `npm start`

The web application will be available at [http://localhost:3000](http://localhost:3000).

## Front only build

For building the front artifacts to disk, use `npm run build`, assets will be at `./dist` folder.

Build flags:
* `--env.prod` Minify resulting assets
* `--env.maps` Generate JavaScript maps

Example:

`npm run build -- --env.prod --env.maps` Generates a minified (production ready) build with maps. (Might take a while).
