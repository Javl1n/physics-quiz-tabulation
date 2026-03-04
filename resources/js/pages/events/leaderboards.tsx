import AppLogoImage from "@/components/app-logo-image";
import FirstPlaceCard from "@/components/leaderboards/first-place";
import OtherPlaceItem from "@/components/leaderboards/other-place";
import SecondPlaceCard from "@/components/leaderboards/second-place";
import ThirdPlaceCard from "@/components/leaderboards/third-place";
import MsuLogoImage from "@/components/msu-logo-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { EventType, SharedData } from "@/types";
import { usePage, usePoll } from "@inertiajs/react";
import { Dot } from "lucide-react";

export type LeaderboardProps = SharedData & {
    event: EventType;
}

export default function EventLeaderboardPage() {
    const { event } = usePage<LeaderboardProps>().props;
    usePoll(3000);
    const sortedPlayers = event.players.sort((a, b) => b.score - a.score)
    console.log(sortedPlayers.map((player) => player.score))
    return (
        <div className="px-10 py-6 h-screen">
            {/* <div className="absolute inset-0 opacity-10" */}
            {/*     style={{ */}
            {/*         backgroundImage: `url(/storage/star-background.png)`, */}
            {/*         backgroundSize: 'cover', */}
            {/*         backgroundPosition: "center" */}
            {/*     }} */}
            {/* /> */}
            <div className="flex gap-6">
                <AppLogoImage className="size-16 scale-150" />
                <div className="flex-1">
                    <div className="text-xs font-mono tracking-widest">
                        {event.name}
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="text-5xl font-black font-mono tracking-tight text-primary">
                                LEADERBOARD
                            </div>
                        </div>
                        <div className="flex gap-5 me-4">
                            <div className="">
                                <div className="font-bold text-xl text-end">
                                    {event.items.length}
                                </div>
                                <div className="font-extralight text-sm text-accent-foreground/50 leading-1">
                                    Questions
                                </div>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                <div className="font-bold text-lg text-end">
                                    {event.players.length}
                                </div>
                                <div className="font-extralight text-sm text-accent-foreground/50 leading-1">
                                    Players
                                </div>
                            </div>
                            {/* <Separator orientation="vertical" /> */}
                            {/* <AppLogoImage className="h-10 w-10" /> */}
                        </div>
                    </div>
                </div>
                <MsuLogoImage className="size-16 scale-140" />
            </div>
            {/* Podium */}
            <div className="grid grid-cols-3 gap-5 mt-6">
                <FirstPlaceCard player={sortedPlayers[0]} />
                <SecondPlaceCard player={sortedPlayers[1]} />
                <ThirdPlaceCard player={sortedPlayers[2]} />
            </div>

            <Separator className="mt-10" />

            <div className="grid grid-cols-3 gap-4 mt-7">
                {sortedPlayers.slice(3).map((player, index) => (
                    <OtherPlaceItem player={player} index={index} key={player.id} />
                ))}
            </div>
        </div>
    )
}
