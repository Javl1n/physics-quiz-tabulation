import { ReactNode, useContext } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { PenSquare, Trash } from "lucide-react";
import { PlayerType } from "@/types";
import { PlayerContext } from "./player-item";
import EditPlayerDialog from "./edit";
import DeletePlayerDialog from "./delete";

export default function PlayerMenu({ children }: { children: ReactNode }) {
    const preventClose = (e: Event) => e.preventDefault();
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <EditPlayerDialog>
                    <ContextMenuItem onSelect={preventClose}>
                        <PenSquare />
                        Rename Player
                    </ContextMenuItem>
                </EditPlayerDialog>
                <DeletePlayerDialog>
                    <ContextMenuItem onSelect={preventClose} variant="destructive">
                        <Trash />
                        Delete Player
                    </ContextMenuItem>
                </DeletePlayerDialog>
            </ContextMenuContent>
        </ContextMenu>
    )
}
