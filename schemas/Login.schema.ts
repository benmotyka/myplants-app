import * as Yup from 'yup';
import i18n from '../i18n'

const { t } = i18n

export const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Username too short. Minimum 4 characters.')
      .max(20, 'Username too long. Maximum 20 characters.')
      .required(t('errors.required')),
    password: Yup.string()
      .min(6, 'Password too short. Minimum 6 characters.')
      .required(t('errors.required')),
  });