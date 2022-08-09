export interface IUser {
  user: {
    email: string;
    id: string;
  };
}

export interface IContext {
  req?: Request & IUser;
  res?: Response;
}

export interface IOAuthUser {
  user: {
    name: string;
    phonenumber: string;
    email: string;
    address: string;
    gender: string;
    hashedPassword: string;
    residentregistrationnumber: string;
  };
}
