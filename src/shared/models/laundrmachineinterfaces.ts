export interface ILaundryMachine {
  id: number;
  name: string;
  createdAt: string;
}

export interface ISession {
  id: number;
  sessionStart: string;
  sessionEnd: string;
  date: string;
  laundryMachineId: number;
  isBooked: number;
  createdAt: string;
}
