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

export default function CreatePlayersDialog({ children }: { children: ReactNode }) {
    const { event } = usePage<{ event: EventType }>().props;
    const [isOpen, setIsOpen] = useState(false)
    const [focusKey, setFocusKey] = useState<string | number>(0)
    const { data, setData, post, reset } = useForm<{
        names: {
            [key: string]: string
        }
    }>({
        names: {
            0: ""
        }
    })

    const newPlayer = () => {
        setData('names', {
            ...data.names,
            [Object.keys(data.names).length]: ""
        })


    }

    const deletePlayer = (key: string) => {
        setData('names', Object.fromEntries(
            Object.entries(data.names)
                .filter(([filterKey, _]) => filterKey != key)
                .map(([_, value], index) => [index.toString(), value])
        ))
    }

    const save = () => {
        post(players.store(event.id as number).url, {
            onFinish: () => {
                reset();
                setIsOpen(false);
            }
        });
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="">
                <AlertDialogHeader>
                    <AlertDialogTitle>Add Players</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter the players you want to add to the event. Click save when you are done.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Field className="max-h-100 overflow-x-auto px-2 py-1">
                    <Label>Names</Label>
                    {Object.keys(data.names).map((key: string) => (
                        <InputGroup>
                            <InputGroupInput value={data.names[key]}
                                onChange={(e) => (
                                    setData('names', {
                                        ...data.names,
                                        [key]: e.target.value
                                    })
                                )}
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        newPlayer()
                                    }
                                    setFocusKey(Object.keys(data.names).length)
                                }}
                                autoFocus={focusKey == key}
                            />
                            <InputGroupAddon align={"inline-end"}>
                                <InputGroupButton variant={'destructive'}
                                    onClick={() => deletePlayer(key)}
                                >
                                    <Trash />
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                    ))}
                </Field>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={save}>
                        Save
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
