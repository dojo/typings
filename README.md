# dojo1-typings

This is a repository of Dojo 1 TypeScript Typings (including Dijit and DojoX).

## Usage

Because Dojo, Dijit and DojoX are such large and complex code bases, the repository
tries to break it down into easier to maintain pieces that also allow easy additions,
modifications, etc.

Each major namespace is broken down into `dojo`, `dijit` and `dojox` directories, with
then the major version number in a sub directory.

The ambient declarations that mirror the Dojo namespaces are indexed via the `index.d.ts`
file located in each directory and the ambient module names are then declared in a single
file for the namespace called `modules.d.ts`.  To utilise in a project, where you are
going to import several modules via an AMD loader, you would likey just need to reference
the `modules.d.ts`.  If you need to modify the names of the ambient modules to match your
runtime environment, then you would copy the `modules.d.ts` and rename all the modules as
required.

### Building

The repositry has a `Gruntfile.js` and a development dependency of [grunt](http://gruntjs.com/)
that can help validate any changes to the typings.  By running `grunt` or `grunt dev` it will
compile the files with `tsc` as well as run `tslint` against the core files.

## Examples

There are examples of how to use the typings in a TypeScript project.  They are located in
the `examples` directory of this repository.

## Limitations

### Typings are global

At the time of this writing (TypeScript 1.7), typings are global and absolute. In order to change module resolution
from `dojo/...` modules.d.ts will need to be updated

### String Literals

The current typings are build around TypeScript 1.7.  TypeScript 1.8 introduced string literal types and there
are improvements that can be made to the typings, several of them noted as comments in the existing typings.

### AMD Plugin Globbing

Currently, TypeScript does not support globbing of AMD modules.  There is an open ticket for this type of support
(see Microsoft/TypeScript#5787).  Until that is done, in order to use a plugin properly, you will have to declare
the ambient module in a projects `.d.ts`.  For example to use `dojo/text` you would want to do something like this:

```typescript
declare module 'dojo/text!./path/to/some.html' {
    const some: string;
    export = some;
}
```

## Contributing

If you wish to contribute to this repository, please see our
[Contributing Guidelines](CONTRIBUTING.md).
