# Contributing to Type Puzzles

This document describues how to contribute to Type Puzzles.

## Build Script

Please run `watch` npm script to run `webpack-dev-server`. As this app involves a ServiceWorker, you would need to click "Update" button to see newer version of app.

## Adding questions

While any kind of contribution is equally welcome, one of the easiest but still very appreciated way of contributing is to add questions.

The questions are defined in `src/definitions/stages/level-{name}.ts`. You can add your question by appending a `StageDefinition` object to the `stages` array found in these files.

A stage is defined by _question_ (a program with holes) and _options_ (program fragments). Player fills the holes with prepared options.

In addition to these data, the `StageDefinition` also has the `id` field and the optional `author` field. These fields should be filled as noted below.

### Defining question ID

Each question has a unique ID. Currently, the repository owner is using the `uh.v1.l{level}.s{stage}` format where `{level}` is the level number and `{stage}` is the stage number. Stage number is only the order of addition, as questions are shuffled before presented to players.

Each contributor can use their own format, but they are encouraged to keep the IDs unique to them by including their signature (like `uh`).

### Author ID

Each stage can have an optional `author` field which is an author ID.
To define your author ID, add a field to `src/definitions/authors.ts`.
