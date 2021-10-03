# servify

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Collections of builder to improve nodejs server creation

WORK IN PROGRESS

## What is it?

My intention is to create builders for any valid library used in the world, like express and fastify.

Because i have more builders to create for different libraries, i decided to use a monorepo.
And my final decision is to use [lerna](https://lerna.js.org/), in this way the user of this library (when i push on npm registry) can download only the part they needs.

## Why?

When we start a new project we must install dependencies write some code that we are written into previous projects.
So i decided to write a library that remove this steps and bootstrap a new project quickly as possible without repeat usual code.

## @servify/express

This package contains the builders to create [Express.js](https://expressjs.com/) servers easily, without use it directly; for example:

```js
import { Request, Response } from 'express-serve-static-core';
import * as builders from '../../src/express';

const PORT = 3030;

function homeRouteHandler(_: Request, res: Response) {
  res.send(`
    <html>
      <body>
        <h1>It's Aliveeeee!!!!!</h1>
      </body>
    </html>
  `);
}

// eslint-disable-next-line no-console
builders.http()
  .cors()
  .json(/* you can pass bodyParser.OptionsJson */)
  .get('/', homeRouteHandler)
  .listen(PORT, () => { console.log(`Server started, go to http://localhost:${PORT}`); });
```
