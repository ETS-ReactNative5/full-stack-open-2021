import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Button from './Button';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.normal,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    padding: 10,
  }
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required').lowercase(),
  repositoryName: yup.string().required('Repository name is required').lowercase(),
  rating: yup.number().integer().required('Rating is required').min(0).max(100),
  text: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owner name"
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
      />
      <FormikTextInput
        name="text"
        placeholder="Review"
        multiline
      />
      <Button onPress={onSubmit} style={styles.button}>
        Create a review
      </Button>
    </View>
  );
};


const CreateReview = () => {
  const [addReview] = useCreateReview();
  const navigate = useNavigate();
  
  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    const { createReview: { repositoryId } } = await addReview({ repositoryName, ownerName, rating, text });
    
    navigate(`/${repositoryId}`, { replace: true });
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;