
Provides a utility framework for actions that involve crawling

Requirements -- tested version
============
* [PhantomJS](http://phantomjs.org) -- v2.0.0
* [Node.js](http://nodejs.org/) -- v0.12.7
* [commander](https://www.npmjs.com/package/commander) -- v2.6.0
* [node-horseman](https://www.npmjs.com/package/node-horseman) -- v2.7.0
* [prompt](https://www.npmjs.com/package/prompt) -- v0.2.14
* [valid-url](https://www.npmjs.com/package/valid-url) -- v1.0.9

Install PhantomJS
============
http://phantomjs.org/download.html

Install Node.js
============
https://nodejs.org/en/download/

Install Node Dependencies
============
$ npm install

Usage
============

$ node run.js -x create_repo

> `prompt: GitHub username: <enter GitHub username>`

> `prompt: GitHub password: <enter GitHub password> (does not display)`

> `prompt: Repository name: <enter name of new repository>`


$ node run.js -x get_links

> `prompt: URL to gather links from: <enter valid url>`


$ node run.js -x take_screenshot

> `prompt: URL to take screenshot of: <enter valid url>`
