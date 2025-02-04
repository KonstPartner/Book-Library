import { Response } from 'express';

type ErrorResponseParams = {
  res: Response;
  message: string;
  error?: unknown;
  code?: number;
};

const handleErrorResponse = ({
  res,
  message,
  error = new Error('none'),
  code = 500,
}: ErrorResponseParams) => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'code' in error
  ) {
    res.status(Number(error.code)).json({
      success: false,
      message: error.message,
    });
  } else {
    res.status(code).json({
      success: false,
      message,
      error: error instanceof Error ? error.message : error,
    });
  }
};

const handleSuccessResponse = (res: Response, data: object | null = null) => {
  if (data) {
    res.status(200).json({ success: true, data });
  } else {
    res.status(204).send();
  }
};

export { handleErrorResponse, handleSuccessResponse };
