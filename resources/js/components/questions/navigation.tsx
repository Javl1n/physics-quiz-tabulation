import { Button } from '@/components/ui/button';
import DropDownNavigation from '@/components/events/menu';
import { ButtonGroup } from '@/components/ui/button-group';
import { ChevronLeft, ChevronRight, Minus, Plus, PlusCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function QuestionNavigation() {
    return (
        <ButtonGroup>
            <ButtonGroup>
                <Button variant={'outline'} size={'sm'} asChild className='text-xs'>
                    <div>
                        Question 1
                    </div>
                </Button>
                <Button variant={'outline'} size={'sm'}>
                    <ChevronLeft />
                </Button>
                <Button variant={'outline'} size={'sm'}>
                    <ChevronRight />
                </Button>
                <Button variant={'outline'} size={'sm'}>
                    <PlusCircle />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant={'outline'} size={'sm'}>
                    <Minus />
                </Button>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button asChild variant={'outline'} size={'sm'}>
                            <div>
                                10
                            </div>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        The score value of the current question
                    </TooltipContent>
                </Tooltip>
                <Button variant={'outline'} size={'sm'}>
                    <Plus />
                </Button>
            </ButtonGroup>
        </ButtonGroup>
    )
}
