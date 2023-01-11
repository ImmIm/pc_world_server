import { User } from "./appType";

export function isUser(user : any): user is User{
    return (user as User) !== undefined;
  }