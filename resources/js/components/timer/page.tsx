import { LeaderboardProps } from "@/pages/events/leaderboards";
import { PlayerType } from "@/types";
import { Button } from "@headlessui/react";
import { usePage } from "@inertiajs/react";
import { useEchoPublic } from "@laravel/echo-react";
import { useState } from "react";
import { useTimer } from "react-timer-hook";
import { RadialBarChart, PolarGrid, PolarRadiusAxis, RadialBar, Label } from "recharts";
import { ChartContainer } from "../ui/chart";
import { AnimatePresence, motion } from "motion/react";
import useBeep from "@/hooks/use-beep";
import useSound from 'use-sound';
import { cn } from "@/lib/utils";

export default function TimerPage({ toggled, setToggle }: { toggled: boolean, setToggle: (bool: boolean) => void }) {
    const { event } = usePage<LeaderboardProps>().props;
    const { beep, success, buzzer, whistle } = useBeep();
    const [play] = useSound('/storage/timeout-extended.mp3', { volume: 1 });


    const [time, setTime] = useState(15);
    const [show, setShow] = useState(false);

    const { seconds, totalSeconds, totalMilliseconds, isRunning, restart } = useTimer({
        expiryTimestamp: new Date(Date.now()),
        interval: 20,
        autoStart: false,
        onExpire: () => {
            play()
            setTimeout(() => {
                setShow(false)
            }, 1000)
        }
    });


    useEchoPublic(`leaderboards.${event.id}`, '.timer.started', ({ time }: { time: number }) => {
        setShow(true)
        setTime(time);
        restart(new Date(Date.now() + time * 1000));
    })

    return (
        <div className="fixed inset top-0 right-0 z-100 transition">
            <AnimatePresence>

                {(show || toggled) && (
                    <motion.div
                        transition={{
                            duration: 0.3,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div onClick={() => setToggle(false)} className={cn([
                            toggled ? "bg-background" : "bg-background/95",
                            "h-screen w-screen"
                        ])}>
                            <ChartContainer
                                config={{ timer: { color: "var(--primary)" } }}
                                className="mx-auto my-auto h-full w-full aspect-square scale-250"
                            >
                                <RadialBarChart
                                    data={[{
                                        timer: seconds
                                    }]}
                                    innerRadius={80}
                                    outerRadius={160}
                                    endAngle={90}
                                    startAngle={90 - (seconds / time) * 360}
                                >
                                    <PolarGrid
                                        gridType="circle"
                                        radialLines={false}
                                        stroke="none"
                                        className="first:fill-muted last:fill-background"
                                        polarRadius={[86, 74]}
                                    />
                                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className="fill-foreground text-4xl font-bold font-mono"
                                                            >
                                                                {((totalMilliseconds / 1000).toFixed(2))}
                                                            </tspan>
                                                            {/* <tspan */}
                                                            {/*     x={viewBox.cx} */}
                                                            {/*     y={(viewBox.cy || 0) + 24} */}
                                                            {/*     className="fill-muted-foreground" */}
                                                            {/* > */}
                                                            {/*     Seconds */}
                                                            {/* </tspan> */}
                                                        </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </PolarRadiusAxis>
                                    <RadialBar
                                        isAnimationActive={false}
                                        dataKey="timer"
                                        background
                                        fill="var(--primary)" />
                                </RadialBarChart>
                            </ChartContainer>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
