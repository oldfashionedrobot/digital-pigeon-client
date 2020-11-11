export class Pigeon {
  id: number = 0;
  ownerId: string;
  currentUserId: string;
  messageId: string;
  name: string = 'Bobby';
  imgUrl: string = 'assets/img/pigeon.png';

  constructor(id: number, imgVariant?: number, messageId?: string, ownerId?: string, currentUserId?: string) {
    if (imgVariant) {
      this.imgUrl = `assets/img/pigeon${imgVariant}.png`;
      this.name = 'Pigeon ' + id;
      this.id = id;
    }

    this.messageId = messageId;
    this.ownerId = ownerId;
    this.currentUserId = currentUserId;
  }
}
