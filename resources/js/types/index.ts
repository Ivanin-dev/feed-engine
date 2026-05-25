import type { User } from './auth';
export type * from './auth';
export type * from './navigation';
export type * from './ui';


export interface ResourceCollection<T>{
    data: T[];
}
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
    links: {
        next?: string;
        prev?: string;
    };
}

export interface Post {
    id: number;
    title: string;
    text: string;
    content_html: string;
    image?: string;
    user_id: number;
    user?: User;
    comments?: ResourceCollection<Comment>;
    slug: string;
    created_at?: string;
    updated_at?: string;
}

export interface Comment {
    id: number;
    text: string;
    user_id: number;
    user?: User;
    created_at?: string;
    updated_at?: string;
}

export interface Story {
    id: number;
    caption: string;
    media_type: string;
    media_path: string;
    preview_path:string;
    user_id: number;
    user?: User;
    is_active: boolean;
    created_at: string;
    expires_at: string;
}
