import { ShowEventProps } from "@/pages/events/show";
import { router, usePage } from "@inertiajs/react";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";
import items from "@/routes/items";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ScoreFormNavigation() {
    const { event, question } = usePage<ShowEventProps>().props;

    const [score, setScore] = useState<{
        initial: number,
        form: number
    }>({
        initial: question.score,
        form: question.score
    })

    const saveScore = () => {
        router.patch(items.update({
            event: event.id as number,
            item: question.id as number
        }).url, {
            score: score.form
        }, {
            onSuccess: () => setScore(prev => ({ initial: prev.form, form: prev.form }))
        });
    }

    const updateScore = (score: number) => {
        if (score < 1) return;
        setScore(prev => ({
            ...prev,
            form: score
        }))
    }

    useEffect(() => {
        setScore({
            initial: question.score,
            form: question.score
        })
    }, [question.id])

    return (
        <ButtonGroup>
            {/* <Button variant={'outline'} size={'sm'} disabled> */}
            {/*     Score: */}
            {/* </Button> */}
            <Input className='h-8' value={score.form} onChange={(e) => updateScore(parseInt(e.target.value))} size={1} type='number' />
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button disabled={score.initial == score.form} variant={'outline'} size={'sm'} onClick={() => saveScore()}>
                        <Check />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Save the updated score value of the question.
                </TooltipContent>
            </Tooltip>
        </ButtonGroup>
    )
}
