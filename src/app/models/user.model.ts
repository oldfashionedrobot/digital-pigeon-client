export class User {
  username: string;
  email: string;
  id: string;

  get name(): string {
    return this.username || this.email;
  }

  constructor(userInfo: any) {
    this.username = userInfo.displayName;
    this.email = userInfo.email;
    this.id = userInfo.uid;
  }
}
