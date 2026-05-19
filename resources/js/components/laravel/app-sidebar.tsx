import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogo from 'resources/js/components/laravel/app-logo';
import { NavFooter } from 'resources/js/components/laravel/nav-footer';
import { NavMain } from 'resources/js/components/laravel/nav-main';
import { NavUser } from 'resources/js/components/laravel/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from 'resources/js/components/ui/sidebar';
import { posts } from 'resources/js/routes';
import type { NavItem } from 'resources/js/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Home',
        href: posts(),
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={posts()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
