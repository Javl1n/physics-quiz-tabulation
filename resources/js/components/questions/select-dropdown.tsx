import { ReactNode } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link, usePage } from "@inertiajs/react";
import { ShowEventProps } from "@/pages/events/show";
import events from "@/routes/events";

export default function SelectQuestionDropdown({ children }: { children: ReactNode }) {
    const { questions, event } = usePage<ShowEventProps>().props;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {questions.map((question) => (
                    <DropdownMenuItem asChild key={`quesstion-${question.id}`}>
                        <Link href={events.show(event.id as number, {
                            query: {
                                question: question.index
                            }
                        }).url}>
                            Question {question.index}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )

}
