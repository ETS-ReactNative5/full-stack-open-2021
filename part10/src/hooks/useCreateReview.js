import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW);

  const addReview = async ({ repositoryName, ownerName, rating, text }) => {
    const { data } = await createReview({
      variables: {
        repositoryName,
        ownerName,
        rating: Number(rating),
        text
      }
    });

    return data;
  };

  return [addReview, result];
};

export default useCreateReview;
