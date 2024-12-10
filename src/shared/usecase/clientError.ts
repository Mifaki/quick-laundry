export class ClientError extends Error {
  public code: number;

  private constructor(message: string, code: number) {
    super(message);
    this.name = 'ClientError';
    this.code = code;
  }

  static async create(response: Response): Promise<ClientError> {
    const defaultMessages: Record<number, string> = {
      400: 'Bad Request: The server could not understand the request.',
      401: 'Unauthorized: Authentication is required.',
      403: "Forbidden: You don't have permission to access this resource.",
      404: 'Not Found: The requested resource could not be found.',
      500: 'Internal Server Error: Something went wrong on the server.',
      502: 'Bad Gateway: The server received an invalid response.',
      503: 'Service Unavailable: The server is currently unable to handle the request.',
      504: 'Gateway Timeout: The server took too long to respond.',
    };

    const errorData = await response.json();
    const message =
      errorData.message || defaultMessages[response.status] || 'An unknown error occurred';

    return new ClientError(message, response.status);
  }
}
