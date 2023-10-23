import * as yup from 'yup';

const createOrderSchema = yup.object().shape({
  price: yup.number().required(),
  quantity: yup.number().required()
});

const orderValidator = {
  createOrderSchema
};

export default orderValidator;
