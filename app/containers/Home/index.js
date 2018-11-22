/**
 *
 * Home
 *
 */

import React from 'react';
import {Platform, StyleSheet, Text, ActivityIndicator, View, ScrollView, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { listRepos, removeItem } from './../../redux/repos'
import { Container, Header, Spinner,  Item, Input, Icon, Button, Footer } from 'native-base';
import {RepoItem} from '../../components/RepoItem'


class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    selected: (new Map(): Map<string, boolean>),
    searchError: false
  };

  _onCheckItem = (id: string) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _onTrash = (id) => {
    this.props.remove(id)
  }

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

  handleSearch(text) {
    if (!text) return
    if (text != text.toLowerCase()) {
      this.setState({searchError: true})
    } else {
      this.setState({searchError: false})
      this.props.loadRepos(text)
    }

  }

  handleMoveToList = () => {
    this.props.navigation.navigate('List', {selected: this.state.selected})
  }

  render() {
    
    const { repos } = this.props

    return (
      <Container>
        <View >
          <Item >
            <Icon name="ios-search" />
            <Input 
              placeholder="Search"
              onChangeText={(text) => this.handleSearch(text)}  
              autoCapitalize = 'none'
            />
          <ActivityIndicator size="large" color="#0000ff" animating={repos.loading}/>
          </Item>
          {this.state.searchError && (<Item>
            <Text>Don't use capital letters </Text>
          </Item>)}
          {repos.error && (<Item>
            <Text>{repos.error}</Text>
          </Item>)}

        </View>
        <ScrollView>
          <FlatList
            data={repos.data}
            keyExtractor={item => item.id.toString()}
            extraData={this.state}
            removeClippedSubviews={true}
            renderItem={({item: item}) => (
              <RepoItem
                key={item.id}
                id={item.id}
                owner={item.owner}
                name={item.name}
                stars={item.stargazers_count}
                onCheckItem={this._onCheckItem}
                onTrash={this._onTrash}
                selected={!!this.state.selected.get(item.id)}
              />
            )}
          />
        </ScrollView>
        <Footer>
          <Item>
            <Button info onPress={() => this.handleMoveToList()} style={{height:40, marginTop:5}}>
              <Text> NEXT </Text>
            </Button>
          </Item>
          <Item>
            <Text style={styles.totalStars}> Total Stars: {this.countStars()}</Text>
          </Item>
        </Footer>

      </Container>
    );
  }
}

const mapStateToProps = state => {
  return({
    repos: state.repos.toJS()
})}


const mapDispatchToProps = dispatch => {
  return {
    loadRepos: (text) => {
      dispatch(listRepos(text))
    },
    remove: (id) => {
      dispatch(removeItem(id))
    },
    dispatch,
  };
}

const styles = StyleSheet.create({
  bottomBar: {
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
  }
});

export default connect(mapStateToProps, mapDispatchToProps) (Home);

