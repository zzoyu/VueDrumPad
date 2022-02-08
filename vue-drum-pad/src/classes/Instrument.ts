
export default class Instrument {
    soundHandler : Function;
    keyCode?: number;

    constructor( soundHandler: Function, keyCode: number ) {
        this.soundHandler = soundHandler;
        this.keyCode = keyCode;
    }
}