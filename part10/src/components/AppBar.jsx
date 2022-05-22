import { Pressable, View, Text, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import theme from '../theme';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.darkGray,
  },
  scrollView: {
    flexDirection: "row",
  },
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  },
});

const AppBarTab = ({ children, to, ...props }) => {
  const content = (
    <View style={styles.tabContainer} {...props}>
      <Text fontWeight="bold" style={styles.tabText}>
        {children}
      </Text>
    </View>
  );

  return to ? (
    <Link to={to} {...props}>
      {content}
    </Link>
  ) : (
    <Pressable {...props}>{content}</Pressable>
  );
};

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const { data } = useQuery(ME);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {data?.me ? (
          <>
            <AppBarTab to="/review">Create a review</AppBarTab>
            <AppBarTab to="/myreviews">My reviews</AppBarTab>
            <AppBarTab onPress={signOut}>Sign out</AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab to="/signin">Sign in</AppBarTab>
            <AppBarTab to="/signup">Sign up</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;