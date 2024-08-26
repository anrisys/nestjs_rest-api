export class RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export class UserResponse {
  name?: string;
  token?: string;
}
