import * as yup from 'yup';

export const visitValidationSchema = yup.object().shape({
  salesperson_name: yup.string().required(),
  visit_date: yup.date().required(),
  purpose: yup.string().required(),
  notes: yup.string().nullable(),
  farm_id: yup.string().nullable().required(),
});
