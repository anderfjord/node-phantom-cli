'use strict';

/**
 * Package dependencies
 */
var crypto = require('crypto')
  , fs = require('fs');

/**
 * @param Horseman phantomInstance
 * @param string url
 */
module.exports = function (phantomInstance, url) {

  if (!url || typeof url !== 'string') {
    throw 'You must specify a url to take a screenshot';
  }

  console.log('Taking screenshot of: ', url);

  phantomInstance
    .open(url)

    // Optionally, determine the status of the response
    .status()
    .then(function (statusCode) {
      console.log('HTTP status code: ', statusCode);
    })

    // Take the screenshot
    .screenshotBase64('PNG')

    // Save the screenshot to a file
    .then(function (screenshotBase64) {
      
      // Name the file based on a sha1 hash of the url
      var urlSha1 = crypto.createHash('sha1').update(url).digest('hex')
        , filePath = 'screenshots/' + urlSha1 + '.base64.png.txt';

      fs.writeFile(filePath, screenshotBase64, function (err) {
        if (err) {
          throw err;
        }
        console.log('Success! You should now have a new screenshot at: ', filePath);
      });
    })

    // Always close the Horseman instance, or you might end up with orphaned phantom processes
    .close();
};