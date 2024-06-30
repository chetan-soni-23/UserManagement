import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/common/public.decorator';
import { LoginDto } from 'src/users/dto/login.dto';
import { ApiOperation, ApiCreatedResponse} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @Post('/signup')
  @ApiOperation({ summary: 'Signs up a new user' })
  @ApiCreatedResponse({
    status: 201,
    description: 'The user has been created.',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.auth.signUp(createUserDto);
  }

  @Public()
  @ApiOperation({ summary: 'Logs in the user and return a access_token' })
  @ApiResponse({ status: 200, description: 'user logged in' })
  @Post('/login')
  async login(@Body() loginBody: LoginDto): Promise<{access_token: string}> {
    return await this.auth.login(loginBody);
  }
}
