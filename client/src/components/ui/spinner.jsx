import { Loader2Icon } from 'lucide-react';

import { cn } from '../../lib/utils';

function Spinner({ label,className, ...props }) {
  return (
    <div className='flex items-center gap-2'>
      <Loader2Icon
        role='status'
        aria-label='Loading'
        className={cn('size-4 animate-spin', className)}
        {...props}
      />
    {label && <p className='text-muted-foreground'>{label}</p>}
    </div>
  );
}

export { Spinner };
