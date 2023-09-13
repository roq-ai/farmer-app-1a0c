import * as yup from 'yup';

export const purchaseValidationSchema = yup.object().shape({
  product_name: yup.string().required(),
  quantity: yup.number().integer().required(),
  price: yup.number().integer().required(),
  purchase_date: yup.date().required(),
  supplier: yup.string().required(),
  farm_id: yup.string().nullable().required(),
});
