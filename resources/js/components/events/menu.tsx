import { Link, router, usePage } from '@inertiajs/react';
import type { EventType } from '@/types';
import { FileSpreadsheet, LucideTrash, MoreHorizontalIcon, Plus, Sheet, SquarePen, TableProperties, Timer, Trophy, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateEventDialog from '@/components/events/create';
import events from '@/routes/events';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DeleteEventDialog from './delete';
import RenameEventDialog from './rename';
import CreatePlayersDialog from '../players/create';
import { ButtonGroup } from '../ui/button-group';
import { ShowEventProps } from '@/pages/events/show';
import TimerControllerDrawer from '../timer/controller';


export default function DropDownNavigation() {
    const { event, events: eventList } = usePage<ShowEventProps>().props;

    const preventClose = (e: Event) => e.preventDefault();
    return (
        <ButtonGroup>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size={'sm'} variant={"outline"}>
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
                                    {eventList.map((event: EventType) => (
                                        <DropdownMenuRadioItem value={event.id as string} onClick={() => router.visit(events.show(event.id as number))}>
                                            {event.name}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <CreateEventDialog>
                            <DropdownMenuItem className='text-sm gap-2' onSelect={preventClose}>
                                <Plus />
                                New Event
                            </DropdownMenuItem>
                        </CreateEventDialog>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <RenameEventDialog>
                            <DropdownMenuItem className='text-sm gap-2' onSelect={preventClose}>
                                <SquarePen />
                                Rename Event
                            </DropdownMenuItem>
                        </RenameEventDialog>
                        <CreatePlayersDialog>
                            <DropdownMenuItem className='text-sm gap-2' onSelect={preventClose}>
                                <UserPlus />
                                Add Players
                            </DropdownMenuItem>
                        </CreatePlayersDialog>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild className='sm:hidden'>
                            <a href={events.leaderboard(event.id as number).url} target='_blank'>
                                <Trophy />
                                Leaderboards
                            </a>
                        </DropdownMenuItem>
                        <TimerControllerDrawer>
                            <DropdownMenuItem className={'sm:hidden'} onSelect={preventClose}>
                                <Timer />
                                Timer
                            </DropdownMenuItem>
                        </TimerControllerDrawer>
                        <a href={events.export(event.id as number).url} download>
                            <DropdownMenuItem onSelect={preventClose}>
                                <FileSpreadsheet />
                                Export
                            </DropdownMenuItem>
                        </a>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DeleteEventDialog>
                            <DropdownMenuItem className='text-sm gap-2' variant='destructive' onSelect={preventClose}>
                                <LucideTrash className='text-destructive' />
                                Delete Event
                            </DropdownMenuItem>
                        </DeleteEventDialog>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu >
        </ButtonGroup>
    )
}
