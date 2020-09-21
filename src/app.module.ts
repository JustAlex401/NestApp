import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING,
      {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
