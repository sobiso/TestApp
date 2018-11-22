/**
 *
 * List
 *
 */

import React from 'react';
import {Platform, StyleSheet, Text, Image, View, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { Container} from 'native-base';

 class List extends React.Component { 

  _onPressItem = (url) => {
    this.props.navigation.navigate('Web', {url: url})
  };

  renderItem = (item) => {

    return (
      <TouchableOpacity onPress={() => this._onPressItem(item.html_url)} style={styles.itemcontainer}>
        <Image source={{uri: item.owner.avatar_url}} style={styles.itemimage}/>
        <Text style={styles.itemname}>{item.owner.login}</Text> 
        <Text style={styles.itemname}>{item.name}</Text> 
      </TouchableOpacity>
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
  repos: state.repos.toJS()
})

const mapDispatchToProps = {
};

const styles = StyleSheet.create({
  itemcontainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  itemimage: {
      width: 50,
      height: 50,
      marginLeft: 30,
  },
  itemname: {
    marginLeft: 10,
    width: 100,
  },
  itemstars: {
    marginLeft: 10,
    width:100
  },
  
  bottomBar: {
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
  }
});

export default connect(mapStateToProps, mapDispatchToProps) (List);

