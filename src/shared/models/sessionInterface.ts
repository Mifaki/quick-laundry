import type { IGeneralApiResponse } from './generalInterfaces';

export interface ISessionDetail {
  sessionId: number;
  machineId: number;
  machineName: string;
  isBooked: boolean;
  sessionStart: string;
  sessionEnd: string;
}

export interface ISessionsResponseData {
  dates: string[];
  timeSlots: Record<
    string, 
    Record<string, ISessionDetail[]>
  >;
}

export interface IAllSessionBookResponseRoot extends IGeneralApiResponse {
  data: ISessionsResponseData;
}
