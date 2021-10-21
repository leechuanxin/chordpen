import React, { Fragment, useState, useEffect } from 'react';
import isAccidentalNote from '../utils/isAccidentalNote.js';
import getKeyboardShortcutsForNote from '../utils/getKeyboardShortcutsForNote.js';
import InstrumentAudio from './InstrumentAudio.jsx';
import getNotesBetween from '../utils/getNotesBetween.js';

const isRegularKey = (event) => !event.ctrlKey && !event.metaKey && !event.shiftKey;
const Instrument = ({
  instrumentName,
  startNote,
  endNote,
  renderPianoKey,
  keyboardMap,
}) => {
  const notes = getNotesBetween(startNote, endNote);

  const [state, setState] = useState({
    notesPlaying: [],
  });

  const getNoteFromKeyboardKey = (keyboardKey) => keyboardMap[keyboardKey.toUpperCase()];

  const handleKeyDown = (e) => {
    if (isRegularKey(e) && !e.repeat) {
      const note = getNoteFromKeyboardKey(e.key);
      if (note) {
        setState({ ...state, notesPlaying: [...state.notesPlaying, note] });
      }
    }
  };

  const handleKeyUp = (e) => {
    if (isRegularKey(e) && !e.repeat) {
      const note = getNoteFromKeyboardKey(e.key);
      if (note) {
        setState({
          ...state,
          notesPlaying: state.notesPlaying.filter(
            (notePlaying) => notePlaying !== note,
          ),
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  }, []);

  const onPlayNoteStart = (note) => {
    setState({ ...state, notesPlaying: [...state.notesPlaying, note] });
  };

  const onPlayNoteEnd = (note) => {
    setState({
      ...state,
      notesPlaying: state.notesPlaying.filter(
        (notePlaying) => notePlaying !== note,
      ),
    });
  };

  // rendering piano keys
  return (
    <>
      {notes.map((note) => (
        <Fragment key={note}>
          {renderPianoKey({
            note,
            isAccidentalNote: isAccidentalNote(note),
            isNotePlaying: state.notesPlaying.includes(note),
            startPlayingNote: () => onPlayNoteStart(note),
            stopPlayingNote: () => onPlayNoteEnd(note),
            keyboardShortcut: getKeyboardShortcutsForNote(keyboardMap, note),
          })}
        </Fragment>
      ))}

      <InstrumentAudio
        instrumentName={instrumentName}
        notes={state.notesPlaying}
      />
    </>
  );
};

export default Instrument;
