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
  recordCallback: () => void;

  constructor(
    sound: Sound | undefined,
    key: KeyData,
    recordCallback?: (keyId: number) => void
  ) {
    this.sound = sound;
    this.key = key;
    this.recordCallback = () => recordCallback?.(parseInt(this.key.name));
  }

  pressDown(): boolean {
    if (this.key.state !== KeyState.Pressed) {
      this.key.state = KeyState.Pressed;
      if (this.sound) {
        SoundManager.audioPlay(this.sound.id);
        this.recordCallback();
      }
      return true;
    }
    return false;
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

  pressDown(callback?: () => void) {
    if (this.key.state !== KeyState.Pressed && this.isTogglable) {
      if (this.callbackDown?.()) {
        this.key.state = KeyState.Pressed;
        this.isTogglable = false;
        callback?.();
        return true;
      }
    } else if (this.key.state === KeyState.Pressed && this.isTogglable) {
      this.key.state = KeyState.Idle;
      this.isTogglable = false;
      this.callbackUp?.();
    }
    return false;
  }

  pressUp(): void {
    this.isTogglable = true;
  }
}
