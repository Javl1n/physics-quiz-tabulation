import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, EventType, ItemType, SharedData } from '@/types';
import events from '@/routes/events';
import PlayerItem from '@/components/players/player-item';
import { ItemGroup } from '@/components/ui/item';
import DropDownNavigation from '@/components/events/menu';
import QuestionNavigation from '@/components/questions/navigation';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.name} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='flex justify-between'>
                    <QuestionNavigation />

                    <ButtonGroup>
                        <ButtonGroup className='hidden md:block'>
                            <Button asChild variant={'outline'} size={'sm'}>
                                <a href={events.leaderboard(event.id as number).url} target='_blank'>
                                    <Trophy />
                                </a>
                            </Button>
                        </ButtonGroup>
                        <DropDownNavigation />
                    </ButtonGroup>
                </div>
                <ItemGroup className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                    {event.players.map((player) => (
                        <PlayerItem key={`player-${player.id}`} player={player} />
                    ))}
                </ItemGroup>
            </div>
        </AppLayout>
    );
}


