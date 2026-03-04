import { PlayerType } from "@/types";
import { Progress } from "../ui/progress";
import { usePage } from "@inertiajs/react";
import { LeaderboardProps } from "@/pages/events/leaderboards";

export default function ThirdPlaceCard({ player }: { player: PlayerType }) {
    const { event } = usePage<LeaderboardProps>().props;
    return (
        <div className="bg-background scale-90 relative overflow-hidden order-3 border rounded p-4 item-center select-none">
            <div className="absolute font-bold text-[10rem] -bottom-16 -right-2 z-0 text-muted font-serif">
                3
            </div>
            <div className="uppercase text-xs tracking-wider text-primary/75">
                3rd place
            </div>
            <div className="font-bold mt-2 text-xl text-primary/75">
                {player.name}
            </div>
            <div className="text-primary/75">
                <span className="text-8xl font-bold font-mono">{player.score}</span>
                <span className="uppercase"> pts</span>
            </div>
            <div>
                <Progress value={player.score / event.score * 100} indicatorBg="bg-primary/75" />
            </div>
        </div>
    )
}
