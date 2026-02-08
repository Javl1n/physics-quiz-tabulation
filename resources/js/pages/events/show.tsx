import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Event } from '@/types';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { LucideTrash, MoreHorizontalIcon, Pen, Plus, PlusSquare, SquarePen, TableProperties } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateEventDialog from '@/components/events/create';
import events from '@/routes/events';
import { ButtonGroup } from '@/components/ui/button-group';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';



export default function ShowEvents({ event, eventList }: { event: Event, eventList: Event[] }) {
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
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='flex justify-end w-full gap-2'>
                    <Button className='text-xs mx-2'>Next Question</Button>
                    <DropDownNavigation />
                </div>
            </div>
        </AppLayout>
    );
}

function DropDownNavigation() {
    const { event, eventList } = usePage<{
        event: Event,
        eventList: Event[]
    }>().props
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={" my-auto"} variant={"secondary"}>
                    <MoreHorizontalIcon className='' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className='text-sm gap-1'>
                            <TableProperties className='size-4 my-auto' />
                            Change Event
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuRadioGroup
                                value={event.id as string}
                                onValueChange={(event) => events.show(event as unknown as number)}
                            >
                                {eventList.map((event: Event) => (
                                    <DropdownMenuRadioItem value={event.id as string}>
                                        {event.name}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem className='text-sm gap-2'>
                        <SquarePen />
                        Rename Event
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className='text-sm gap-2'>
                        <Plus />
                        Add Player
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>

                    <DropdownMenuItem className='text-sm gap-2' variant='destructive'>
                        <LucideTrash className='text-destructive' />
                        Delete Event
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
