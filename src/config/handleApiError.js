export const getMessage = (e) => {
  return { message: e?.response?.data?.message || 'Something unexpected occurred' }
};