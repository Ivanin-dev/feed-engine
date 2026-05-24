import { Button, Input } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import { FormEvent, useEffect, useRef } from 'react';

export interface ResetPasswordProps {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}

export default function ResetPassword({ email, token }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, setError, clearErrors } =
        useForm<ResetPasswordProps>({
            email,
            token,
            password: '',
            password_confirmation: '',
        });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.password !== data.password_confirmation) {
            setError('password_confirmation', 'password do not match');

            return;
        }

        post('/reset-password');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="h-full w-full flex-col justify-items-center p-10 pt-20"
        >
            <div className="mt-14 flex flex-col items-center gap-10">
                <Input
                    value={data.password}
                    onChange={(e) => {
                        setData('password', e.target.value);
                        clearErrors('password');
                    }}
                    name="password"
                    type="password"
                    className="w-80 border-b-2 border-b-[#3F3F3F] bg-transparent p-1 outline-0"
                    placeholder="enter your new password"
                />
                {errors.password && (
                    <span className="p-0 text-red-700">{errors.password}</span>
                )}

                <Input
                    value={data.password_confirmation}
                    onChange={(e) => {
                        setData('password_confirmation', e.target.value);
                        clearErrors('password_confirmation');
                    }}
                    name="password_confirmation"
                    type="password"
                    className="w-80 border-b-2 border-b-[#3F3F3F] bg-transparent p-1 outline-0"
                    placeholder="confirm your new password"
                />
                {errors.password_confirmation && (
                    <span className="p-0 text-red-700">
                        {errors.password_confirmation}
                    </span>
                )}
                <Button
                    type="submit"
                    disabled={processing}
                    className="mx-auto h-10 rounded-xl bg-[#3137C9] px-4"
                >
                    Confirm password reset

                 </Button>
            </div>
            <div className="pt-10 pl-2">
                <Link href="/login">Back to login</Link>
            </div>
        </form>
    );
}
