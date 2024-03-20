import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

import { Transform, Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, MinLength } from "class-validator";
import { lowerCaseTransformer } from "src/utils/transformers/lower-case.transformer";
import { RoleDto } from "src/roles/dto/role.dto";
import { StatusDto } from "src/statuses/dto/status.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: "test1@example.com" })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiPropertyOptional({ example: "John" })
  @IsOptional()
  firstName?: string | null;

  @ApiPropertyOptional({ example: "Doe" })
  @IsOptional()
  lastName?: string | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  photo?: string | null;

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;

  @ApiPropertyOptional({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;

  hash?: string | null;
}
