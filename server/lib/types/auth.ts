import { Request } from "express";

export type TAuthJWT = {
  id: number;
  email: string;
  username: string;
};

export interface IUserAuthRequestObj extends Request {
  user: string; // or any other type
}

export type TAuthAuthenticateUser = {
  email: string;
  password: string;
};
