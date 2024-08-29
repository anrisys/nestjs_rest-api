export class UserRegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export class UserResponse {
  name?: string;
  access_token?: string;
}

export class UserLoginRequest {
  email: string;
  password: string;
}
