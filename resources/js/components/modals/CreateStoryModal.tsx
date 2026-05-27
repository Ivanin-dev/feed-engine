import { useForm } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import type { SyntheticEvent } from 'react';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface StoryProps {
    caption: string;
    media: File | null;
}

export default function CreateStoryModal() {
    const closeRef = useRef<HTMLButtonElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const { setData, post, reset } = useForm<StoryProps>({
        caption: '',
        media: null as File | null,
    });
    const [previewUrl, setPreviewUrl] = useState({
        media: null as string | null,
        mediaType: null as 'image' | 'video' | null,
    });

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        post(window.route('story.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset('caption', 'media')
                closeRef.current?.click();
            },
        });
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        if (previewUrl.media) {
            URL.revokeObjectURL(previewUrl.media);
        }

        const url = URL.createObjectURL(file);
        const isVideo = file.type.startsWith('video');

        setPreviewUrl((prev) => ({
            ...prev,
            media: url,
            mediaType: isVideo ? 'video' : 'image',
        }));
        setData('media', file);
    };

    return (
        <DialogContent className="border-zinc-800 bg-[#202020] p-0 text-white sm:max-w-xl">
            <DialogHeader className="border-b border-zinc-800 px-6 py-4">
                <DialogTitle>Add story</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 px-6 py-5">
                <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                />

                <PlusCircle
                    onClick={() => {
                        fileRef.current?.click();
                    }}
                    className="hover:cursor-pointer"
                ></PlusCircle>
                {previewUrl.mediaType === 'image' && (
                    <img
                        src={`${previewUrl.media}`}
                        alt=""
                        className="max-h-80"
                    />
                )}
                {previewUrl.mediaType === 'video' && (
                    <video
                        autoPlay={true}
                        src={`${previewUrl.media}`}
                        className="max-h-80"
                    />
                )}
                <textarea
                    placeholder="Story caption"
                    onChange={(e) => setData('caption', e.target.value)}
                    className="w-full resize-none bg-transparent outline-none"
                />
            </div>

            <DialogFooter className="border-t border-zinc-800 px-6 py-4">
                <DialogClose ref={closeRef} asChild>
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                </DialogClose>
                <Button onClick={handleSubmit}>Publish</Button>
            </DialogFooter>
        </DialogContent>
    );
}
