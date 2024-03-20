import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class AuthUpdateDto {
  @IsOptional()
  photo?: string | null;

  @ApiPropertyOptional({ example: "John" })
  @IsOptional()
  @IsNotEmpty({ message: "mustBeNotEmpty" })
  firstName?: string;

  @ApiPropertyOptional({ example: "Doe" })
  @IsOptional()
  @IsNotEmpty({ message: "mustBeNotEmpty" })
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: "mustBeNotEmpty" })
  oldPassword?: string;
}
