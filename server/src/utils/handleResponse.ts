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
  res.status(code).json({
    success: false,
    message,
    error: error instanceof Error ? error.message : error,
  });
};

const handleSuccessResponse = (res: Response, data: object) => {
  res.status(200).json({ success: true, data });
};

export { handleErrorResponse, handleSuccessResponse };
