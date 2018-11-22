import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import Home  from './containers/Home'
import List  from './containers/List'
import Web  from './containers/Web'

export const Navigator =  new StackNavigator({
  Home: { screen: Home },
  List: { screen: List },
  Web: { screen: Web },
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
