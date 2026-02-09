import { ReactNode } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { PenSquare, Trash } from "lucide-react";
import { PlayerType } from "@/types";

export default function PlayerContextMenu({ children, player }: { children: ReactNode, player: PlayerType }) {
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
