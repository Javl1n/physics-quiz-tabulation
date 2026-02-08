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

export type Event = {
    id: number | string;
    name: string;
    players: Player[];
    items: Item[];
    created_at: string;
    updated_at: string;
}

export type Player = {
    id: number | string;
    event: Event;
    scores: Score[];
    name: string;
    created_at: string;
    updated_at: string;
}

export type Item = {
    id: number | string;
    event: Event;
    player_scores: Score[];
    index: number;
    score: number;
    created_at: string;
    updated_at: string;
}

export type Score = {
    id: number | string;
    player: Player;
    item: Item;
    created_at: string;
    updated_at: string;
}
