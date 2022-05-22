import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from "use-debounce";

import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.lightGray,
    padding: 20,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.lightGray,
  },
  picker: {
    backgroundColor: theme.colors.lightGray,
    borderWidth: 0,
    marginTop: 20,
    padding: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;
export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  renderHeader = () => {
    const {
      orderDirection,
      setOrderDirection,
      searchKeyword,
      setSearchKeyword,
    } = this.props;

    return (
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={(keyword) => setSearchKeyword(keyword)}
          value={searchKeyword}
        />
        <Picker
          selectedValue={orderDirection}
          onValueChange={(item) => setOrderDirection(item || undefined)}
          style={styles.picker}
        >
          <Picker.Item label="Latest repositories" value='' />
          <Picker.Item label="Highest related repositories" value='DESC' />
          <Picker.Item label="Lowest related repositories" value='ASC' />
        </Picker>
      </View>
    );
  };

  render() {
    const {
      repositories,
      onEndReach,
    } = this.props;
    
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderDirection, setOrderDirection] = useState(undefined);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories, fetchMore } = useRepositories({
    orderDirection,
    debouncedSearchKeyword,
    first: 10,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
      searchKeyword={debouncedSearchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={() => fetchMore()}
    />
  );
};

export default RepositoryList;