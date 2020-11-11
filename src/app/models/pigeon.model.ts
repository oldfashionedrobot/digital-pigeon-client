export class Pigeon {
  id: number = 0;
  ownerId: string;
  currentUserId: string;
  messageId: string;
  name: string = 'Bobby';
  imgUrl: string = 'assets/img/pigeon.png';

  constructor(imgVariant?: number, messageId?: string, ownerId?: string, currentUserId?: string) {
    if (imgVariant) {
      this.imgUrl = `assets/img/pigeon${imgVariant}.png`;
      this.name = 'Pigeon ' + imgVariant;
      this.id = imgVariant;
    }

    this.messageId = messageId;
    this.ownerId = ownerId;
    this.currentUserId = currentUserId;
  }
}
