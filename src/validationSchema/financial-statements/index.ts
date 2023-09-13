import * as yup from 'yup';

export const financialStatementValidationSchema = yup.object().shape({
  contract_id: yup.string().required(),
  total_income: yup.number().integer().required(),
  total_expense: yup.number().integer().required(),
  net_income: yup.number().integer().required(),
  statement_date: yup.date().required(),
  farm_id: yup.string().nullable().required(),
});
