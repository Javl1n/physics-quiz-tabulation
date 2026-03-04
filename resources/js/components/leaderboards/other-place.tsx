import { PlayerType } from "@/types";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "../ui/item";
import { Progress } from "../ui/progress";
import { usePage } from "@inertiajs/react";
import { LeaderboardProps } from "@/pages/events/leaderboards";

export default function OtherPlaceItem({ player, index }: { player: PlayerType, index: number }) {
    const { event } = usePage<LeaderboardProps>().props;
    return (
        <Item variant={'outline'} className="bg-background">
            <ItemMedia className="font-bold text-primary text-lg leading-0 my-auto select-none">
                {index + 4}
            </ItemMedia>
            <ItemContent>
                <ItemTitle>
                    <span className="font-bold text-primary">{player.name}</span>
                    <span className="text-muted-foreground/60 select-none">{player.score} pts</span>
                </ItemTitle>
                <ItemDescription>
                    <Progress className="h-1" value={player.score / event.score * 100} />
                </ItemDescription>
            </ItemContent>
        </Item>
    )
}
