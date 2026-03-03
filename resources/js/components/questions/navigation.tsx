import { Button } from '@/components/ui/button';
import DropDownNavigation from '@/components/events/menu';
import { ButtonGroup } from '@/components/ui/button-group';
import { ChevronLeft, ChevronRight, Minus, Plus, PlusCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { router, usePage } from '@inertiajs/react';
import { ShowEventProps } from '@/pages/events/show';
import items from '@/routes/items';
import events from '@/routes/events';

export default function QuestionNavigation() {
    const { event, question } = usePage<ShowEventProps>().props;

    const addQuestion = () => {
        router.post(items.store(parseInt(event.id as string)).url)
    }

    const changeQuestion = (question: number) => {
        router.get(events.show(event.id as number), {
            question: question
        })
    }

    const updateScore = (operation: '+' | '-') => {
        router.patch(items.update({
            event: event.id as number,
            item: question.id as number
        }).url, {
            operation: operation
        });
    }

    return (
        <ButtonGroup>
            <ButtonGroup>
                <Button variant={'outline'} size={'sm'} asChild className='text-xs'>
                    <div>
                        Question {question.index}
                    </div>
                </Button>
                <Button variant={'outline'} size={'sm'} onClick={() => changeQuestion(parseInt(question.id as string) - 1)} disabled={question.index == 1}>
                    <ChevronLeft />
                </Button>
                <Button variant={'outline'} size={'sm'} onClick={() => changeQuestion(parseInt(question.id as string) + 1)} disabled={question.index == event.latest_item.index}>
                    <ChevronRight />
                </Button>
                <Button variant={'outline'} size={'sm'} onClick={addQuestion}>
                    <PlusCircle />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant={'outline'} size={'sm'} onClick={() => updateScore('-')} disabled={question.score == 1}>
                    <Minus />
                </Button>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button asChild variant={'outline'} size={'sm'}>
                            <div>
                                {question.score}
                            </div>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        The score value of the current question
                    </TooltipContent>
                </Tooltip>
                <Button variant={'outline'} size={'sm'} onClick={() => updateScore('+')}>
                    <Plus />
                </Button>
            </ButtonGroup>
        </ButtonGroup>
    )
}
