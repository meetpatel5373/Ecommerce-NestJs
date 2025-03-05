import { GetUserByIdResponseDTO } from 'src/entities/users/dto/user-get-by-id-dto/get-user-by-id-response.dto';
import { UserLoginResponseDTO } from 'src/entities/users/dto/user-login-dto/user-login-response.dto';
import { UserRegisterResponseDTO } from 'src/entities/users/dto/user-register-dto/user-register-response.dto';

export const RegisterUserResponse = {
  description: 'Register User API',
  type: UserRegisterResponseDTO,
};

export const LoginUserResponse = {
  description: 'Login User API',
  type: UserLoginResponseDTO,
};

export const GetUserByIdResponse = {
  description: 'Get User By Id API',
  type: GetUserByIdResponseDTO,
};
