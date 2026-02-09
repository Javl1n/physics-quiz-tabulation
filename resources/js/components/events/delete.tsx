import { ReactNode, useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import events from "@/routes/events";
import { router, usePage } from "@inertiajs/react";
import { Button } from "../ui/button";
import { EventType } from "@/types";

export default function DeleteEventDialog({ children }: { children: ReactNode }) {
    const { event } = usePage<{ event: EventType }>().props;
    const [isOpen, setIsOpen] = useState(false)
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Once deleted, players, scores and items related to the event will be deleted. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={() => router.delete(events.destroy(event.id as number), {
                        onSuccess: () => setIsOpen(false)
                    })}>
                        Confirm
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
