import { Button, Input } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export interface LoginValues {
    email: string;
    password: string;
    remember: boolean
}

export default function Login() {
    const { data, setData, post, processing, errors } = useForm<LoginValues>({
        email: '',
        password: '',
        remember: false,
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
                <div className="flex w-80 items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-zinc-300">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="h-4 w-4 rounded border-zinc-700 bg-transparent accent-[#3137C9]"
                        />
                        Remember me
                    </label>

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
                    Dont have an account?
                    <Link
                        href="/auth/register"
                        className="text-white hover:underline"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </form>
    );
}
