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

  getData() {
    return this.map((value) => (value.isOn ? 1 : 0));
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

  setByCode(code: string) {
    const columns = code.match(/.{1,2}/g);
    if (columns)
      this.notes = Array.from(
        new Array<Column>(columns?.length),
        (v, k) =>
          new Column(
            this.row,
            parseInt(columns[k], 32)
              .toString(2)
              .split("")
              .map((v) => (v === "1" ? true : false))
          )
      );
  }

  getByCode() {
    const noteArray = [];
    for (let i = 0; i < this.notes.length; i++) {
      const temp = this.notes[i].getData();
      console.log(temp);
      noteArray.push(parseInt(temp.join(""), 2).toString(32).padStart(2, "0"));
    }

    return document.location.origin + "/#/" + noteArray.join("");
  }
}
