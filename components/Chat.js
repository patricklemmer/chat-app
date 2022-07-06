// React imports
import React, { Component } from 'react';
import { View } from 'react-native';

export default class Chat extends React.Component {
  componentDidMount() {
    // Set name as chat title
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
  }

  render() {
    let { color } = this.props.route.params;
    // Default colour, if no colour has been set by user
    if (color === '') {
      color = '#B9C6AE';
    }

    return <View style={[{ backgroundColor: color }, { flex: 1 }]}></View>;
  }
}
