import SoundManager from "./SoundManager";
import Instrument from "./Instrument";
import Sheet from "./Sheet";
export default class Stage {

    instrumentList: Array<Instrument> = [];

    sheet : Sheet;

    constructor (row:number, col: number) {
        SoundManager.soundList.forEach((sound, index)=> {
            this.instrumentList.push(
                new Instrument(sound.id, () =>{
                    SoundManager.audioPlay(index)
                }, index)
            )
        })

        this.sheet = new Sheet(row, col);

    }

    play () {
        this.instrumentList.forEach((value) =>{
            value.soundHandler();
        })
    }
}