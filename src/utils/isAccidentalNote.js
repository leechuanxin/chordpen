import NOTES from './note.js';

export default (note) => NOTES.includes(note) && note.includes('#');
