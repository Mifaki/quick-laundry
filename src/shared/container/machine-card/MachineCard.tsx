import { cn } from '@/lib/utils';

interface IMachineCard {
  id: string;
  state: 'available' | 'not_available' | 'selected';
  title: string;
  sessionStart: string;
  sessionEnd: string;
}

const MachineCard = ({ id, state, title, sessionStart, sessionEnd }: IMachineCard) => {
  return (
    <div
      className={cn('flex items-center gap-4 rounded-md border p-4 shadow-sm', {
        'border-green-300 bg-green-50': state === 'available',
        'border-gray-300 bg-gray-50 opacity-50': state === 'not_available',
        'border-blue-300 bg-blue-50': state === 'selected',
      })}
    >
      <div className="w-full">
        <p className="font-semibold">{title}</p>
        <span className="text-sm text-gray-500">
          {sessionStart} - {sessionEnd}
        </span>
      </div>
    </div>
  );
};

export default MachineCard;
