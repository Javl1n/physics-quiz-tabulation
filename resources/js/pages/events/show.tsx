import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { TableProperties } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateEventDialog from '@/components/events/create';
import events from '@/routes/events';



export default function ShowEvents() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Events',
            href: events.index().url,
        },
        // {
        //     title: ''
        // }
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant={'icon'}>
                            <TableProperties />
                        </EmptyMedia>
                        <EmptyTitle>No Events Yet</EmptyTitle>
                        <EmptyDescription>
                            You haven&apos;t recorded any evets/sessions yet. Get started by adding your first event.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <CreateEventDialog>
                            <Button>Add Event</Button>
                        </CreateEventDialog>
                    </EmptyContent>
                </Empty>
            </div>
        </AppLayout>
    );
}
