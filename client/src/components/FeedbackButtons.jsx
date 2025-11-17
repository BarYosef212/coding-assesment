import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';

const FeedbackButtons = ({ handleFeedback, feedback, contentType }) => {
  const handleValueChange = (value) => {
    if (value === 'positive') {
      handleFeedback(contentType, undefined, true);
    } else if (value === 'negative') {
      handleFeedback(contentType, undefined, false);
    }
  };

  const currentValue =
    feedback === true
      ? 'positive'
      : feedback === false
      ? 'negative'
      : undefined;

  return (
    <ToggleGroup
      type='single'
      variant='outline'
      spacing={8}
      size='sm'
      value={currentValue}
      onValueChange={handleValueChange}
      className='gap-2'
    >
      <ToggleGroupItem
        value='positive'
        aria-label='Positive feedback'
        className='data-[state=on]:bg-green-600 data-[state=on]:text-white data-[state=on]:border-green-600'
      >
        <ThumbsUpIcon className='w-4 h-4' />
      </ToggleGroupItem>
      <ToggleGroupItem
        value='negative'
        aria-label='Negative feedback'
        className='data-[state=on]:bg-red-600 data-[state=on]:text-white data-[state=on]:border-red-600'
      >
        <ThumbsDownIcon className='w-4 h-4' />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default FeedbackButtons;
