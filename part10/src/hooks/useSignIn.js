import { useMutation, useApolloClient } from '@apollo/client';

import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const [authenticate, result] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    const { data } = await authenticate({ variables: { username, password } });

    if (data?.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
    }

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
