import { useEffect, useState } from 'react';
import AudioPlayer from './AudioPlayer.jsx';

const InstrumentAudio = ({ instrumentName, notes }) => {
  const [instrumentPlayer, setInstrumentPlayer] = useState(null);
  useEffect(() => {
    setInstrumentPlayer(AudioPlayer());
  }, []);

  const setInstrument = () => {
    instrumentPlayer.setInstrument(instrumentName);
  };

  const playNotes = () => {
    if (instrumentPlayer) {
      instrumentPlayer.playNote(notes[0]);
    }
  };

  useEffect(() => {
    if (instrumentPlayer) {
      setInstrument();
      playNotes();
    }
  }, [instrumentPlayer]);

  useEffect(() => {
    if (notes && notes.length > 0) {
      playNotes();
    }
  }, [notes]);

  return null;
};

export default InstrumentAudio;
