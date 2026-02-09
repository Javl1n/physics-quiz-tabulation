import { ReactNode, useContext } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { PenSquare, Trash } from "lucide-react";
import { PlayerType } from "@/types";
import { PlayerContext } from "./player-item";

export default function PlayerMenu({ children }: { children: ReactNode }) {
    const player = useContext(PlayerContext);
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>
                    <PenSquare />
                    Rename Player
                </ContextMenuItem>
                <ContextMenuItem variant="destructive">
                    <Trash />
                    Delete Player
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
