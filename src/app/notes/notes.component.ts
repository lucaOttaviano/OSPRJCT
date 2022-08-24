import { Component, OnInit } from '@angular/core';
import { Note } from '../interfaces/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: string[] = [];
  savedNotes: Note[] = [];
  textarea?: HTMLInputElement;
  textareaTitle?: HTMLInputElement;
  modifying: boolean = false;

  idOfNote: number[] = [];

  constructor() { }

  ngOnInit(): void {
    if ('savedNotes' in localStorage) {
      // get the savedNotes array from localStorage and save it as this.savedNotes array
      this.savedNotes = JSON.parse(localStorage.getItem('savedNotes')!);
    }

    for (let i = 0; i < this.savedNotes.length; i++) {
      this.idOfNote[i] = i;
    }
  }

  // push an empty string to make the textarea appear when no notes have been saved yet
  initialNewNote() {
    this.notes.push('');
  }

  // create a new note
  newNote() {

    if (confirm('Do you want to discard changes to create a new note?')) {
      let newNote: Note = {
        title: '',
        text: '',
      };

      this.textarea = document.querySelector('#newNoteField')!;
      this.textareaTitle = document.querySelector('#newNoteFieldTitle')!;

      this.textarea.value = newNote.text;
      this.textareaTitle.value = newNote.title;
      this.modifying = false;

      // clear textfields
      this.textarea.value = '';
      this.textareaTitle.value = '';
      this.styleNote(-1);
    }
  }

  // modify the style of the clicked note card 
  styleNote(i: number) {

    // if the index of the current is != from -1 (and so it exists)
    if (i != -1) {
      // style the clicked note
      let selectedNote = document.getElementById(JSON.stringify(this.idOfNote[i]))!;
      selectedNote.classList.add('modifying');

      let notSelectedNote;
      for (let a = 0; a < this.savedNotes.length; a++) {
        // if the index of the current element is != from i
        if (this.savedNotes.indexOf(this.savedNotes[a]) != i)
          notSelectedNote = document.getElementById(JSON.stringify(this.idOfNote[a]));
        if (notSelectedNote)
          notSelectedNote.classList.remove('modifying');
      }
    }
    else {
      for (let a = 0; a < this.savedNotes.length; a++) {
        let allNotes = document.getElementById(JSON.stringify(this.idOfNote[a]));
        if (allNotes)
          allNotes.classList.remove('modifying');
      }
    }

  }

  // save the current note 
  saveNote() {

    // get textareas from html
    this.textarea = document.querySelector('#newNoteField')!;
    this.textareaTitle = document.querySelector('#newNoteFieldTitle')!;

    // if is a new note
    if (!this.modifying) {
      if (this.textarea && this.textareaTitle) {

        // create a new note : Note
        let newNote: Note = {
          title: this.textareaTitle.value,
          text: this.textarea.value
        }

        // push into the savedNotes array
        this.savedNotes.push(newNote);

        localStorage.setItem('savedNotes', JSON.stringify(this.savedNotes));

        // clean the this.notes array beacause it's useful only to create the first note (and so when the localStorage is empty)
        this.notes = [];

        // clear textfields
        this.textarea.value = '';
        this.textareaTitle.value = '';
      }
    }

    // if it's an existing note that i'm editing
    if (this.modifying) {

      let modifiedNote: Note = {
        title: this.textareaTitle.value,
        text: this.textarea.value
      }

      this.savedNotes[this.temporaryIndex] = modifiedNote;
      localStorage.setItem('savedNotes', JSON.stringify(this.savedNotes));

      // clear textfields
      this.textarea.value = '';
      this.textareaTitle.value = '';
    }
  }

  temporaryIndex: number = 0;

  modifyNote(i: number) {

    this.styleNote(i)

    this.modifying = true;

    // this variable is useful for passing the index to the saveNote method
    // instead of doing it as a parameter that should also being passes in the html 
    this.temporaryIndex = i;

    // get textareas from html
    this.textarea = document.querySelector('#newNoteField')!;
    this.textareaTitle = document.querySelector('#newNoteFieldTitle')!;

    // insert the text of the clicked note into the textarea
    this.textarea.value = this.savedNotes[i].text;
    this.textareaTitle.value = this.savedNotes[i].title;

  }

  deleteNote() {

    if (confirm("Are you sure you want to delete this note?")) {

      this.textarea = document.querySelector('#newNoteField')!;
      this.textareaTitle = document.querySelector('#newNoteFieldTitle')!;

      this.savedNotes.splice(this.temporaryIndex, 1);
      localStorage.setItem('savedNotes', JSON.stringify(this.savedNotes));
      this.modifying = false;

      // clear textfields
      this.textarea.value = '';
      this.textareaTitle.value = '';
    }
  }

}
