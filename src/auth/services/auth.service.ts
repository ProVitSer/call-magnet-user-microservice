import { HttpStatus, Injectable } from '@nestjs/common';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    constructor(private readonly log: AppLoggerService, private readonly tokenService: TokenService) {}

    // async signUp(createUserDto: CreateUserDto): Promise<{ message: string }> {
    //     const userExists = await this.usersService.findByUserByEmail(createUserDto.email);

    //     if (userExists) {
    //         this.log.error('user ' + createUserDto.email + ' already exists');
    //         return { message: USER_EXIST };
    //     }

    //     const hash = await this.tokenService.getHashData(createUserDto.password);

    //     const newUser = await this.usersService.create({
    //         ...createUserDto,
    //         password: hash,
    //         validationToken: uuidv4('8'),
    //     });

    //     const tokens = await this.tokenService.getTokens(new JwtPayloadDataAdapter(newUser));

    //     await this.tokenService.updateRefreshToken(newUser._id, tokens.refreshToken);

    //     this.log.debug('signUp new user created: ' + createUserDto.email);
    //     return {
    //         message: USER_CREATE_SUCCESS,
    //     };
    // }

    // public async signIn(data: AuthDto) {
    //     const user = await this.usersService.findByUserByEmail(data.email);

    //     if (!user) {
    //         this.log.error('email ' + data.email + ' not found');
    //         return {
    //             message: USER_NOT_EXIST,
    //         };
    //     }

    //     if (!user.isActive) {
    //         this.log.error('email ' + data.email + ' not activated');
    //         return {
    //             message: USER_NOT_ACTIVE,
    //         };
    //     }

    //     const passwordMatches = await this.tokenService.verifyPassword(user.password, data.password);
    //     if (!passwordMatches) {
    //         this.log.error('password for email ' + data.email + ' not correct');
    //         return {
    //             message: INCORRECT_PASSWORD,
    //         };
    //     }

    //     const tokens = await this.tokenService.getTokens(new JwtPayloadDataAdapter(user));

    //     await this.tokenService.updateRefreshToken(user._id, tokens.refreshToken);

    //     this.log.debug('signIn : email ' + data.email);
    //     return tokens;
    // }

    // public async logout(userId: string) {
    //     this.log.debug('logout : user ID ' + userId);
    //     return this.usersService.update(userId, { refreshToken: null });
    // }

    public async validate({ token }: any): Promise<any> {
        const decoded: any = await this.tokenService.verify(token);

        if (!decoded) {
            return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null };
        }

        // const auth: Auth = await this.usersService.findById(decoded);

        // if (!auth) {
        //     return { status: HttpStatus.CONFLICT, error: ['User not found'], userId: null };
        // }

        return { status: HttpStatus.OK, error: null, userId: decoded.id };
    }
}
