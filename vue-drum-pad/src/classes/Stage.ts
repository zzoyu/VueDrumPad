import { soundManager, audioFileList } from "./SoundManager";
import Instrument from "./Instrument";

class Stage {

    instrumentList: Array<Instrument> = []
    

    constructor () {
        for (audioFile in audioFileList) {
            this.instrumentList.push(
                new Instrument(()=>{
                    soundManager.audioPlay()
                }, 0)
            );
        }
        
    }
}