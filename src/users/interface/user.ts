export enum UserRole {
  MANAGER_PERSONAL = 'MANAGER_PERSONAL',
  ADMIN = 'ADMIN',
}

export interface User {
  id: number;

  firstName: string;

  lastName: string;

  middleName: string | null;

  login: string;

  password: string;

  role: UserRole;
}

export interface UserCreate extends Omit<User, 'id'> {}
