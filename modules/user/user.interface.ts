interface User {
  id?: string;
  names: string;
  email: string;
  gender: string;
  banner?: string;
  country: string;
  profile?: string;
  createdAt?: Date;
  updatedAt?: Date;
  password: string;
  isVerified?: boolean;
  verificationCode?: string;
}

export default User;
