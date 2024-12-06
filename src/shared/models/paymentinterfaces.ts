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
