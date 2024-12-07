declare module 'midtrans-client' {
  interface ConfigOptions {
    isProduction?: boolean;
    serverKey: string;
    clientKey: string;
  }

  interface ChargeRequest {
    payment_type?: string;
    transaction_details: {
      order_id: number;
      gross_amount: number;
    };
    customer_details?: {
      first_name?: string;
      last_name?: string;
      email?: string;
      phone?: string;
    };
    item_details?: Array<{
      id?: string | number;
      price: number;
      quantity: number;
      name: string;
    }>;
    [key: string]: any;
  }

  interface TransactionResponse {
    status_code: string;
    status_message: string;
    transaction_id?: string;
    order_id: string;
    redirect_url?: string;
    token?: string;
    [key: string]: any;
  }

  class Snap {
    constructor(options: ConfigOptions);
    createTransaction(parameter: ChargeRequest): Promise<TransactionResponse>;
    createTransactionToken(parameter: ChargeRequest): Promise<string>;
    createTransactionRedirectUrl(parameter: ChargeRequest): Promise<string>;
  }

  class Core {
    constructor(options: ConfigOptions);
    charge(parameter: ChargeRequest): Promise<TransactionResponse>;
    status(orderId: string): Promise<any>;
    approve(orderId: string): Promise<any>;
    cancel(orderId: string): Promise<any>;
    expire(orderId: string): Promise<any>;
    refund(orderId: string, parameter?: any): Promise<any>;
  }

  export { Snap, Core, ConfigOptions, ChargeRequest, TransactionResponse };
}
