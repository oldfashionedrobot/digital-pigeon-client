export class Pigeon {
  name: string = 'Bobby';
  imgUrl: string = 'assets/img/pigeon.png';
  id: number = 0;

  constructor(imgVariant?: number) {
    if (imgVariant) {
      this.imgUrl = `assets/img/pigeon${imgVariant}.png`;
      this.name = 'Pigeon ' + imgVariant;
      this.id = imgVariant;
    }
  }
}
