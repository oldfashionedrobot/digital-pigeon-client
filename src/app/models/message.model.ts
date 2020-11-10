export class Message {
  id: number = 0;
  fromId: string;
  pigeonId: number;
  text: string = '';

  constructor(txt: string) {
    this.text = txt;
  }
}
