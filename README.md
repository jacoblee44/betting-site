# katon

## Getting started

### node

A specific node version must be used. Make sure to install `nvm` and run the following command before working with the project:

```bash
nvm install && npm i -g yarn # Only the first time you use the project
nvm use # Every time you open a terminal in the project
```

### VSC Extensions

Install the recommended extensions in Visual Studio Code.

### Installation

1. Switch to the `scripts` directory and run `yarn install`

## Commands

Use the `./run` command to access scripts to manage the project. For example:

```bash
./run prettier:check
```

## Running the project

To run the complete project in docker, use the following command:

```bash
./run docker:start
```

You can temporarily pause the project with `docker:stop`, or remove it completely using `docker:down`.

Use `./run shell:php` to start a shell inside the laravel php docker container.
