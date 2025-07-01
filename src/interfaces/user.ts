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

export interface ContactFormFields {
  fname: string;
  lname: string;
  selected: string;
  postCode: string;
  email: string;
  phone: string;
  preferredContact: string;
  commentText: string;
}
