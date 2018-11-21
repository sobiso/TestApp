/**
 *
 * Home
 *
 */

import React from 'react';
import {Platform, StyleSheet, Text, TextInput, View, ScrollView, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { listRepos } from './../../reducer' 
import { Container, Header, Spinner,  Item, Input, Icon, Button } from 'native-base';
import {RepoItem} from '../../components/RepoItem'

 class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {selected: (new Map(): Map<string, boolean>)};

  componentDidMount() {
    console.log('getting repos')

    this.props.listRepos('react')
  }

  _onPressItem = (id: string) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  countStars() {
    const {selected } = this.state
    const {repos} = this.props
    let stars = 0
    selected.forEach( (val, key) => {
      const [repo] = repos.data.filter(r => r.id == key)
      stars += repo.stargazers_count
    })
    return stars
  }

  render() {
    
    const { repos } = this.props

    return (
      <Container>
        <Header searchBar >
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" style={{width: '80%'}}/>
            {repos.loading && (<Spinner style={{height: 10}}/>)}
          </Item>

        </Header>

        <ScrollView>
          <FlatList
            data={repos.data}
            keyExtractor={item => item.id.toString()}
            extraData={this.state}
            renderItem={({item: item}) => (
              <RepoItem
                key={item.id}
                id={item.id}
                owner={item.owner}
                stars={item.stargazers_count}
                onPressItem={this._onPressItem}
                selected={!!this.state.selected.get(item.id)}
              />
            )}
          />
        </ScrollView>
        <View style={styles.bottomBar}>

          <Text style={styles.totalStars}> Total Stars: {this.countStars()}</Text>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  repos: state.get('repos').toJS()
})

const mapDispatchToProps = {
  listRepos
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'teal',
  },
  topBar: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  bottomBar: {
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
  }
});

export default connect(mapStateToProps, mapDispatchToProps) (Home);

