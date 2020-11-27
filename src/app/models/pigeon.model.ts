export class Pigeon {
  id: number = 0;
  ownerId: number;
  currentUserId: number;
  messageId: number;
  name: string;
  variant: number;


  get imgUrl(): string {
    return `assets/img/pigeon${this.variant}.png`;
  }

  constructor(data: {
    id: number,
    owner_id: number,
    current_user_id: number,
    name: string,
    variant: number
  }) {

    this.id = data.id;
    this.ownerId = data.owner_id;
    this.currentUserId = data.current_user_id;
    this.name = data.name;
    this.variant = data.variant;
  }
}
