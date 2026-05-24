import { Button, Input } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export interface ForgotPasswordProps {
    email: string;
}

export default function ForgotPassword() {
    const { data, setData, post, processing,errors, clearErrors,wasSuccessful } = useForm<ForgotPasswordProps>({
        email: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/forgot-password');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="h-full w-full flex-col justify-items-center p-10 pt-20"
        >
            <div className="mt-14 flex flex-col items-center gap-10">
                <Input
                    onChange={(e) => {
                        setData('email', e.target.value)
                        clearErrors('email');
                    }}
                    value={data.email}
                    name="email"
                    type="email"
                    className="w-80 border-b-2 border-b-[#3F3F3F] bg-transparent p-1 outline-0"
                    placeholder="enter your email"
                />
                {errors.email && (
                    <span className="text-red-700">
                        We cant find this email
                    </span>
                )}
                {wasSuccessful && (
                    <span>
                        Message was sent to your email
                    </span>
                )}
                <Button
                    type="submit"
                    disabled={processing}
                    className="mx-auto h-10 rounded-xl bg-[#3137C9] px-4"
                >
                    Send reset link
                </Button>
            </div>
            <div className="pt-10 pl-2">
                <Link href="/login">Back to login</Link>
            </div>
        </form>
    );
}
