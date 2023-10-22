import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role, Status } from '../interfaces/users.enum';

@Schema({
    collection: 'users',
    timestamps: { createdAt: 'created' },
})
export class User extends Document {
    @Prop({ required: true })
    firstname: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: String, unique: true })
    clientId: string;

    @Prop({ default: Status.active })
    status: Status;

    @Prop({ default: false })
    isValide: boolean;

    @Prop({ default: '' })
    validationToken: string;

    @Prop({ default: [Role.USER] })
    roles: Role[];

    @Prop({ default: '' })
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
