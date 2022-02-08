import Beat from "./Beat"
import Instrument from "./Instrument"

interface Column extends Object {
    [key: number] : Beat;
}

export default class Sheet {
    notes : Array<Column>;
    table: Array<Array<Boolean>>

    constructor(row:number, col:number) {
        this.notes = new Array(col);
        this.table = Array.from(Array(row), ()=>Array<Boolean>(col).fill(false))
    }

    addColumns(col: number) {
        this.table.forEach((value)=>value.concat(Array<Boolean>(col).fill(false)));
        this.notes.concat(Array(col))
    }

    on(instrument:Instrument, index: number) {
        this.notes[index][instrument.id] = new Beat(instrument);
        this.table[instrument.id][index] = true;
    }

    off(instrument:Instrument, index: number) {
        delete this.notes[index][instrument.id];
        this.table[instrument.id][index] = false;
    }

    playColumn(index: number) {
        Object.values(this.notes[index]).forEach((value:Beat)=>{value.play()});
    }
}