# Dynastia

[![NPM](https://nodei.co/npm/dynastia.png?downloads=true&stars=true)](https://nodei.co/npm/dynastia/) 

[![Build Status](https://travis-ci.org/opendnd/dynastia.svg?branch=master)](https://travis-ci.org/opendnd/dynastia)

This is a tool for D&D DM's to generate dynasties quickly when making a person's backstory.

## Installation

You will need [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed. Then do:

`npm install -g dynastia`

## Features
Dynastia is used to generate a dynasty to quickly generate a person's history.

### Loading saved files

Once you have saved a file you can load it again.

`dynastia render -i my-file.dyn --verbose`

### Changing the output directory

You can specify a specific output directory, otherwise it will save to `pwd`.

`dynastia generate -o my/output/dir`

## Contributing

Please read our [contributing guide](https://github.com/opendnd/dynastia/blob/master/CONTRIBUTING.md) for more information on contributing to the project.

## License

[MIT](https://github.com/opendnd/dynastia/blob/master/LICENSE)