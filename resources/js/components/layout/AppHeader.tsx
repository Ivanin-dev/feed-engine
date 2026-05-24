import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useState } from 'react';

interface SidebarToggle {
    isSidebarOpen?: boolean;
    onSidebarToggle?: () => void;
}

export function AppHeader({ isSidebarOpen, onSidebarToggle }: SidebarToggle) {
    const [menus, setMenus] = useState({
        profile: false,
        edit: false,
        logout: false,
    });
    const { auth } = usePage().props;

    const closeMenus = () => {
        setMenus({
            profile: false,
            edit: false,
            logout: false,
        });
    };

    const toggle = (menu: keyof typeof menus) =>
        setMenus((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));

    const { component } = usePage();
    const isLoginPage = component === 'Auth/Login';

    return (
        <header className="sticky top-0 z-50 h-13 w-full shrink-0 border-b border-zinc-800 bg-[#0D0D0D]">
            <div className="flex h-full items-stretch justify-between">
                {onSidebarToggle && (
                    <button
                        type="button"
                        aria-label={
                            isSidebarOpen ? 'Close sidebar' : 'Open sidebar'
                        }
                        onClick={onSidebarToggle}
                        className="flex h-full items-center px-4 md:hidden"
                    >
                        <Menu className="size-6" />
                    </button>
                )}
                <div className="h-full space-x-6 pt-3 pl-4">
                    <Link className="text-[18px]" href="/">
                        Home
                    </Link>

                    <Link className="text-[18px]" href="/users">
                        Users
                    </Link>
                </div>
                <div className="flex items-stretch">
                    {auth.user && (
                        <button
                            onClick={() => toggle('profile')}
                            className="h-full px-2 text-[18px] active:bg-blue-600"
                        >
                            Profile
                        </button>
                    )}

                    {!isLoginPage && !auth.user && (
                        <Link
                            className="h-full px-2 pt-3 text-[18px] active:bg-blue-600"
                            href="/auth/login"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
            {menus.profile && (
                <div className="absolute top-full right-0 z-50 grid w-20 justify-start gap-2 space-y-2 rounded-b-md border border-zinc-800 bg-[#151515] px-3 py-2 shadow-xl">
                    <Link onClick={closeMenus} href="/profile">
                        Profile
                    </Link>
                    <Link onClick={closeMenus} href="/profile/edit">
                        Edit
                    </Link>
                    <Link onClick={closeMenus} method="post" href="/logout">
                        logout
                    </Link>
                </div>
            )}
        </header>
    );
}
