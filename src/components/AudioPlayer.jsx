import SoundFontPlayer from 'soundfont-player';
import AudioContext from './AudioContext.jsx';

const NullSoundFontPlayerNoteAudio = {
  stop() {},
};

const NullSoundFontPlayer = {
  play() {
    return NullSoundFontPlayerNoteAudio;
  },
};

const AudioPlayer = () => {
  const audioContext = AudioContext && new AudioContext();

  let soundFPlayer = NullSoundFontPlayer;

  const Player = {
    setInstrument(instrumentName) {
      SoundFontPlayer.instrument(audioContext, instrumentName)
        .then((soundFontPlayer) => {
          soundFPlayer = soundFontPlayer;
        })
        .catch(() => {
          soundFPlayer = NullSoundFontPlayer;
        });
    },
    playNote(note) {
      return soundFPlayer.play(note);
    },
  };

  return Player;
};

export default AudioPlayer;
