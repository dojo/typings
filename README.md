# dojo/typings

[![Build Status](https://travis-ci.org/dojo/typings.svg?branch=master)](https://travis-ci.org/dojo/typings)
[![npm version](https://badge.fury.io/js/dojo-typings.svg)](http://badge.fury.io/js/dojo-typings)

This is a repository of Dojo 1 TypeScript Typings (including Dijit and DojoX).

Currently, this repository does not include all the typings for Dijit and DojoX, although
Dojo is currently fully covered.  The aim is to cover all of Dijit and continue to accept
any community contributions for DojoX.

For other packages, because Dojo 2 is built on TypeScript its typings are
inherent in its distrubution. The goal for affiliated Dojo 1 projects (like
[dgrid](http://dgrid.io/) and [dstore](http://dstorejs.io/) is that they will include
typings as part of their repository.

## Usage

Because Dojo, Dijit and DojoX are such large and complex code bases, the repository
tries to break it down into easier to maintain pieces that also allow easy additions,
modifications, etc.

Each major namespace is broken down into `dojo`, `dijit` and `dojox` directories, having
the major version number in a sub directory within.  Currently only Dojo 1.11 is included.
These typings should work for most older versions of Dojo post 1.7, though it may
include some functionality that is not present in those older releases.

The ambient declarations that mirror the Dojo namespaces are indexed via the `index.d.ts`
file located in each directory and the ambient module names are then declared in a single
file for the namespace called `modules.d.ts`.  To utilise in a project, where you are
going to import several modules via an AMD loader, you would likely just need to reference
the `modules.d.ts`.  If you need to modify the names of the ambient modules to match your
runtime environment, then you would copy the `modules.d.ts` and rename all the modules as
required.

Basic usage would be to include the `index.d.ts` and likely `modules.d.ts` in files used
either by `tsc` or in your `tsconfig.json` or referenced within your TypeScript files.
The [wiki](https://github.com/dojo/typings/wiki) contains some basic *how to* instructions.

The easiest way to install the typings is via `npm`:

```sh
> npm install dojo-typings --save-dev
```

### Building

The repository has a `Gruntfile.js` and a development dependency of [grunt](http://gruntjs.com/)
that can help validate any changes to the typings.  After cloning the repository and running
`npm install`, you can then run `grunt` or `grunt dev` which will compile the files with
`tsc` as well as run `tslint` against the core files.

## Examples

There are examples of how to use the typings in a TypeScript project located in
the `examples` directory of this repository.

## Limitations

### Typings are global

At the time of this writing (TypeScript 1.7/1.8), typings are global and absolute. In order
to change module resolution from `dojo/...` the `modules.d.ts` will need to be updated.

### String Literals

The current typings are built around TypeScript 1.7.  TypeScript 1.8 introduced string
literal types and there are improvements that can be made to the typings, several of
them noted as comments in the existing typings.

*Note*: while the repository currently uses TypeScript 1.8 as its development dependency
we haven't started using the string literals yet.

## Contributing

Contributions to this repository are very much welcomed! If you wish to contribute to this repository,
please see our [Contributing Guidelines](CONTRIBUTING.md).
