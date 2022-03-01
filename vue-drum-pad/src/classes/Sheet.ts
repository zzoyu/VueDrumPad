import Beat from "./Beat";
import SoundManager from "./SoundManager";

class Column extends Array<Beat> {
  constructor(height: number) {
    super(height);
    this.map((value, index) => {
      value = new Beat(false, SoundManager.getSoundById(index));
    });
  }

  play() {
    this.filter((value) => value.isOn).forEach((value) => value.play());
  }
}

export default class Sheet {
  notes: Array<Column>;
  readonly row: number;

  constructor(row: number, column: number) {
    this.row = row;
    this.notes = new Array(column).fill(new Column(row));
  }

  addColumns(column: number) {
    this.notes.push(...new Array<Column>(column).fill(new Column(this.row)));
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
}
