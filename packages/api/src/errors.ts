export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export class ApiErrorResponse extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number = 400,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiErrorResponse';
  }

  toJSON(): ApiError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}

export function createError(
  code: string,
  message: string,
  status: number = 400,
  details?: Record<string, string[]>
): ApiErrorResponse {
  return new ApiErrorResponse(code, message, status, details);
}

// Common error codes
export const errors = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  CONFLICT: 'CONFLICT',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;
