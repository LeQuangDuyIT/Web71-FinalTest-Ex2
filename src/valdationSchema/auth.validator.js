import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});

const AuthValidator = {
  loginSchema
};

export default AuthValidator;
