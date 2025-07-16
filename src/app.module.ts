import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Make sure you have a file called ".env" 
    // with MONGODB_URI='mongodb+srv://<username>:<password>@cluster.mongodb.net/mydb'
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CatsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true
    }), 
    MailModule,],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
