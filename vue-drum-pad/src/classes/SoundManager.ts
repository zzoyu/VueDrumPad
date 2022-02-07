interface Sound {
  id: number;
  buffer: AudioBuffer;
}

const audioFileList = [
  require("@/assets/sound/kit/kick.wav"),
  require("@/assets/sound/kit/tom1.wav"),
  require("@/assets/sound/kit/tom2.wav"),
  require("@/assets/sound/kit/tom3.wav"),
  require("@/assets/sound/kit/snare.wav"),
  require("@/assets/sound/kit/hihat.wav"),
  require("@/assets/sound/1up.wav"),
];

export class SoundManager {
  audioContext: AudioContext;
  soundList: Array<Sound> = [];

  constructor() {
    // const AudioContext = (window?.AudioContext || window?.webkitAudioContext);
    this.audioContext = new AudioContext();
    const gainNode = this.audioContext.createGain();
    const source = this.audioContext.createBufferSource();

    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    audioFileList.forEach((value, index) => {
      this.audioLoad(index, value);
    });
  }

  getAudioBufferById(id: number): AudioBuffer | undefined {
    return this?.soundList?.find?.((item) => item.id === id)?.buffer;
  }

  async audioLoad(id: number, src: string): Promise<void> {
    const buffer: ArrayBuffer = await (await fetch(src)).arrayBuffer();

    this.soundList.push({
      id,
      buffer: await this.audioContext.decodeAudioData(buffer),
    });
  }

  audioPlay(id: number): void {
    const source = this.audioContext.createBufferSource();
    source.buffer = this.getAudioBufferById(id) || null;
    source.connect(this.audioContext.destination);
    source.start();
  }
}
