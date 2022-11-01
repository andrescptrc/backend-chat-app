export interface User {
  uid: string;
  email: string;
  name: string;
  phone_number?: string;
  picture_url?: string;
  state: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}
