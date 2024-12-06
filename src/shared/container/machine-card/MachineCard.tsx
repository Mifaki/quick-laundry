import { Checkbox } from '../ui/checkbox';

interface IMachineCard {
  id: string;
  state: 'available' | 'not_available' | 'selected';
  title: string;
  sessionStart: string;
  sessionEnd: string;
}

const MachineCard = ({ id, state, title, sessionStart, sessionEnd }: IMachineCard) => {
  return (
    <div className="flex items-center gap-4 rounded-md border p-4 shadow-sm">
      <Checkbox />
      <div>
        <p className="font-semibold">{title}</p>
        <span>
          {sessionStart} - {sessionEnd}
        </span>
      </div>
    </div>
  );
};

export default MachineCard;
