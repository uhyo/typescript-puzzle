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

By filling the `author` field, your name is shown as question author when your question is shown to players.

## Adding Hole Types

There are various hole types that can be used as options. Basically, a hole type represents one syntactic construct of TypeScript.

If you want add a new type of hole, do so by modifying files in `src/definitions/holes`.

## 概要（日本語） / Summary in Japanese

どんな貢献ももちろん歓迎ですが、問題の追加による貢献が比較的簡単かつ需要があります。
問題を追加するには、`~/src/definitions/stages`以下のファイルを編集してください。

また、問題を追加する際には自身の著者情報を`~/src/definitions/authors.ts`に追加することをお勧めします。追加した問題が出題される際に問題の著者名が表示されます。

選択肢用に様々な構文 (_hole_) が用意されていますが、もし新たなものを追加したい場合は`~/src/definitions/holes`以下のファイルを編集してください。
