import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { UserRegisterRequestDTO } from './dto/user-register-dto/user-register-request.dto';
import { UserRegisterResponseDTO } from './dto/user-register-dto/user-register-response.dto';
import * as bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

import { UserLoginRequestDTO } from './dto/user-login-dto/user-login-request.dto';
import { UserLoginResponseDTO } from './dto/user-login-dto/user-login-response.dto';
import { GetUserByIdResponseDTO } from './dto/user-get-by-id-dto/get-user-by-id-response.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/shared/enum/roles';

const salt = bcrypt.genSaltSync(10);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  /**
   * * Register Function
   * @param firstName:string,
   * @param lastName:string,
   * @param email:string,
   * @param password:string,
   * @param confirmPassword:string
   * @param role:string
   * ? This API is used for Register purpose
   */
  register = async (
    reqData: UserRegisterRequestDTO,
  ): Promise<UserRegisterResponseDTO> => {
    const create = {
      email: reqData.email,
      password: bcrypt.hashSync(reqData.password, salt),
      first_name: reqData.firstName,
      last_name: reqData.lastName,
      role: reqData.role ? reqData.role : Roles.customer,
      display_name: reqData.firstName + ' ' + reqData.lastName,
    };

    const createdRecord = await this.userRepository.save(create);

    const response = await this.userRepository.findOne({
      where: {
        id: createdRecord.id,
      },
    });

    const authTokens = await this.generateTokens({
      id: response.id,
      email: response.email,
    });

    return new UserRegisterResponseDTO(
      response,
      authTokens.accessToken,
      authTokens.refreshToken,
    );
  };

  /**
   * * Login Function
   * @param email:string
   * @param password:string
   * ? This API is used for Login purpose
   */
  login = async (
    reqData: UserLoginRequestDTO,
  ): Promise<UserLoginResponseDTO> => {
    const userData = await this.userRepository.findOne({
      where: { email: reqData.email },
    });

    const authTokens = await this.generateTokens({
      id: userData.id,
      email: userData.email,
    });

    return new UserLoginResponseDTO(
      userData,
      authTokens.accessToken,
      authTokens.refreshToken,
    );
  };

  /**
   * * Retrieving user by email Function
   * @param email:string,
   * ? This API is used for Retrieving User by email purpose
   */
  getUserByEmail = async (email: string): Promise<User> => {
    const userData = await this.userRepository.findOneBy({ email: email });

    if (userData == null) {
      return null;
    }

    return userData;
  };

  /**
   * * Retrieving user by id Function
   * ? This API is used for Retrieving User by id purpose
   */
  getUserById = async (userId: string): Promise<GetUserByIdResponseDTO> => {
    const userData = await this.userRepository.findOne({
      where: { id: +userId },
    });

    if (userData == null) {
      return null;
    }

    return new GetUserByIdResponseDTO(userData);
  };

  generateTokens = async (user: {
    id: number;
    email: string;
  }): Promise<{
    accessToken: string;
    refreshToken: string;
  }> => {
    const payload = { userId: user.id, email: user.email };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '24h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: '7d',
    });

    return {
      accessToken: 'Bearer ' + token,
      refreshToken: 'Bearer ' + refreshToken,
    };
  };

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      // Generate new tokens
      return this.generateTokens({ id: payload.id, email: payload.email });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
