export const errorFormat = (yupErrors: any) => {
  let errors: any = {};
  yupErrors.inner.forEach((error: any) => {
    errors[error.path] = error.message;
  });
  return errors;
};
