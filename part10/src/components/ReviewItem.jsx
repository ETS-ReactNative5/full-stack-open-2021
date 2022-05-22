import { View, Text, Alert, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';

import theme from '../theme';
import Button from './Button';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  topContainer: {
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftContainer: {
    flexGrow: 0,
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.normal,
    marginRight: 20,
  },
  rightContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  rating: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 100,
    color: theme.colors.primary,
    display: 'flex',
    fontSize: theme.fontSizes.h1,
    fontWeight: theme.fontWeights.bold,
    justifyContent: 'center',
    height: 60,
    width: 60,
  },
  username: {
    fontSize: theme.fontSizes.h1,
    fontWeight: theme.fontWeights.bold,
  },
  date: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    marginBottom: 6,
    marginTop: 6,
  },
  text: {
    marginTop: 6,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    width: '100%',
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
});

const ReviewItem = ({ item, showActions = false, refetch = null }) => {
  const navigate = useNavigate();
  const [removeReview] = useDeleteReview();

  const {
    id,
    createdAt,
    rating,
    text,
    user,
    repositoryId
  } = item;

  const onPressView = () => navigate(`/${repositoryId}`, { replace: true });

  const onPressDelete = () => (
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => onDelete() }
      ]
    )
  );

  const onDelete = async () => {
    await removeReview({ id });
    refetch();
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.rating}>{rating}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.date}>{format(new Date(createdAt), "dd.mm.yyyy")}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
      {showActions && (
        <View style={styles.bottomContainer}>
          <Button onPress={onPressView}>
            View repository
          </Button>
          <Button onPress={onPressDelete} style={styles.deleteButton}>
            Delete review
          </Button>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;