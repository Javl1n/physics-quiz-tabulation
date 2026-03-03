import type { PlayerType } from "@/types";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { useInitials } from "@/hooks/use-initials";
import PlayerMenu from "./menu";
import { createContext } from "react";
import { router, usePage } from "@inertiajs/react";
import { ShowEventProps } from "@/pages/events/show";
import players from "@/routes/players";

export const PlayerContext = createContext<PlayerType | null>(null);

export default function PlayerItem({ player }: { player: PlayerType }) {
    const getInitials = useInitials();
    const { question, event } = usePage<ShowEventProps>().props;
    const isCorrect = question.players.map((player) => player.id).includes(player.id)

    const score = () => {
        router.post(players.score({
            event: event.id as number,
            player: player.id as number
        }), {
            item: question.id
        })
    }
    return (
        <PlayerContext.Provider value={player}>
            <PlayerMenu>
                <Item onClick={score} variant={isCorrect ? "muted" : "outline"} className={``}>
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
                        <ItemDescription className="text-xl font-black">
                            {player.score}
                        </ItemDescription>
                    </ItemContent>
                </Item>
            </PlayerMenu>
        </PlayerContext.Provider>
    )
}
