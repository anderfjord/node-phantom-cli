'use strict';

var Horseman = require('node-horseman')
  , validUrl = require('valid-url')
  , prompt = require('prompt')
  , program = require('commander');

program
    .version('1.0.0')
    .option('-x --action-to-perform [string]', 'The type of action to perform.')
    .parse(process.argv);

var ACTIONS = ['create_repo', 'take_screenshot', 'get_links'];
var PATH_TO_PHANTOM = '/usr/local/bin/phantomjs';


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
        console.log('PHANTOM LOG: ', msg);
    });

    phantomInstance.on('error', function (msg) {
        console.log('PHANTOM ERROR: ', msg);
    });

    return phantomInstance;
};

/**
 * Triggers execution of the appropriate action
 */
var main = function () {

    if (!program.actionToPerform) {
        throw new Error('An action must be specified. Valid actions: ', ACTIONS.join(', '));
    } else if (ACTIONS.indexOf(program.actionToPerform) < 0) {
        throw new Error('Invalid action specified. Valid actions: ', ACTIONS.join(', '));
    } else {
        console.log('Performing action: ', program.actionToPerform);
    }

    var performAction = require('./actions/' + program.actionToPerform)
      , phantomInstance = loadPhantomInstance();

    prompt.start();

    switch (program.actionToPerform) {

        case 'create_repo':
            prompt.get([{
                    name: 'username',
                    description: 'GitHub username',
                    required: true
                }, {
                    name: 'password',
                    description: 'GitHub password',
                    hidden: true,
                    required: true
                }, {
                    name: 'repository',
                    description: 'Repository name',
                    required: true
            }], function (err, result) {
                performAction(phantomInstance, result.username, result.password, result.repository);
            });
            break;

        case 'take_screenshot':
            prompt.get([{
                    name: 'url',
                    description: 'URL to take screenshot of',
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
                    description: 'URL to gather links from',
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
            throw new Error('Invalid action specified. Valid actions: ', ACTIONS.join(', '));
    }
};

/**
 * Runs immediately on script load
 */
main();

