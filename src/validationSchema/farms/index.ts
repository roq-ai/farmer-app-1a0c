import * as yup from 'yup';

export const farmValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  location: yup.string().nullable(),
  size: yup.number().integer().nullable(),
  type: yup.string().nullable(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
