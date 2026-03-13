import type { PlayerType } from "@/types";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { useInitials } from "@/hooks/use-initials";
import PlayerMenu from "./menu";
import { createContext } from "react";
import { router, usePage } from "@inertiajs/react";
import { ShowEventProps } from "@/pages/events/show";
import players from "@/routes/players";
import { cn } from "@/lib/utils";

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
        }, {
            preserveScroll: true
        })
    }
    return (
        <PlayerContext.Provider value={player}>
            <PlayerMenu>
                <Item onMouseDown={(e) => e.preventDefault()} onClick={score} variant={'outline'} className={cn([
                    isCorrect && 'border-green-700 bg-green-900/10 text-green-500'
                ])}>
                    <ItemContent>
                        <ItemTitle className="line-clamp-1">
                            {player.name}
                        </ItemTitle>
                    </ItemContent>
                    <ItemContent>
                        <ItemDescription className={cn([
                            "text-xl font-black",
                            isCorrect && "text-green-500"
                        ])}>
                            {player.score}
                        </ItemDescription>
                    </ItemContent>
                </Item>
            </PlayerMenu>
        </PlayerContext.Provider>
    )
}
