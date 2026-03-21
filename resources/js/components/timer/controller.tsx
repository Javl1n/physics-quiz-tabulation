import { MouseEventHandler, ReactNode, useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Input } from "../ui/input";
import { useTimer } from "react-timer-hook";
import { router, usePage } from "@inertiajs/react";
import { ShowEventProps } from "@/pages/events/show";
import { Field } from "../ui/field";
import { Label } from "../ui/label";
import { ChartContainer } from "../ui/chart";
import { Label as ChartLabel, PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Button } from "../ui/button";
import events from "@/routes/events";
import { InputGroup } from "../ui/input-group";
import { ButtonGroup } from "../ui/button-group";
import { Minus, Plus } from "lucide-react";

export default function TimerControllerDrawer({ children }: { children: ReactNode }) {
    const { event } = usePage<ShowEventProps>().props;

    const [time, setTime] = useState(15);
    const [open, setOpen] = useState(false)
    const { seconds, totalSeconds, totalMilliseconds, isRunning, pause, resume, start, restart } = useTimer({
        expiryTimestamp: new Date(Date.now() + time * 1000),
        interval: 20,
        autoStart: false,
        onExpire: () => {
            return restart(new Date(Date.now() + time * 1000), false)
        }
    });

    const play: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()
        if (isRunning) return
        router.get(events.timer({ event: event.id as number, time: time }), {}, {
            preserveState: true
        })
        start()
    }

    const crementTime: (reverse?: boolean) => void = (reverse = false) => {
        setTime(prev => reverse ? prev - 1 : prev + 1)
    }

    return (
        <Drawer direction="right" dismissible={false} open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className="flex">
                <DrawerHeader className="">
                    <DrawerTitle className="text-center">
                        {event.name}
                    </DrawerTitle>
                    <DrawerDescription className="text-center">
                        TIMER
                    </DrawerDescription>
                </DrawerHeader>
                <div className="mx-auto">
                    <ChartContainer
                        onClick={play}
                        config={{ timer: { color: "var(--primary)" } }}
                        className="mx-auto aspect-square max-h-[250px]"
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
                                <ChartLabel
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
                                                    {/*     {isRunning ? "Wait" : "Play"} */}
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
                    <div className="px-4">

                        <Field>
                            <ButtonGroup className="sm:hidden">
                                <Button disabled={isRunning || time <= 1} variant={'outline'} onClick={(e) => { e.preventDefault(); crementTime(true) }}>
                                    <Minus />
                                </Button>
                                <Input disabled={isRunning} readOnly type="number" value={time} onChange={(e) => parseInt(e.target.value) > 0 && setTime(parseInt(e.target.value))} />
                                <Button disabled={isRunning} variant={'outline'} onClick={(e) => { e.preventDefault(); crementTime() }} >
                                    <Plus />
                                </Button>
                            </ButtonGroup>
                            <Input className="hidden lg:block" type="number" value={time} onChange={(e) => parseInt(e.target.value) > 0 && setTime(parseInt(e.target.value))} />
                        </Field>
                        <Button onClick={() => {
                            if (!isRunning) {
                                return restart(new Date(Date.now() + time * 1000), false)
                            }
                        }} disabled={isRunning} variant={'default'} className="w-full mt-4">
                            Save
                        </Button>
                        <DrawerClose asChild>
                            <Button disabled={isRunning} onClick={() => setOpen(false)} variant={'secondary'} className="w-full mt-2">
                                Close
                            </Button>
                        </DrawerClose>
                    </div>

                </div>
            </DrawerContent>
        </Drawer >
    )
}
