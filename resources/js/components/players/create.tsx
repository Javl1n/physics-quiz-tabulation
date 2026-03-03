import { HtmlHTMLAttributes, KeyboardEventHandler, ReactNode, useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import events from "@/routes/events";
import { router, useForm, usePage } from "@inertiajs/react";
import { Button } from "../ui/button";
import { EventType } from "@/types";
import { Field } from "../ui/field";
import { Label } from "../ui/label";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";
import { Trash } from "lucide-react";
import players from "@/routes/players";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import InputError from "../input-error";
import { Kbd, KbdGroup } from "../ui/kbd";

export default function CreatePlayersDialog({ children }: { children: ReactNode }) {
    const { event } = usePage<{ event: EventType }>().props;
    const [isOpen, setIsOpen] = useState(false)
    const [focusKey, setFocusKey] = useState<string | number>(0)
    const { data, setData, post, reset, errors } = useForm<{
        name: string
    }>({
        name: ""
    });

    const save = (canContinue: boolean = false) => {
        post(players.store(event.id as number).url, {
            onSuccess: () => {
                reset();
                setIsOpen(canContinue);
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
                            onKeyUp={(e) => {
                                if (e.key === "Enter" && e.ctrlKey) {
                                    save(true)
                                } else if (e.key === "Enter") {
                                    save(false)
                                }
                            }}
                            placeholder="John Doe"
                            autoFocus
                        />
                    </InputGroup>
                    <InputError message={errors.name} />
                </Field>
                <DialogFooter>
                    <Button variant={"secondary"} onClick={() => save(true)}>
                        Next{" "}
                        <KbdGroup data-icon="inline-end">
                            <Kbd>
                                Ctrl
                            </Kbd>
                            <Kbd>
                                ⏎
                            </Kbd>
                        </KbdGroup>
                    </Button>
                    <Button onClick={() => save()}>
                        Save{" "}
                        <Kbd data-icon="inline-end">
                            ⏎
                        </Kbd>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
