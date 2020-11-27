export class Message {
  id: number;
  fromId: number;
  pigeonId: number;
  message: string = '';
  createdAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.fromId = data.from_id;
    this.pigeonId = data.pigeon_id;
    this.message = data.message;
    this.createdAt = new Date(data.created_at);
  }
}
