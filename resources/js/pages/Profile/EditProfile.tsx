import { Button } from '@headlessui/react';
import { usePage, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import CustomInput from '@/components/ui/custom-input';

interface EditProps {
    name: string;
    email: string;
    headline: string;
    description: string;
    avatar: File | null;
    banner: File | null;
    password: string;
    password_confirmation: string;
}

export default function EditProfile() {
    const { auth } = usePage().props;
    const { errors, setError, data, setData, processing, post } =
        useForm<EditProps>({
            name: auth.user.name,
            email: auth.user.email,
            headline: auth.user.headline || '',
            description: auth.user.description || '',
            avatar: null,
            banner: null,
            password: '',
            password_confirmation: '',
        });

    const [previewUrl, setPreviewUrl] = useState({
        avatar: null as string | null,
        banner: null as string | null,
    });

    const changedData = {
        name: data.name,
        email: data.email,
        headline: data.headline,
        description: data.description,
        password: data.password || undefined,
        password_confirmation: data.password_confirmation || undefined,
        ...(data.avatar && { avatar: data.avatar }),
        ...(data.banner && { banner: data.banner }),
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.password !== data.password_confirmation) {
            setError('password_confirmation', 'Passwords do not match');

            return;
        }

        post(window.route('user.update', changedData), { preserveScroll: true });
    };

    const handleReset = (name: 'avatar' | 'banner') => {
        if (previewUrl[name]) {
            URL.revokeObjectURL(previewUrl[name]);
        }

        setData(name, null);
        setPreviewUrl((prev) => ({ ...prev, [name]: null }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-screen w-full justify-items-center py-10"
        >
            <h1 className="mb-10 text-2xl">My Profile</h1>

            <div className="flex max-w-2xl flex-col gap-8">
                <CustomInput
                    onChange={(value) => setData('name', value)}
                    value={data.name}
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    errors={errors.name}
                />

                <CustomInput
                    onChange={(value) => setData('email', value)}
                    value={data.email}
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    errors={errors.email}
                />

                <CustomInput
                    onChange={(value) => setData('headline', value)}
                    value={data.headline}
                    name="headline"
                    type="text"
                    placeholder="Headline"
                    errors={errors.headline}
                />
                <span>{data.description.length}/250 max</span>

                <div>
                    <textarea
                        onChange={(e) => setData('description', e.target.value)}
                        value={data.description}
                        maxLength={250}
                        name="description"
                        placeholder="Description"
                        className="h-20 w-80 resize-none border-b-2 border-b-[#3F3F3F] bg-transparent p-1 outline-0"
                    />
                    {errors.description && (
                        <span className="text-red-700">
                            {errors.description}
                        </span>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm">Avatar</label>
                    <p className="text-sm text-gray-400">jpg,webp,png only</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (!file) {
                                return;
                            }

                            if (previewUrl.avatar) {
                                URL.revokeObjectURL(previewUrl.avatar);
                            }

                            const url = URL.createObjectURL(file);

                            setPreviewUrl((prev) => ({ ...prev, avatar: url }));
                            setData('avatar', file);
                        }}
                        className="w-80 border-b-2 border-b-[#3F3F3F] bg-transparent p-1 text-sm outline-0"
                    />
                    <div className="mt-3">
                        <img
                            onClick={() => handleReset('avatar')}
                            src={
                                previewUrl.avatar ??
                                `/storage/${auth.user.avatar}`
                            }
                            alt="Avatar preview"
                            className="h-20 w-20 cursor-pointer object-cover"
                        />
                    </div>
                    {errors.avatar && (
                        <span className="mt-1 block text-sm text-red-700">
                            {errors.avatar}
                        </span>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm">Banner</label>
                    <p className="text-sm text-gray-400">jpg,webp,png only</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (!file) {
                                return;
                            }

                            if (previewUrl.banner) {
                                URL.revokeObjectURL(previewUrl.banner);
                            }

                            const url = URL.createObjectURL(file);

                            setData('banner', file);
                            setPreviewUrl((prev) => ({ ...prev, banner: url }));
                        }}
                        className="w-80 border-b-2 border-b-[#3F3F3F] bg-transparent p-1 text-sm outline-0"
                    />
                    <div className="mt-3">
                        <img
                            src={
                                previewUrl.banner ??
                                `/storage/${auth.user.banner}`
                            }
                            alt="Banner preview"
                            className="h-20 w-80 object-cover"
                        />
                    </div>
                    {errors.banner && (
                        <span className="mt-1 block text-sm text-red-700">
                            {errors.banner}
                        </span>
                    )}
                </div>

                <div className="pt-4">
                    <h2 className="mb-6 text-lg">Change Password (Optional)</h2>

                    <CustomInput
                        onChange={(value) => setData('password', value)}
                        value={data.password}
                        name="password"
                        type="password"
                        placeholder="New Password"
                        errors={errors.password}
                    />

                    <div className="mt-8">
                        <CustomInput
                            onChange={(value) =>
                                setData('password_confirmation', value)
                            }
                            value={data.password_confirmation}
                            name="password_confirmation"
                            type="password"
                            placeholder="Confirm Password"
                            errors={errors.password_confirmation}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="mt-4 h-10 bg-[#3137C9] px-6 font-medium text-white transition-colors hover:bg-[#2a2ba8] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </form>
    );
}
