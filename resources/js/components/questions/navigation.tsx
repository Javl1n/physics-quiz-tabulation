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
import SelectQuestionDropdown from './select-dropdown';
import ScoreFormNavigation from './score-form';

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
    return (
        <ButtonGroup>
            <ButtonGroup>
                <SelectQuestionDropdown>
                    <Button variant={'outline'} size={'sm'} asChild className='text-xs'>
                        <div>
                            Q{question.index}
                        </div>
                    </Button>
                </SelectQuestionDropdown>
                <Button className='hidden md:block' variant={'outline'} size={'sm'} onClick={() => changeQuestion(parseInt(question.id as string) - 1)} disabled={question.index == 1}>
                    <ChevronLeft />
                </Button>
                <Button className='hidden md:block' variant={'outline'} size={'sm'} onClick={() => changeQuestion(parseInt(question.id as string) + 1)} disabled={question.index == event.latest_item.index}>
                    <ChevronRight />
                </Button>
                <Button variant={'outline'} size={'sm'} onClick={addQuestion}>
                    <PlusCircle />
                </Button>
            </ButtonGroup>
            <ScoreFormNavigation />
        </ButtonGroup>
    )
}
