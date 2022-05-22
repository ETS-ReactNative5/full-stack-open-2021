import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';

import theme from '../theme';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.lightGray,
  },
  header: {
    backgroundColor: theme.colors.lightGray,
    paddingBottom: 10,
  }
});

const SingleRepository = () => {
  const { id } = useParams();

  const { repository, fetchMore } = useRepository({
    id: id,
    first: 10,
  });

  const reviewNodes = repository?.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <>
      {repository && (
        <FlatList
          data={reviewNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <ReviewItem item={item} />}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => <RepositoryItem item={repository} link={true} />}
          ListHeaderComponentStyle={styles.header}
          onEndReached={() => fetchMore()}
          onEndReachedThreshold={0.5}
        />
      )}
    </>
  );
};

export default SingleRepository;