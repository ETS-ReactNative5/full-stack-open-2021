import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import Button from './Button';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  button: {
    margin: 20,
    padding: 10,
  }
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(1).max(30).lowercase(),
  password: yup.string().required('Password is required').min(5).max(50),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null]).required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        secureTextEntry={true}
      />
      <Button onPress={onSubmit} style={styles.button}>
        Sign Up
      </Button>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  
  const onSubmit = async (values) => {
    const { username, password } = values;

    await signUp({ username, password });
    await signIn({ username, password });

    navigate('/', { replace: true });
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;