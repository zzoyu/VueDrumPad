import Sound from "./Sound";
import SoundManager from "./SoundManager";

export default class Beat {
  isOn: boolean;
  sound?: Sound;

  constructor(isOn: boolean, sound?: Sound) {
    this.isOn = isOn;
    this.sound = sound;
  }

  play() {
    this.sound && SoundManager.audioPlay(this.sound.id);
  }
}
