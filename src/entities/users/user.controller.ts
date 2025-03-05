import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserRegisterRequestDTO } from './dto/user-register-dto/user-register-request.dto';
import { UserRegisterResponseDTO } from './dto/user-register-dto/user-register-response.dto';
import { UserLoginRequestDTO } from './dto/user-login-dto/user-login-request.dto';
import { UserLoginResponseDTO } from './dto/user-login-dto/user-login-response.dto';
import { AllExceptionsFilter } from 'src/shared/exception/HttpExceptionFilter';
import {
  GetUserByIdResponse,
  LoginUserResponse,
  RegisterUserResponse,
} from 'src/shared/constants/swagger/api-response/users';
import { GetUserByIdResponseDTO } from './dto/user-get-by-id-dto/get-user-by-id-response.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt.auth';
@ApiTags('Auth')
@UseFilters(AllExceptionsFilter)
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * --------------------------------------------------------------------------------
   * * Register API
   * @param firstName:string,
   * @param lastName:string,
   * @param email:string,
   * @param password:string,
   * @param confirmPassword:string
   * @param role:string
   * ? This API is used for Register purpose
   */
  @Post('signup')
  @ApiOkResponse(RegisterUserResponse)
  @ApiOperation({ summary: 'Register Customer/Admin API' })
  @HttpCode(201)
  public async register(
    @Body() reqData: UserRegisterRequestDTO,
  ): Promise<UserRegisterResponseDTO> {
    return this.userService.register(reqData);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Login API
   * @param email:string,
   * @param password:string,
   * ? This API is used for Login purpose
   */
  @Post('login')
  @ApiOkResponse(LoginUserResponse)
  @ApiOperation({ summary: 'Login Customer/Admin API' })
  @HttpCode(200)
  public async login(
    @Body() reqData: UserLoginRequestDTO,
  ): Promise<UserLoginResponseDTO> {
    return this.userService.login(reqData);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Get User By Id API
   * @param userId:string
   * ? This API is used for Get User by purpose
   */
  @Get('profile')
  @ApiOkResponse(GetUserByIdResponse)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Get Customer/Admin By Id API' })
  @HttpCode(200)
  public async getUserById(
    @Request() reqData: Request,
  ): Promise<GetUserByIdResponseDTO> {
    return this.userService.getUserById(reqData['user'].userId);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Refresh Tokens
   * @param refreshToken:string (Without Bearer)
   * ? This API is used for Refresh the tokens
   */
  @Post('refresh')
  @ApiOperation({ summary: 'Get Refresh Token API' })
  @HttpCode(200)
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.userService.refreshToken(refreshToken);
  }
}
