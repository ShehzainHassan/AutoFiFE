export interface User {
  name: string;
  email: string;
  password: string;
}
export interface LoginDTO {
  email: string;
  password: string;
}
export interface AuthData {
  token: string;
  userEmail: string;
  userId: number;
  userName: string;
}
