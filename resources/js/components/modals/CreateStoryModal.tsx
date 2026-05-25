import { useForm } from '@inertiajs/react';
import type { SyntheticEvent} from 'react';
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

    const { setData, post, reset } = useForm<StoryProps>({
        caption: '',
        media: null as File | null,
    });
    const [previewUrl, setPreviewUrl] = useState({
        media: null as string | null,
    });

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        post(window.route('story.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset('caption', 'media');
                closeRef.current?.click();
            },
        });
    };

    return (
        <DialogContent className="border-zinc-800 bg-[#202020] p-0 text-white sm:max-w-xl">
            <DialogHeader className="border-b border-zinc-800 px-6 py-4">
                <DialogTitle>Add story</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 px-6 py-5">
                <input
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) {
                            return;
                        }

                        if (previewUrl.media) {
                            URL.revokeObjectURL(previewUrl.media);
                        }

                        const url = URL.createObjectURL(file);

                        setPreviewUrl((prev) => ({ ...prev, media: url }));
                        setData('media', file);
                    }}
                />
                <img src={`${previewUrl.media}`} alt="" className="max-h-80"/>
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
