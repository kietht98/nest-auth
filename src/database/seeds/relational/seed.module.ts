import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "src/config/app.config";
import databaseConfig from "src/database/config/database.config";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from "src/database/mongoose-config.service";
import { UserSeedModule } from "./user/user-seed.module";
import { RoleSeedModule } from "./role/role-seed.module";

@Module({
  imports: [
    UserSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: [".env"],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    RoleSeedModule,
  ],
})
export class SeedModule {}
