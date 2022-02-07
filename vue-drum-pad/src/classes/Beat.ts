class Beat {
  notes: Array<boolean>;

  constructor(size: number) {
    this.notes = Array<boolean>(size);
  }

  constructor(notes: Array<boolean>) {
    this.notes = notes;
  }
}
