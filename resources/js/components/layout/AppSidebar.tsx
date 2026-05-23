import { Icon } from '@iconify/react';
import { usePage } from '@inertiajs/react';
import type { User } from '@/types';
import fallbackImg from '../../../images/testImage.svg';
interface PageProps {
    user?: User;
    auth: {
        user: User;
    };
    [key: string]: any;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}
export function AppSidebar({ isOpen, onClose }: SidebarProps) {
    const { user, auth } = usePage<PageProps>().props;

    const displayUser = user ?? auth.user;

    const avatarSrc = displayUser?.avatar
        ? `/storage/${displayUser.avatar}`
        : fallbackImg;

    const bannerSrc = displayUser?.banner
        ? `/storage/${displayUser.banner}`
        : fallbackImg;

    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={onClose}
                />
            )}
            <aside
                className={`fixed top-0 left-0 z-40 flex h-full w-72 flex-col bg-[#202020] text-white shadow-2xl transition-transform duration-300 ease-in-out md:relative md:z-auto md:h-auto md:w-75 md:translate-x-0 md:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="relative flex w-full justify-center">
                    <img
                        alt="sidebarHeader"
                        src={bannerSrc}
                        className="h-45 w-full object-cover"
                    />
                    <img
                        alt="avatar"
                        className="absolute -bottom-10 h-20 w-20 rounded-full border-2 border-[#202020] object-cover shadow-lg"
                        src={avatarSrc}
                    />
                </div>

                <div className="mt-12 flex flex-col items-center p-4">
                    <h1 className="text-lg font-bold">
                        {user?.name ?? auth?.user.name}
                    </h1>
                    <h2 className="text-sm text-zinc-500">
                        {user?.headline ?? auth?.user.headline}
                    </h2>

                    <div className="mt-4 flex space-x-4">
                        <Icon
                            icon="skill-icons:instagram"
                            className="h-6 w-6 transition-transform hover:scale-110"
                        />
                        <Icon
                            icon="skill-icons:twitter"
                            className="h-6 w-6 transition-transform hover:scale-110"
                        />
                        <Icon
                            icon="fa6-brands:pinterest"
                            className="h-6 w-6 text-red-700 transition-transform hover:scale-110"
                        />
                    </div>
                    <p className="mt-14 w-60 text-center text-sm">
                        {user?.description ?? auth?.user.description}
                    </p>
                </div>
            </aside>
        </>
    );
}
