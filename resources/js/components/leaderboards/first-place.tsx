import { PlayerType } from "@/types";
import { Progress } from "../ui/progress";
import { usePage } from "@inertiajs/react";
import { LeaderboardProps } from "@/pages/events/leaderboards";

export default function FirstPlaceCard({ player }: { player: PlayerType }) {
    const { event } = usePage<LeaderboardProps>().props;
    return (
        <div className="scale-110 relative overflow-hidden order-2 border rounded p-4 shadow-xl/0 shadow-foreground item-center">
            <div className="absolute font-bold text-[15rem] -bottom-25 -right-3 z-0 text-muted font-serif">
                1
            </div>
            <div className="uppercase text-xs tracking-wider text-primary-foreground">
                1st place
            </div>
            <div className="font-bold mt-2 text-xl text-primary-foreground">
                {player.name}
            </div>
            <div className="text-primary-foreground">
                <span className="text-8xl font-bold font-mono">{player.score}</span>
                <span className="uppercase"> pts</span>
            </div>
            <div>
                <Progress value={player.score / event.score * 100} indicatorBg="bg-primary-foreground" />
            </div>
        </div>
    )
}
