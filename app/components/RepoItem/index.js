import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated
} from 'react-native';

import { CheckBox, Button, Icon } from 'native-base';

const ANIMATION_DURATION = 350;

export class RepoItem extends React.Component {

  constructor(props) {
    super(props);
    this._animated = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this._animated, {
      toValue: 1,
      duration: ANIMATION_DURATION,
    }).start();
  }

  _onCheck = () => {
    this.props.onCheckItem(this.props.id);
  };

  _onTrash = () => {
    this.props.onTrash(this.props.id);
  }

  render() {

    const { owner, stars, name } = this.props

    return (
      <Animated.View style={{ 
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
          opacity: this._animated ,
          transform: [
            { scale: this._animated },
            {
              rotate: this._animated.interpolate({
                inputRange: [0, 1],
                outputRange: ['35deg', '0deg'],
                extrapolate: 'clamp',
              })
            }
          ]
        }} 
      >
        <CheckBox onPress={this._onCheck} checked={this.props.selected} />
        <Image source={{uri: owner.avatar_url}} style={styles.image}/>
        <View>
          <Text style={styles.name}>{owner.login}</Text> 
          <Text style={styles.name}>{name}</Text> 
        </View>
        <Text style={styles.stars}>{stars}</Text>
        <Button onPress={this._onTrash}>
          <Icon name="ios-trash" />
        </Button>
      </Animated.View>
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
      width: 30,
      height: 30,
      marginLeft: 20,
  },
  name: {
    marginLeft: 5,
    width: 120,
  },
  stars: {
    marginLeft: 5,
    width:100
  }
});