// 싱글톤 사운드 제어 클래스.

import Sound from "./Sound";

const audioFileList = [
  require("@/assets/sound/kit/kick.wav"),
  require("@/assets/sound/kit/tom1.wav"),
  require("@/assets/sound/kit/tom2.wav"),
  require("@/assets/sound/kit/tom3.wav"),
  require("@/assets/sound/kit/snare.wav"),
  require("@/assets/sound/kit/hihat.wav"),
  require("@/assets/sound/1up.wav"),
];

interface WebkitAudioContext extends AudioContext {
  createGainNode: () => GainNode;
}
interface Window extends globalThis.Window {
  AudioContext: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
}

export class SoundManager {
  audioContext: AudioContext;
  soundList: Array<Sound> = [];

  private static _instance: SoundManager;

  private constructor() {
    const _window: Window = window;
    const AudioContext = _window?.AudioContext || _window?.webkitAudioContext;
    if (!AudioContext) alert("WebAudioAPI를 지원하지 않는 브라우저입니다.");
    console.log(AudioContext);
    this.audioContext = new AudioContext();
  }

  async initialize() {
    const gainNode =
      this.audioContext.createGain?.() ||
      (<WebkitAudioContext>this.audioContext)?.createGainNode?.();
    const source = this.audioContext.createBufferSource();

    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    await this.audioLoadAll(audioFileList);
    // for (let i = 0; i < audioFileList.length; i++) {
    //   await this.audioLoad(i, audioFileList[i]);
    // }
  }

  public static get instance(): SoundManager {
    return this._instance || (this._instance = new SoundManager());
  }

  getSoundById(id: number): Sound | undefined {
    return this.soundList.find((item) => item.id === id);
  }

  async audioLoadAll(fileList: Array<string>): Promise<void[]> {
    return Promise.all(
      fileList.map((value, index) => this.audioLoad(index, value))
    );
  }

  async audioLoad(id: number, src: string): Promise<void> {
    const buffer: ArrayBuffer = await (await fetch(src)).arrayBuffer();

    this.soundList.push(
      new Sound(id, await this.audioContext.decodeAudioData(buffer))
    );
  }

  audioPlay(id: number): void {
    this.getSoundById(id)?.play(this.audioContext);
    // this.audioContext.resume?.();
  }
}

export default SoundManager.instance;
