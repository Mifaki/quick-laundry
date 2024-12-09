import { IGeneralApiResponse } from './generalInterfaces';

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
  timeSlots: {
    [date: string]: {
      [time: string]: ISessionDetail[];
    };
  };
}

export interface IAllSessionBookResponseRoot extends IGeneralApiResponse {
  data: ISessionsResponseData;
}
