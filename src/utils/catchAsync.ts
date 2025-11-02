import { standardResponse } from "../response/standardResponse.js";

export const catchAsync = (
  fn: (req: any, res: any, next: any) => Promise<void>
) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      return res.status(500).json(standardResponse(null, error.message, 200));
    });
  };
};
