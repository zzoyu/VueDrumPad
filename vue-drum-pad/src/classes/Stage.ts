import SoundManager from "./SoundManager";
import Instrument from "./Instrument";

export default class Stage {

    instrumentList: Array<Instrument> = []

    constructor () {
        SoundManager.soundList.forEach((_, index)=> {
            this.instrumentList.push(
                new Instrument(() =>{
                    SoundManager.audioPlay(index)
                }, index)
            )
        })

    }

    play () {
        this.instrumentList.forEach((value) =>{
            value.soundHandler();
        })
    }
}