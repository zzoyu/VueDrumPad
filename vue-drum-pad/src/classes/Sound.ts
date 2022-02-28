export default class Sound {
  id: number;
  buffer: AudioBuffer;

  constructor(id: number, buffer: AudioBuffer) {
    this.id = id;
    this.buffer = buffer;
  }

  play(context: AudioContext): void {
    const source = context.createBufferSource();
    source.buffer = this.buffer;
    source.connect(context.destination);
    source.start();
  }
}
