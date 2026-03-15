import { ReactNode, useContext, useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import events from "@/routes/events";
import { router, usePage } from "@inertiajs/react";
import { Button } from "../ui/button";
import { EventType } from "@/types";
import players from "@/routes/players";
import { PlayerContext } from "./player-item";

export default function DeletePlayerDialog({ children }: { children: ReactNode }) {
    const { event } = usePage<{ event: EventType }>().props;
    const [isOpen, setIsOpen] = useState(false)
    const player = useContext(PlayerContext);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Once deleted, scores and items related to the player will be deleted. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={() => router.delete(players.destroy({
                        event: event.id as number,
                        player: player!.id as number,
                    }), {
                        onSuccess: () => setIsOpen(false)
                    })}>
                        Confirm
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
