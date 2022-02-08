export default class Instrument {
    soundHandler : ()=>void;
    keyCode?: number;

    constructor( soundHandler: ()=>void, keyCode: number ) {
        this.soundHandler = soundHandler;
        this.keyCode = keyCode;
    }
}