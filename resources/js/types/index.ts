export type * from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
};

export type EventType = {
    id: number | string;
    name: string;
    players: PlayerType[];
    items: ItemType[];
    latest_item: ItemType;
    score: number;
    created_at: string;
    updated_at: string;
}

export type PlayerType = {
    id: number | string;
    event: EventType;
    player_number: number;
    items: ItemType[];
    name: string;
    score: number;
    created_at: string;
    updated_at: string;
}

export type ItemType = {
    id: number | string;
    event: EventType;
    players: PlayerType[];
    index: number;
    score: number;
    created_at: string;
    updated_at: string;
}
