import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Username too short. Minimum 4 characters.')
      .max(20, 'Password too long. Maximum 20 characters.')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password too short. Minimum 6 characters.')
      .required('Required'),
  });