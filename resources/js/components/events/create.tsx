import { ReactNode, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "@inertiajs/react";
import { Button } from "../ui/button";
import events from "@/routes/events";
import InputError from "../input-error";

export default function CreateEventDialog({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, errors } = useForm<{
        name: string
    }>({
        name: ''
    })

    const save = () => {
        post(events.store().url, {
            onFinish: () => setOpen(false)
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogDescription>
                        Enter the name of the event here. Click submit when you&apos;re done. <br />Hint: make the event name more meaningful.
                    </DialogDescription>
                </DialogHeader>
                <Field>
                    <Label>Event Name</Label>
                    <Input value={data.name} onChange={(e) => setData("name", e.target.value)} />
                    <InputError message={errors.name} />
                </Field>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'outline'}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={save}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
