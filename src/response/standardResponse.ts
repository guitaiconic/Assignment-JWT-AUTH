export const standardResponse = (
  data: any,
  message: string,
  statusCode: Number
) => {
  return {
    data,
    message,
    statusCode,
  };
};
