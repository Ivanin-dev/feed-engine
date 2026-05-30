import { useForm } from '@inertiajs/react';
import { CameraIcon, SendHorizonal } from 'lucide-react';
import type { SyntheticEvent } from 'react';
import { useRef, useState } from 'react';
import { Card } from 'resources/js/components/ui/card';

interface PostProps {
    text: string;
    image: File | null;
}

export default function PostComposer() {
    const { data, setData, post, reset } = useForm<PostProps>({
        text: '',
        image: null,
    });

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resizeTextArea = () => {
        const textarea = textareaRef.current;

        if (!textarea) {
            return;
        }

        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const [previewUrl, setPreviewUrl] = useState<string | null>();

    const fileRef = useRef<HTMLInputElement>(null);

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        post(window.route('post.store'), {
            onSuccess: () => {
                reset('text', 'image');
                setPreviewUrl(null);
            },
        });
    };

    return (
        <div className="relative">
            <Card className="mx-auto flex min-h-18.5 w-80 max-w-200 items-stretch overflow-auto border-zinc-800 bg-zinc-900/50 p-4 md:w-100 lg:w-200">
                <div className="flex w-full items-center">
                    {previewUrl && (
                        <img
                            alt=""
                            src={`${previewUrl}`}
                            className="h-30 w-30 object-cover"
                        />
                    )}
                    <textarea
                        ref={textareaRef}
                        placeholder="Write something"
                        value={data.text}
                        onChange={(e) => {
                            setData('text', e.target.value);
                            resizeTextArea();
                        }}
                        className="flex-1 resize-none overflow-hidden bg-transparent py-1 text-sm outline-none"
                    />
                    <div className="flex space-x-4">
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (!file) {
                                    return;
                                }

                                if (previewUrl) {
                                    URL.revokeObjectURL(previewUrl);
                                }

                                setData('image', file);
                                setPreviewUrl(URL.createObjectURL(file));
                            }}
                        />

                        <CameraIcon
                            onClick={() => fileRef.current?.click()}
                            className="hover:cursor-pointer"
                        />
                        <SendHorizonal
                            className="cursor-pointer transition-colors hover:text-white"
                            size={25}
                            onClick={submit}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
}
