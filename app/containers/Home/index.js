/**
 *
 * Home
 *
 */

import React from 'react';
import {Platform, StyleSheet, Text, ActivityIndicator, View, ScrollView, FlatList} from 'react-native';
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

  _onCheckItem = (id: string) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _onTrash = (id) => {
    this.props.removeItem(id)
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
      return
    } else {
      this.setState({searchError: false})
    }

    this.props.listRepos(text)
    

  }

  handleMoveToList = () => {
    console.log('move to list')
    
    console.log(this.state.selected)

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
        </View>
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
                onCheckItem={this._onCheckItem}
                onTrash={this._onTrash}
                selected={!!this.state.selected.get(item.id)}
              />
            )}
          />
        </ScrollView>
        <Footer>
          <Item>
            <Button bordered info onPress={() => this.handleMoveToList()}>
              <Text> Light </Text>
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
  repos: state.get('repos').toJS()
})}

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

