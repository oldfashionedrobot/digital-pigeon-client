export class Message {
  id: string = '0';
  fromId: string;
  pigeonId: number;
  text: string = '';

  constructor(id: string, txt: string) {
    this.id = id;
    this.text = txt;
  }
}
