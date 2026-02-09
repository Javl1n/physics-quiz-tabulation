import { ReactNode, useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Field } from '../ui/field';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useForm, usePage } from '@inertiajs/react';
import { EventType } from '@/types';
import events from '@/routes/events';
import { Button } from '../ui/button';

export default function RenameEventDialog({ children }: { children: ReactNode }) {
    const { event } = usePage<{ event: EventType }>().props;
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, patch } = useForm<{ name: string }>({
        name: event.name
    })

    const save = () => {
        patch(events.update(event.id as number).url, {
            onFinish: () => setIsOpen(false)
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Rename Event
                    </DialogTitle>
                    <DialogDescription>
                        Enter the name you want the event to change into. Click save when done.
                    </DialogDescription>
                </DialogHeader>
                <Field>
                    <Label>Name</Label>
                    <Input name="name" value={data.name} onChange={(e) => setData("name", e.target.value)} />
                </Field>
                <DialogFooter>
                    <DialogClose>Cancel</DialogClose>
                    <Button onClick={save}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
