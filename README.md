
Provides a CLI micro-framework for actions that involve crawling

Requirements
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

> `prompt: Enter repository name:`

> `prompt: Enter GitHub username:`

> `prompt: Enter GitHub password: (does not display)`

============

$ node run.js -x get_links

> `prompt: Enter URL to gather links from:`

OR:

$ node run.js -x get_links --url https://www.example.com

============

$ node run.js -x take_screenshot

> `prompt: Enter URL to take screenshot of:`

OR:

$ node run.js -x take_screenshot --url https://www.example.com
