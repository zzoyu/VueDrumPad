export default class Instrument {
  id: number;
  soundHandler: () => void; // 소리 재생 핸들러.
  keyCode?: number;

  constructor(id: number, soundHandler: () => void, keyCode: number) {
    this.id = id;
    this.soundHandler = soundHandler;
    this.keyCode = keyCode;
  }
}
