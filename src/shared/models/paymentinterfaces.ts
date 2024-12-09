import { IGeneralApiResponse } from './generalInterfaces';

export interface IPaymentItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ITransactionDetails {
  order_id: number;
  gross_amount: number;
}

export interface IMidtransPaymentParameter {
  item_details: IPaymentItem[];
  transaction_details: ITransactionDetails;
}

export interface IPaymentPayloadRoot {
  fullName: string;
  phoneNumber: string;
  date: string;
  session: string;
  laundryMachineId: string;
  price: number;
  quantity: number;
}

export interface IMidtransResponseData {
  token: string;
  redirect_url: string;
}

export interface IPaymentResponseRoot extends IGeneralApiResponse {
  data: IMidtransResponseData;
}
