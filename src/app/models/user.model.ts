export class User {
  username: string;
  email: string;
  id: number;

  get name(): string {
    return this.username || this.email;
  }

  constructor(userInfo: any) {
    this.username = userInfo.username;
    this.email = userInfo.email;
    this.id = userInfo.id;
  }
}
