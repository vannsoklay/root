import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { TypeOf, z } from 'zod';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
    name: string;
    email: string;
    password?: string;
    role: "USER" | "ADMIN" | "SUPER ADMIN"
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "USER" },
}, {
    timestamps: true,
});


// 3. Create a Model.
export const User = model<IUser>('User', userSchema);

export const comparePasswords = async (hashedPassword: string, candidatePassword: string) => {
    return await bcrypt.compare(candidatePassword, hashedPassword);
}

export const createUserSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }),
        email: z.string({ required_error: 'Email is required' }).email(
            'Invalid email'
        ),
        password: z.string({ required_error: 'Password is required' })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        passwordConfirm: z.string({ required_error: 'Please confirm your password' }),
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match',
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];