import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, EventType } from '@/types';
import { Button } from '@/components/ui/button';
import events from '@/routes/events';
import DropDownNavigation from '@/components/events/menu';
import PlayerItem from '@/components/players/player-item';
import { ItemGroup } from '@/components/ui/item';



export default function ShowEvents({ event }: { event: EventType }) {
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
                <div className='flex justify-end w-full gap-2'>
                    <Button className='text-xs mx-2'>Next Question</Button>
                    <DropDownNavigation />
                </div>
                <ItemGroup className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                    {event.players.map((player) => (
                        <PlayerItem player={player} />
                    ))}
                </ItemGroup>
            </div>
        </AppLayout>
    );
}


