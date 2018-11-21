/**
 *
 * Home
 *
 */

import React from 'react';
import {Platform, StyleSheet, Text, Image, View, ScrollView, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { listRepos, removeItem } from './../../reducer' 
import { Container, Header, Spinner,  Item, Input, Icon, Button, Footer } from 'native-base';
import {RepoItem} from '../../components/RepoItem'

 class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    selected: (new Map(): Map<string, boolean>),
    searchError: false
  };

  componentDidMount() {
    console.log('getting repos')

    // this.props.listRepos('react')
  }

  _onPressItem = (id: string) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  renderItem = (item) => {

    return (
      <View style={styles.container} >
      <Image source={{uri: item.owner.avatar_url}} style={styles.image}/>
      <Text style={styles.name}>{item.owner.login}</Text> 


    </View>
    )
  }

  render() {
    const { repos } = this.props
    const { selected } = this.props.navigation.state.params

    const data = repos.data.filter(r => selected.get(r.id))


    return (
      <Container>

        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            extraData={this.state}
            renderItem={({item: item}) => this.renderItem(item)}
          />
        </ScrollView>


      </Container>
    );
  }
}

const mapStateToProps = state => ({
  repos: state.get('repos').toJS()
})

const mapDispatchToProps = {
  listRepos,
  removeItem,
};

const styles = StyleSheet.create({

  bottomBar: {
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
  }
});

export default connect(mapStateToProps, mapDispatchToProps) (Home);

