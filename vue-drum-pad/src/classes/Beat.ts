import Instrument from "./Instrument";

export default class Beat {
  instrument: Instrument;

  constructor( instrument: Instrument) {
    this.instrument = instrument;
  }

  play(){
    this.instrument.soundHandler();
  }
}
