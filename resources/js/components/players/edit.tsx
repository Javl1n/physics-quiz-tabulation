import { ReactNode, useContext, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "../ui/button";
import { EventType } from "@/types";
import { Field } from "../ui/field";
import { Label } from "../ui/label";
import { InputGroup, InputGroupInput } from "../ui/input-group";
import players from "@/routes/players";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import InputError from "../input-error";
import { PlayerContext } from "./player-item";

export default function EditPlayerDialog({ children }: { children: ReactNode }) {
    const player = useContext(PlayerContext);
    const { event } = usePage<{ event: EventType }>().props;
    const [isOpen, setIsOpen] = useState(false)

    const { data, setData, patch, reset, errors } = useForm<{
        name: string
    }>({
        name: player!.name
    });

    const save = () => {
        patch(players.store(event.id as number).url, {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            }
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Add Player</DialogTitle>
                    <DialogDescription>
                        Enter the player you want to add to the event. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <Field className="max-h-100 overflow-x-auto px-2 py-1">
                    <Label>Name</Label>
                    <InputGroup>
                        <InputGroupInput value={data.name}
                            onChange={(e) => (
                                setData('name', e.target.value)
                            )}
                            placeholder="John Doe"
                            autoFocus
                        />
                    </InputGroup>
                    <InputError message={errors.name} />
                </Field>
                <DialogFooter>
                    <Button onClick={() => save()}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
