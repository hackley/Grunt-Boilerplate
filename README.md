Grunt Boilerplate
===========

Quick set up for projects using a simple Grunt workflow.

------

## Workflow

#### Getting Set Up

This project uses a Grunt workflow. To get started, download the necessary dependencies.

```npm install```


#### Making Changes

All source files are located in the `_src/` directory. You should only be making changes here.

To view your changes, fire up the local server...

```grunt server```

...and head to `locahost:9000`. Grunt will compile your Sass / Coffeescript files as you edit them, refreshing your browser automatically.



## Deploying

The Grunt tasks will compile a deployment-ready version of the project for you. Just type:

`grunt build`

This exports to the `_build/` directory.