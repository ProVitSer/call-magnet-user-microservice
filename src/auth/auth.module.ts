import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, TokenService],
    exports: [AuthService, TokenService],
})
export class AuthModule {}
