import Key, { KeyState, SpecialKey } from "./Keyboard";
import SoundManager from "./SoundManager";

export class KeyboardManager {
  private static _instance: KeyboardManager;
  public keyList: Array<Key> = [];

  private constructor() {
    this.keyList = [];
  }

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
      }),
      new SpecialKey(
        {
          name: "+",
          state: KeyState.Idle,
        },
        () => {
          console.log("SPECIAL KEY!");
        }
      ),
      new SpecialKey(
        {
          name: "Enter",
          state: KeyState.Idle,
        },
        () => {
          console.log("SPECIAL KEY!");
        }
      )
    );

    document.addEventListener("keydown", (event: KeyboardEvent): void => {
      console.log(event.key);
      this.getKey(event.key)?.pressDown();
    });

    document.addEventListener("keyup", (event: KeyboardEvent): void => {
      console.log(event.key);
      this.getKey(event.key)?.pressUp();
    });
  }

  getKey(name: string): Key | undefined {
    return this.keyList.find((value) => value.key.name === name);
  }
}

export default KeyboardManager.instance;
