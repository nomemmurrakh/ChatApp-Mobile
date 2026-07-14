export namespace Client {
  export interface AuthSession {
    token: string;
    user: User;
  }
  export interface User {
    id: string;
    phoneNumber: string;
    name: string;
    createdAt: string;
    lastSeen: string;
  }
}
