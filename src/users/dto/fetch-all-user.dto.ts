import { PartialType } from '@nestjs/mapped-types';
import {
    IsEmail,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { User } from 'src/schemas/user.schema';
  
enum status {
    Active = "ACTIVATED", //or User = "user",
    Deactive = "DEACTIVATED" , // or Admin = "admin",
}
export class FetchAllUserDto extends PartialType(User) {
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsNumber()
    @IsOptional()
    phone?: number;

    address?: string;

    status?: status;

    createdAt?: Date;
}
