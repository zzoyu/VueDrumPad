import Sound from "./Sound";
import SoundManager from "./SoundManager";

export enum KeyState {
  Idle,
  Pressed,
}
interface KeyData {
  state: KeyState;
  readonly name: string;
}

export default class Key {
  sound?: Sound;
  key: KeyData;

  constructor(sound: Sound | undefined, key: KeyData) {
    this.sound = sound;
    this.key = key;
  }

  pressDown() {
    if (this.key.state !== KeyState.Pressed) {
      this.key.state = KeyState.Pressed;
      this.sound && SoundManager.audioPlay(this.sound.id);
    }
  }

  pressUp() {
    this.key.state = KeyState.Idle;
  }
}

export class SpecialKey extends Key {
  callback: () => void;

  constructor(sound: Sound, key: KeyData, callback: () => void) {
    super(sound, key);
    this.callback = callback;
  }

  pressDown(): void {
    if (this.key.state !== KeyState.Pressed) {
      this.key.state = KeyState.Pressed;
      this.callback?.();
    }
  }
}
