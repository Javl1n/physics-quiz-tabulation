import { AnimatePresence, motion } from "motion/react";
import AppLogoImage from "@/components/app-logo-image";
import FirstPlaceCard from "@/components/leaderboards/first-place";
import OtherPlaceItem from "@/components/leaderboards/other-place";
import SecondPlaceCard from "@/components/leaderboards/second-place";
import ThirdPlaceCard from "@/components/leaderboards/third-place";
import MsuLogoImage from "@/components/msu-logo-image";
import { Separator } from "@/components/ui/separator";
import { EventType, ItemType, PlayerType, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEchoPublic } from "@laravel/echo-react";
import { useState } from "react";
import TimerPage from "@/components/timer/page";
import { Button } from "@/components/ui/button";
import { Eye, Timer } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";

export type LeaderboardProps = SharedData & {
    event: EventType;
}

export default function EventLeaderboardPage() {
    const { event } = usePage<LeaderboardProps>().props;

    const [players, setPlayers] = useState<PlayerType[]>(event.players.sort((a, b) => b.score - a.score));
    const [items, setItems] = useState<ItemType[]>(event.items);
    const [timerToggled, setTimerToggled] = useState(false);
    const [showTimer, setShowTimer] = useState(true);

    useEchoPublic(`leaderboards.${event.id}`, '.player.deleted', ({ player }: { player: PlayerType }) => {
        setPlayers(prev => [
            ...prev.filter((p) => p.id !== player.id)
        ])
    })

    useEchoPublic(`leaderboards.${event.id}`, '.player.updated', ({ player }: { player: PlayerType }) => {
        setPlayers(prev => (
            prev.some(p => p.id === player.id)
                ? prev.map(p => p.id === player.id ? player : p)
                : [...prev, player]
        ).sort((a, b) => b.score - a.score))
    });

    useEchoPublic(`leaderboards.${event.id}`, ".item.updated", (({ item }: { item: ItemType }) => {
        setItems(prev => (
            prev.some(i => i.id === item.id)
                ? prev.map(i => i.id === item.id ? item : i)
                : [...prev, item]
        ))
    }));


    return (
        <div className="px-10 py-6 min-h-screen">
            <div className="flex gap-6">
                {showTimer && <TimerPage toggled={timerToggled} setToggle={(bool) => setTimerToggled(bool)} />}
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
                            <div className="my-auto">
                                <ButtonGroup>
                                    <Button onClick={() => setTimerToggled(prev => !prev)} variant={timerToggled ? 'default' : 'secondary'}>
                                        <Timer />
                                    </Button>
                                    <Button onClick={() => setShowTimer(prev => !prev)} variant={showTimer ? 'default' : 'secondary'}>
                                        <Eye />
                                    </Button>
                                </ButtonGroup>
                            </div>
                            <Separator orientation="vertical" />
                            <div className="">
                                <div className="font-bold text-xl text-end">
                                    {items.length}
                                </div>
                                <div className="font-extralight text-sm text-accent-foreground/50 leading-1">
                                    Items
                                </div>
                            </div>
                            <Separator orientation="vertical" />
                            <div className="">
                                <div className="font-bold text-xl text-end">
                                    {items.reduce((sum, item) => sum + item.score, 0)}
                                </div>
                                <div className="font-extralight text-sm text-accent-foreground/50 leading-1">
                                    Total
                                </div>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                <div className="font-bold text-lg text-end">
                                    {players.length}
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
            <AnimatePresence>
                <div className="grid grid-cols-3 gap-5 mt-6">
                    <motion.div
                        key={players[1]?.id}
                        layout
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <SecondPlaceCard player={players[1]} />
                    </motion.div>
                    <motion.div
                        key={players[0]?.id}
                        layout
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FirstPlaceCard player={players[0]} />
                    </motion.div>
                    <motion.div
                        key={players[2]?.id}
                        layout
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ThirdPlaceCard player={players[2]} />
                    </motion.div>
                </div>
            </AnimatePresence>
            <Separator className="mt-10" />
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 mt-7">
                {players.slice(3).map((player, index) => (
                    <motion.div
                        key={player.id}
                        layout
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <OtherPlaceItem player={player} index={index} key={player.id} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
