import Key, { KeyState } from "./Keyboard";
import SoundManager from "./SoundManager";

export class KeyboardManager {
  private static _instance: KeyboardManager;
  public keyList: Array<Key> = [];

  public static get instance(): KeyboardManager {
    return this._instance || (this._instance = new KeyboardManager());
  }

  initialize() {
    this.keyList.push(
      new Key(SoundManager.getSoundById(0), {
        name: "0",
        state: KeyState.Idle,
      }),
      new Key(SoundManager.getSoundById(1), {
        name: "1",
        state: KeyState.Idle,
      }),
      new Key(SoundManager.getSoundById(2), {
        name: "2",
        state: KeyState.Idle,
      }),
      new Key(SoundManager.getSoundById(3), {
        name: "3",
        state: KeyState.Idle,
      }),
      new Key(SoundManager.getSoundById(4), {
        name: "4",
        state: KeyState.Idle,
      }),
      new Key(SoundManager.getSoundById(5), {
        name: "5",
        state: KeyState.Idle,
      }),
      new Key(SoundManager.getSoundById(6), {
        name: "6",
        state: KeyState.Idle,
      }),
      new Key(SoundManager.getSoundById(7), {
        name: "7",
        state: KeyState.Idle,
      }),
      new Key(SoundManager.getSoundById(8), {
        name: "8",
        state: KeyState.Idle,
      }),
      new Key(SoundManager.getSoundById(9), {
        name: "9",
        state: KeyState.Idle,
      })
    );

    document.addEventListener("keydown", (event: KeyboardEvent): void => {
      console.log(event.key);
    });
  }
}

export default KeyboardManager.instance;
