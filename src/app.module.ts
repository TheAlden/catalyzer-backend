import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://alden:sTyx9Vu5nUA6T5BH@cluster0.la0oq9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    CatsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true
    }), ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
