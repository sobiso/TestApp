import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';

import { CheckBox, Button, Icon } from 'native-base';

export class RepoItem extends React.Component {

  constructor(props) {
    super(props);
  }


  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  _onTrash = () => {
    this.props.onTrash(this.props.id);
  }

  render() {

    const { owner, stars } = this.props
    return (

      <View style={styles.container} >
        <CheckBox onPress={this._onPress} checked={this.props.selected} />
        <Image source={{uri: owner.avatar_url}} style={styles.image}/>
        <Text style={styles.name}>{owner.login}</Text> 
        <Text style={styles.stars}>Stars {stars}</Text>
        <Button onPress={this._onTrash}>
          <Icon name="ios-trash" />
        </Button>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  image: {
      width: 50,
      height: 50,
      marginLeft: 30,
  },
  name: {
    marginLeft: 10,
    width: 100,
  },
  stars: {
    marginLeft: 10,
    width:100
  }
});