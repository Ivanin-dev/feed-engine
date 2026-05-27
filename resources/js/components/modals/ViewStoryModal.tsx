import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { Story } from '@/types';

interface ViewStoryProps {
    story: Story;
}

export default function ViewStoryModal({ story }: ViewStoryProps) {
    return (
        <DialogContent className="h-auto max-h-screen max-w-4xl overflow-hidden p-0">
            <div className="flex h-full w-full flex-col">
                {story.media_type === 'video' && (
                    <video
                        autoPlay={true}
                        crossOrigin="anonymous"
                        className="h-full w-full object-cover"
                    >
                        <source
                            src={`/storage/${story.media_path}`}
                            type="video/mp4"
                        />
                    </video>
                )}
                {story.media_type === 'image' && (
                    <img
                        alt=""
                        src={`/storage/${story.media_path}`}
                        className="relative h-full w-full"
                    />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <DialogTitle className="absolute bottom-5 pl-10">
                    {story.caption}
                </DialogTitle>
            </div>
        </DialogContent>
    );
}
