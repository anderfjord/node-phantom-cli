'use strict';

/**
 * Package dependencies
 */
var Horseman = require('node-horseman')
  , validUrl = require('valid-url')
  , fs = require('fs')
  , prompt = require('prompt')
  , program = require('commander');

program
  .version('1.0.0')
  .option('-x --action-to-perform [string]', 'The type of action to perform.')
  .parse(process.argv);

/**
 * Path to the PhantomJS binary
 */
var PATH_TO_PHANTOM = '/usr/local/bin/phantomjs';

/**
 * Stores an array of actions support by this utility framework.
 * Populated on script load based on files present in the 'actions' directory
 */
var supportedActions = [];

/**
 * Loads a Horseman instance to facilitate interaction with PhantomJS
 */
var loadPhantomInstance = function () {

  var options = {
    phantomPath: PATH_TO_PHANTOM,
    loadImages: true,
    injectJquery: true,
    webSecurity: true,
    ignoreSSLErrors: true
  };

  var phantomInstance = new Horseman(options);
  
  phantomInstance.on('consoleMessage', function (msg) {
    console.log('Phantom page log: ', msg);
  });

  phantomInstance.on('error', function (msg) {
    console.log('Phantom page error: ', msg);
  });

  return phantomInstance;
};

/**
 * Triggers execution of the appropriate action
 */
var main = function () {

  if (!program.actionToPerform) {
    throw 'An action must be specified. Supported actions include: ', supportedActions.join(', ');
  } else if (supportedActions.indexOf(program.actionToPerform) < 0) {
    throw 'Invalid action specified. Supported actions include: ', supportedActions.join(', ');
  } else {
    console.log('Performing action: ', program.actionToPerform);
  }

  var performAction = require('./actions/' + program.actionToPerform)
    , phantomInstance = loadPhantomInstance();

  prompt.start();

  switch (program.actionToPerform) {

    case 'create_repo':
      prompt.get([{
          name: 'repository',
          description: 'Enter repository name',
          required: true
      }, {
          name: 'username',
          description: 'Enter GitHub username',
          required: true
        }, {
          name: 'password',
          description: 'Enter GitHub password',
          hidden: true,
          required: true
      }], function (err, result) {
        performAction(phantomInstance, result.username, result.password, result.repository);
      });
      break;

    case 'take_screenshot':
      prompt.get([{
          name: 'url',
          description: 'Enter URL to take screenshot of',
          required: true,
          conform: function (value) {
            return validUrl.isWebUri(value);
          }
      }], function (err, result) {
        performAction(phantomInstance, result.url);
      });
      break;

    case 'get_links':
      prompt.get([{
          name: 'url',
          description: 'Enter URL to gather links from',
          required: true,
          conform: function (value) {
            return validUrl.isWebUri(value);
          }
      }], function (err, result) {
        performAction(phantomInstance, result.url);
      });
      break;

    default:
      phantomInstance.close();
      throw 'Invalid action specified. Supported actions include: ', supportedActions.join(', ');
  }
};

/**
 * Run immediately on script load to determine available actions and attempt to run the specified action
 */
 (function () {
  // Generate an array of supported actions based on the files present in the 'actions' directory
  fs.readdir('./actions', function (err, files) {
    
    files.forEach(function (filename) {
      supportedActions.push(filename.split('.')[0]);
    });

    main();
  });
 })();
