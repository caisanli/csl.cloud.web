export interface IUser {
  name: string;
  phone: string;
  email: string;
  id?: string;
  password?: string;
}

export interface IGroup {
  id?: string;
  name: string;
  description?: string;
  userId?: string;
  size: number;
  user?: IUser
}
