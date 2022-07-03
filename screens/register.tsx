import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React from "react";
import { RootStackParamList } from "../App";
import Back from "../components/Back/Back";
import BasicButton from "../components/BasicButton/BasicButton";
import BasicTextInput from "../components/BasicTextInput/BasicTextInput";
import plantsApi from "../config/api/plants";
import {
  ColumnCenterWrapper,
  Header,
  InputsWrapper,
  MarginTopView,
  ScreenContainer,
} from "../styles/shared";

type RegisterProps = NativeStackScreenProps<RootStackParamList, "register">;

interface RegisterForm {
  name: string;
  password: string;
}

const Register = ({ navigation }: RegisterProps): JSX.Element => {

  const [apiError, setApiError] = React.useState('')

  const onSubmit = async (
    values: RegisterForm,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setApiError('')
      const result = await plantsApi.post('/auth/register', {
        username: values.name,
        password: values.password
      })
      console.log(result)
      resetForm()
      navigation.navigate("home");
    } catch (error) {
      console.error(error)
      setApiError('Invalid credentials')
    }

  };
  return (
    <ScreenContainer>
      <ColumnCenterWrapper>
        <Back navigation={navigation} />
        <Header>Register</Header>
        <Formik initialValues={{ name: "", password: "" }} onSubmit={onSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <InputsWrapper>
              <BasicTextInput
                label="Username"
                placeholder="Enter your username..."
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                error={apiError}
              />
              <BasicTextInput
                label="Password"
                placeholder="Enter your password..."
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                hideInput={true}
                error={apiError}
              />
              <MarginTopView>
                <BasicButton
                  onPress={handleSubmit as (values: any) => void}
                  text="Submit"
                />
              </MarginTopView>
            </InputsWrapper>
          )}
        </Formik>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default Register;
