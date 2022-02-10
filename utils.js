import fs from "fs";
import chalk from "chalk";

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notesData.json");
    const notesJSON = dataBuffer.toString();
    return JSON.parse(notesJSON);
  } catch (err) {
    return [];
  }
};

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notesData.json", notesJSON);
};

export const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note Added"));
  } else {
    console.log(chalk.red.inverse("Note Title Found"));
  }
};

export const removeNote = (title) => {
  const notes = loadNotes();
  const afterRemoval = notes.filter((note) => !(note.title === title));
  if (notes.length - 1 === afterRemoval.length) {
    saveNotes(afterRemoval);
    console.log(chalk.green.inverse("Note Removed"));
  } else {
    console.log(chalk.red.inverse("No Note Found"));
  }
};

export const listNotes = () => {
  const notes = loadNotes();
  if (notes.length != 0) {
    console.log(chalk.green.inverse("Your Notes"));
    const notesTitle = notes.map((note) => note.title);
    for (let i = 0; i < notesTitle.length; i++) {
      console.log(`${i + 1}. ${notesTitle[i]}`);
    }
  } else {
    console.log(chalk.red.inverse("No Note Found"));
  }
};

export const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.green.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("No Note Found"));
  }
};
