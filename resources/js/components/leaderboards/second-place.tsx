import { PlayerType } from "@/types";
import { Progress } from "../ui/progress";
import { usePage } from "@inertiajs/react";
import { LeaderboardProps } from "@/pages/events/leaderboards";

export default function SecondPlaceCard({ player }: { player: PlayerType }) {
    const { event } = usePage<LeaderboardProps>().props;
    return (
        <div className="scale-90 relative overflow-hidden order-1 border rounded p-4 item-center">
            <div className="absolute font-bold text-[12rem] -bottom-20 -right-2 z-0 text-muted font-serif">
                2
            </div>
            <div className="uppercase text-xs tracking-wider text-primary">
                2nd place
            </div>
            <div className="font-bold mt-2 text-xl text-primary">
                {player.name}
            </div>
            <div className="text-primary">
                <span className="text-8xl font-bold font-mono">{player.score}</span>
                <span className="uppercase"> pts</span>
            </div>
            <div>
                <Progress value={player.score / event.score * 100} />
            </div>
        </div>
    )
}
