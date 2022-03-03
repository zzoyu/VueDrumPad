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
  callbackDown?: () => boolean;
  callbackUp?: () => boolean;
  isTogglable: boolean;

  constructor(
    key: KeyData,
    callbackDown?: () => boolean,
    callbackUp?: () => boolean
  ) {
    super(undefined, key);
    this.callbackDown = callbackDown;
    this.callbackUp = callbackUp;
    this.isTogglable = true;
  }

  pressDown(callback?: () => void): void {
    if (this.key.state !== KeyState.Pressed && this.isTogglable) {
      if (this.callbackDown?.()) {
        this.key.state = KeyState.Pressed;
        this.isTogglable = false;
        callback?.();
      }
    } else if (this.key.state === KeyState.Pressed && this.isTogglable) {
      this.key.state = KeyState.Idle;
      this.isTogglable = false;
      this.callbackUp?.();
    }
  }

  pressUp(): void {
    this.isTogglable = true;
  }
}
