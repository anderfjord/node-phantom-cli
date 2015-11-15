'use strict';

/**
 * @param Horseman phantomInstance
 * @param string username
 * @param string password
 * @param string repository
 */
module.exports = function (phantomInstance, username, password, repository) {

    if (!username || !password || !repository) {
        throw 'You must specify login credentials and a repository name';
    }

    repository = repository.replace(/\s+/, '-');

    console.log('Creating repository: ', repository);

    phantomInstance
        .open('https://github.com/login')

        // Optionally, determine the status of the response
        .status()
        .then(function (statusCode) {
            console.log('HTTP status code: ', statusCode);
        })

        // Fill out the login form and submit it
        .type('input[name="login"]', username)
        .type('input[name="password"]', password)
        .click('input[name="commit"]')
        
        // Wait for the submission response page
        .waitForNextPage()
        
        // Optionally, retrieve any cookies that were set
        .cookies()                                      
        .then(function (cookies) {
            console.log('Cookies: ', cookies);
        })

        // Navigate to the create repository page, enter the repository name, and submit the form
        .click('a.new-repo')
        .waitForNextPage()
        .type('input#repository_name', repository)
        .click('button:contains("Create repository")')

        // Wait for the submission response page
        .waitForNextPage()
        .then(function () {
            console.log('Success! You should now have a new repository at: ', 'https://github.com/' + username + '/' + repository);
        })

        // Always close the Horseman instance, or you might end up with orphaned phantom processes
        .close();
};