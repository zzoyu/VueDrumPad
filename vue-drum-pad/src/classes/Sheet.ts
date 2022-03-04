import Beat from "./Beat";
import SoundManager from "./SoundManager";

class Column extends Array<Beat> {
  constructor(height: number, beats?: boolean[]) {
    super(height);
    for (let i = 0; i < this.length; i++)
      this[i] = new Beat(beats?.[i] ?? false, SoundManager.getSoundById(i));
  }

  play() {
    console.log(this.filter((value) => value.isOn));
    this.filter((value) => value.isOn).forEach((value) => value.play());
  }

  clear() {
    this.forEach((element) => (element.isOn = false));
  }
}

export default class Sheet {
  notes: Array<Column>;
  readonly row: number;

  constructor(row: number, column: number) {
    this.row = row;
    this.notes = Array.from(new Array<Column>(column), () => new Column(row));
  }

  addColumns(column: number) {
    this.notes.push(
      ...Array.from(new Array<Column>(column), () => new Column(this.row))
    );
  }

  on(indexBeat: number, indexColumn: number) {
    this.notes[indexColumn][indexBeat].isOn = true;
  }

  off(indexBeat: number, indexColumn: number) {
    this.notes[indexColumn][indexBeat].isOn = false;
  }

  playColumn(index: number) {
    this.notes[index].play();
  }

  getRow(index: number) {
    return this.notes.map((value) => value[index]);
  }

  clear() {
    this.notes.forEach((v) => v.clear());
  }

  setByArray(args: Array<Array<boolean>>) {
    this.notes = Array.from(
      new Array<Column>(args.length),
      (v, k) => new Column(this.row, args[k])
    );
  }
}
