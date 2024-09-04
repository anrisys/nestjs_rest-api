export class UserRegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export class UserLoginResponse {
  name?: string;
  access_token?: string;
}

export class UserLoginRequest {
  email: string;
  password: string;
}
