import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import { View, Text } from "react-native";
import Home  from './containers/Home'

export const Navigator =  new StackNavigator({
  Home: { screen: Home },
},{
  initialRouteName: 'Home',
})

class Nav extends Component {
    render() {
      return (
        <Navigator  />
      )
    }
  }
  
  const mapStateToProps = state => ({
    navigation: state.navigation,
  })
  
  export default connect(mapStateToProps)(Nav)
      