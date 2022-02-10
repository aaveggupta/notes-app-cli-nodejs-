import chalk from "chalk";
import yargs from "yargs";
import fs from "fs";
import { addNotes, removeNote, listNotes, readNote } from "./utils.js";

// Customize your app version
yargs.version("1.1.0");

// Add a new note
yargs.command({
  command: "addnote",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "New Note",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Notes Body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (args) => {
    addNotes(args.title, args.body);
  },
});

// Removing a note
yargs.command({
  command: "removenote",
  describe: "removing a note",
  builder: {
    title: {
      describe: "Remove a note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (args) => {
    removeNote(args.title);
  },
});

// List out all notes
yargs.command({
  command: "listnotes",
  describe: "list out all notes",
  handler: () => {
    listNotes();
  },
});

// Reading a note
yargs.command({
  command: "readnote",
  describe: "read a note",
  builder: {
    title: {
      describe: "read body by supplying title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (args) => {
    readNote(args.title);
  },
});

yargs.parse();
