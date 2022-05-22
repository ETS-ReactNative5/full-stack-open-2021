import { useMutation } from '@apollo/client';

import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [deleteReview, result] = useMutation(DELETE_REVIEW);

  const removeReview = async ({ id }) => {
    const { data } = await deleteReview({ variables: { id } });

    return data;
  };

  return [removeReview, result];
};

export default useDeleteReview;
