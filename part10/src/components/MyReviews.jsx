import { View, FlatList, StyleSheet } from 'react-native';

import theme from '../theme';
import ReviewItem from './ReviewItem';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.lightGray,
  },
});

const MyReviews = () => {
  const { data, refetch } = useQuery(ME,
    { variables: { includeReviews: true } }
  );

  const reviewNodes = data?.me && data?.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem item={item} showActions={true} refetch={refetch} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;