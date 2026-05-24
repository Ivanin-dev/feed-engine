import { Button, Input } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export interface LoginValues {
    email: string;
    password: string;
}

export default function Login() {
    const { data, setData, post, processing, errors } = useForm<LoginValues>({
        email: '',
        password: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/auth/login');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="h-full w-full flex-col justify-items-center p-10 pt-20"
        >
            <h2 className="text-2xl">Login</h2>
            <div className="mt-14 flex flex-col items-center gap-10">
                <Input
                    onChange={(e) => setData('email', e.target.value)}
                    value={data.email}
                    name="email"
                    type="email"
                    className="w-80 border-b-2 border-b-[#3F3F3F] bg-transparent p-1 outline-0"
                    placeholder="enter your email"
                />
                {errors.email && (
                    <span className="text-red-700">{errors.email}</span>
                )}
                <Input
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    name="password"
                    type="password"
                    className="w-80 border-b-2 border-b-[#3F3F3F] bg-transparent p-1 outline-0"
                    placeholder="enter your password"
                />
                {errors.password && (
                    <span className="text-red-700">{errors.password}</span>
                )}
                <Button
                    type="submit"
                    disabled={processing}
                    className="h-10 w-30 rounded-xl bg-[#3137C9]"
                >
                    Login
                </Button>
                <div className="flex gap-10 pl-10">
                    <Link href="/auth/register">Register</Link>
                    <Link href="#">forgot password</Link>
                </div>
            </div>
        </form>
    );
}
