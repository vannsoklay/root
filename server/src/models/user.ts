import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { TypeOf, object, string } from 'zod';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
    name: string;
    email: string;
    password?: string;
    role: "USER" | "ADMIN" | "SUPERADMIN"
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, required: true, default: "USER" },
}, {
    timestamps: true,
  });


// 3. Create a Model.
export const User = model<IUser>('User', userSchema);

export const comparePasswords = async (hashedPassword: string, candidatePassword: string) => {
    return await bcrypt.compare(candidatePassword, hashedPassword);
}

export const hashedPassword = async (ownerPassword: string) => {
    let password = await bcrypt.hash(ownerPassword, 12);
    return password
}

export const createUserSchema = object({
    body: object({
        name: string({ required_error: 'Name is required' }),
        email: string({ required_error: 'Email is required' }).email(
            'Invalid email'
        ),
        password: string({ required_error: 'Password is required' })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        passwordConfirm: string({ required_error: 'Please confirm your password' }),
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match',
    }),
});
export const loginUserSchema = object({
    body: object({
        email: string({ required_error: 'Email is required' }).email(
            'Invalid email or password'
        ),
        password: string({ required_error: 'Password is required' }).min(
            8,
            'Invalid email or password'
        ),
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];