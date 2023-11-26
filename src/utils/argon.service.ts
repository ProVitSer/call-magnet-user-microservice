import * as argon2 from 'argon2';

export class ArgonUtilService {
    public static async verify(hash: string, plain: string): Promise<boolean> {
        return await argon2.verify(hash, plain);
    }

    public static async hashData(data: string): Promise<string> {
        return await argon2.hash(data);
    }
}
