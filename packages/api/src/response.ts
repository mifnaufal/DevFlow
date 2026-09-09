export interface ApiResponse<T = unknown> {
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    cursor?: string;
  };
}

export function success<T>(data: T, meta?: ApiResponse['meta']): ApiResponse<T> {
  return { data, meta };
}

export function failure(
  code: string,
  message: string,
  details?: Record<string, string[]>
): ApiResponse {
  return { error: { code, message, details } };
}
