import * as yup from 'yup';

export const saleValidationSchema = yup.object().shape({
  product_name: yup.string().required(),
  quantity: yup.number().integer().required(),
  price: yup.number().integer().required(),
  sale_date: yup.date().required(),
  buyer: yup.string().required(),
  farm_id: yup.string().nullable().required(),
});
