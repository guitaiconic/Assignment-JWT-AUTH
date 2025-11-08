export interface signUpDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  isAdmin?: boolean;
}

export interface loginDto {
  email: string;
  password: string;
}
