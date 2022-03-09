import Key, { KeyState } from "./Keyboard";
import SoundManager from "./SoundManager";

interface InitializeData {
  specialKeys: Array<Key>;
  recordCallback: (keyId: number) => void;
}
export class KeyboardManager {
  private static _instance: KeyboardManager;
  public keyList: Array<Key> = [];
  public whitelist: Array<number> = [];

  recordCallback?: InitializeData["recordCallback"];

  public static get instance(): KeyboardManager {
    return this._instance || (this._instance = new KeyboardManager());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialize({ specialKeys, recordCallback }: InitializeData): void {
    // this.recordCallback = recordCallback;
    this.keyList.push(
      new Key(
        SoundManager.getSoundById(0),
        {
          name: "0",
          state: KeyState.Idle,
        },
        recordCallback
      ),
      new Key(
        SoundManager.getSoundById(1),
        {
          name: "1",
          state: KeyState.Idle,
        },
        recordCallback
      ),
      new Key(
        SoundManager.getSoundById(2),
        {
          name: "2",
          state: KeyState.Idle,
        },
        recordCallback
      ),
      new Key(
        SoundManager.getSoundById(3),
        {
          name: "3",
          state: KeyState.Idle,
        },
        recordCallback
      ),
      new Key(
        SoundManager.getSoundById(4),
        {
          name: "4",
          state: KeyState.Idle,
        },
        recordCallback
      ),
      new Key(
        SoundManager.getSoundById(5),
        {
          name: "5",
          state: KeyState.Idle,
        },
        recordCallback
      ),
      new Key(
        SoundManager.getSoundById(6),
        {
          name: "6",
          state: KeyState.Idle,
        },
        recordCallback
      ),
      new Key(
        SoundManager.getSoundById(7),
        {
          name: "7",
          state: KeyState.Idle,
        },
        recordCallback
      ),
      new Key(
        SoundManager.getSoundById(8),
        {
          name: "8",
          state: KeyState.Idle,
        },
        recordCallback
      ),
      new Key(
        SoundManager.getSoundById(9),
        {
          name: "9",
          state: KeyState.Idle,
        },
        recordCallback
      ),
      ...specialKeys
    );

    document.addEventListener("keydown", (event: KeyboardEvent): void => {
      console.log(event.key);
      const tempKey = this.getKey(event.key);
      tempKey?.pressDown();
    });

    document.addEventListener("keyup", (event: KeyboardEvent): void => {
      console.log(event.key);
      this.getKey(event.key)?.pressUp();
    });
  }

  getKey(name: string): Key | undefined {
    return this.keyList.find((value) => value.key.name === name);
  }

  getKeyState(): Array<KeyState> {
    return this.keyList.map((value) => value.key.state);
  }
}

export default KeyboardManager.instance;
