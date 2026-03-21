import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, EventType, ItemType, SharedData } from '@/types';
import events from '@/routes/events';
import PlayerItem from '@/components/players/player-item';
import { ItemGroup } from '@/components/ui/item';
import DropDownNavigation from '@/components/events/menu';
import QuestionNavigation from '@/components/questions/navigation';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { Timer, Trophy, UserCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import TimerControllerDrawer from '@/components/timer/controller';

export type ShowEventProps = SharedData & {
    event: EventType;
    events: EventType[];
    question: ItemType;
    questions: ItemType[];
}

export default function ShowEvents({ event }: ShowEventProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Events',
            href: events.index().url,
        },
        {
            title: event.name,
            href: events.show(event.id as number).url
        }
    ];

    const [query, setQuery] = useState("");
    const players = event.players.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) || user.player_number.toString().includes(query)
    )

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.name} />
            <div className="space-y-4  p-4" >
                <div className='md:flex md:justify-between gap-2'>
                    <div className='hidden md:block'>
                        <Input className='h-8 w-80 ' placeholder='Search player' onChange={(e) => {
                            setQuery(e.target.value)
                        }} />
                    </div>
                    <div className='flex justify-between gap-2'>

                        <QuestionNavigation />

                        <ButtonGroup>
                            <ButtonGroup className='hidden md:block'>
                                <Button asChild variant={'outline'} size={'sm'}>
                                    <a href={events.leaderboard(event.id as number).url} target='_blank'>
                                        <Trophy />
                                    </a>
                                </Button>
                                <TimerControllerDrawer>
                                    <Button variant={'outline'} size={'sm'}>
                                        <Timer />
                                    </Button>
                                </TimerControllerDrawer>
                            </ButtonGroup>
                            <DropDownNavigation />
                        </ButtonGroup>
                    </div>

                </div>
                <Input value={query} className='md:hidden' placeholder='Search player' onChange={(e) => setQuery(e.target.value)} />
                <ItemGroup className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                    {players.map((player) => (
                        <PlayerItem key={`player-${player.id}`} player={player} />
                    ))}
                </ItemGroup>
                {players.length === 0 && (
                    <Empty className='h-full'>
                        <EmptyHeader>
                            <EmptyMedia variant={'icon'}>
                                <UserCircle />
                            </EmptyMedia>
                            <EmptyTitle>{event.players.length === 0 ? "No Players Yet" : "Player Not Found"}</EmptyTitle>
                            <EmptyDescription>
                                {event.players.length === 0 ? "Add players to get started" : `No players with ${query} in their name found`}
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                )}
            </div>
        </AppLayout>
    );
}


