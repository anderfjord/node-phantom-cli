
# Crawling on command using Node.js
Intro paragraph briefly explains what the tutorial demostrates: how to build a simple CLI framework for running one-off crawls. Touches on the major technologies involved (Node.js, PhantomJS, and Horseman).

### Setting up a command-line framework
- Outlines the basic structure and usage of the CLI framework for running one-off crawls.
- Touches on technologies that are specific to the command-line (prompt and commander).
- Explains briefly what is required to define a new action, and how we leverage this to run crawls on command.

### Getting familiar with Horseman
- Discusses the Horseman package in a bit more detail, highlighting some of its features.
- Walks the user through adding a basic crawling action to the framework. This would more or less be a “hello world” that uses Horseman (i.e. PhantomJS) to hit a url and print out its status code.

### Chaining Horseman methods for complex interactions
- Focuses on chaining Horseman methods together to perform complex interactions.
Discusses the “create repo” action.

### Crawling to gather data
- Focuses on techniques for gathering data vs interacting with a page.
Discusses the “get links” and “take screenshot” actions.

### Conclusion
- Brief review of what was covered.
- Thoughts on expanding and scaling such a system.
- Briefly touch on things to keep in mind (i.e. legality, ethics, don’t DDoS anybody’s server, etc)
