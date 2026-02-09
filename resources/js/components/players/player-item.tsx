import type { PlayerType } from "@/types";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { useInitials } from "@/hooks/use-initials";
import PlayerMenu from "./menu";
import { createContext } from "react";

export const PlayerContext = createContext<PlayerType | null>(null);

export default function PlayerItem({ player }: { player: PlayerType }) {
    const getInitials = useInitials();
    return (
        <PlayerContext.Provider value={player}>
            <PlayerMenu>
                <Item variant={"outline"}>
                    <ItemMedia>
                        <Avatar>
                            <AvatarFallback>
                                {getInitials(player.name)}
                            </AvatarFallback>
                        </Avatar>
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle className="line-clamp-1">
                            {player.name}
                        </ItemTitle>
                    </ItemContent>
                    <ItemContent>
                        <ItemDescription>
                            {Math.floor(Math.random() * 10)}
                        </ItemDescription>
                    </ItemContent>
                </Item>
            </PlayerMenu>
        </PlayerContext.Provider>
    )
}
