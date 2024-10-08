import { Role, Status } from '@app/platform-types/user/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

    @Prop({ required: true })
    company: string;

    @Prop({ required: true })
    simultaneousCall: number;

    @Prop({ type: String, unique: true })
    clientId: string;

    @Prop({ default: Status.active })
    status: Status;

    @Prop({ default: false })
    isEmailVerified: boolean;

    @Prop({ default: '' })
    validationToken: string | null;

    @Prop({ default: [Role.analitic] })
    roles: Role[];

    @Prop({ default: '' })
    refreshToken: string;

    @Prop()
    registeredDate: string;

    @Prop({ default: '' })
    latestActivity: string;

    @Prop({ default: '' })
    lastLogin: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
