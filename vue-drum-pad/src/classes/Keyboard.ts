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
  isTogglable: boolean;

  constructor(key: KeyData, callback: () => void) {
    super(undefined, key);
    this.callback = callback;
    this.isTogglable = true;
  }

  pressDown(): void {
    if (this.key.state !== KeyState.Pressed && this.isTogglable) {
      this.key.state = KeyState.Pressed;
      this.isTogglable = false;
      this.callback?.();
    } else if (this.key.state === KeyState.Pressed && this.isTogglable) {
      this.key.state = KeyState.Idle;
      this.isTogglable = false;
    }
  }

  pressUp(): void {
    this.isTogglable = true;
  }
}
