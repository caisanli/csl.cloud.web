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

export interface IFolder {
  id?: string;
  name?: string;
  description?: string;
  parentId?: string;
}

export interface IFile {
  id?: string;
  name?: string;
  folderId?: string;
  modifyDate?: Date;
  category?: string;
  thumbnail?: string;
  size?: number;
}
