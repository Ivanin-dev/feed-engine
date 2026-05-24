import { Button, Input } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
export interface RegisterValues {
    name: string;
    password: string;
    email: string;
    password_confirmation: string;
}

export default function Register() {
    const { data, setData, post, errors, processing, setError } =
        useForm<RegisterValues>({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.password !== data.password_confirmation) {
            setError('password_confirmation', 'password do not match');

            return;
        }

        post('/auth/register');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="h-full w-full flex-col justify-items-center p-10 pt-20"
        >
            <h2 className="text-2xl">Register</h2>
            <div className="mt-14 flex flex-col items-center gap-10">
                <Input
                    onChange={(e) => setData('name', e.target.value)}
                    type="text"
                    name="name"
                    className="w-80 border-b-2 border-b-[#3F3F3F] bg-transparent p-1 outline-0"
                    placeholder="enter your username"
                />
                {errors.name && (
                    <span className="text-red-700"> {errors.name}</span>
                )}
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
                    <span className="p-0 text-red-700">{errors.password}</span>
                )}

                <Input
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                    }
                    name="password_confirmation"
                    type="password"
                    className="w-80 border-b-2 border-b-[#3F3F3F] bg-transparent p-1 outline-0"
                    placeholder="confirm your password"
                />
                {errors.password_confirmation && (
                    <span className="text-red-700">
                        {errors.password_confirmation}
                    </span>
                )}
                <div className="flex w-80 items-center justify-between text-sm">
                    <Link
                        href="/forgot-password"
                        className="text-zinc-400 hover:text-white"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="h-10 w-80 rounded-xl bg-[#3137C9] font-medium text-white transition hover:bg-[#3f46df] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Login
                </Button>

                <div className="text-sm text-zinc-400">
                     Have an account?
                    <Link
                        href="/auth/login"
                        className="text-white hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </form>
    );
}
