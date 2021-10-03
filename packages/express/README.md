# `@servify/express`

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
