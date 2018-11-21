/**
 *
 * Home
 *
 */

import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { listRepos } from './../../reducer' 


 class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    console.log('getting repos')

    this.props.listRepos('relferreira')
  }

  render() {
    console.log('home props: ',this.props)

    return (
      <View>
        <Text >TEST2</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  repos: state.repos
})

const mapDispatchToProps = {
  listRepos
};

export default connect(mapStateToProps, mapDispatchToProps) (Home);

