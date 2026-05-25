import type { ReactNode } from 'react';
import { Card } from 'resources/js/components/ui/card';
import type { Story } from 'resources/js/types';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';

interface StoriesListProp {
    stories: {
        data: Story[];
        meta: any;
        links: any;
    };
    action?: ReactNode;
}
export default function Stories({ stories, action }: StoriesListProp) {
    const storiesList = stories.data;

    return (
        <section className="mt-16 w-full px-4">
            {action && (
                <div className="mx-auto mb-5 flex w-full max-w-5xl justify-end">
                    {action}
                </div>
            )}

            <div className="flex w-full justify-center gap-5 overflow-x-auto pb-2">
                {storiesList.map((story) => (
                    <Dialog key={story.id}>
                        <DialogTrigger asChild>
                            <Card
                                key={story.id}
                             className="relative h-62.5 w-45 min-w-35 cursor-pointer overflow-hidden transition-transform hover:scale-105"
                            >
                                <img
                                    alt="story"
                                    className="absolute inset-0 h-full w-full object-cover"
                                    src={`/storage/${story.preview_path}`}
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-end p-4 leading-tight">
                                    <span className="font-bold">
                                        {story.caption}
                                    </span>
                                    <div>
                                        <span>{story.created_at}</span>
                                    </div>
                                </div>
                            </Card>
                        </DialogTrigger>
                    </Dialog>
                ))}
            </div>
        </section>
    );
}
