import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum } from 'class-validator';

enum status {
    Active = "ACTIVATED", 
    Deactive = "DEACTIVATED" ,
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
    name: string;
    address?: string;
    role?: string;
    @IsEnum(status)
    status?: status; 
}
