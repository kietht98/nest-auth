import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import appConfig from "./config/app.config";
import databaseConfig from "./database/config/database.config";
import authConfig from "./auth/config/auth.config";

import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { HomeModule } from "./home/home.module";
import { DataSource, DataSourceOptions } from "typeorm";
import { SessionModule } from "./session/session.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from "./database/mongoose-config.service";
import { DatabaseConfig } from "./database/config/database-config.type";
import { MailModule } from "./mail/mail.module";
import { MailerModule } from "./mailer/mailer.module";
import mailConfig from "./mail/config/mail.config";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, mailConfig],
      envFilePath: [".env"],
    }),
    (databaseConfig() as DatabaseConfig).isDocumentDatabase
      ? MongooseModule.forRootAsync({
          useClass: MongooseConfigService,
        })
      : TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
          dataSourceFactory: async (options: DataSourceOptions) => {
            return new DataSource(options).initialize();
          },
        }),

    UsersModule,
    AuthModule,
    MailModule,
    MailerModule,
    SessionModule,
    HomeModule,
  ],
})
export class AppModule {}
