import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.normal,
    borderWidth: 1,
    color: theme.colors.textPrimary,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    padding: 10,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={styles.input}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;