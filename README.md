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

## Examples

There are examples of how to use the typings in a TypeScript project.  They are located in
the `examples` directory of this repository.

## Contributing

If you wish to contribute to this repository, please see our
[Contributing Guidelines](CONTRIBUTING.md).
