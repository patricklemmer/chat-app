// React imports
import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor() {
    super();
    // State initialization
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    // Set name as chat title
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    // State sets static messages, system message and user message
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'You have entered the chat.',
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  //  Chat bubble customization
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#fafafa',
          },
          right: {
            backgroundColor: '#f7c58b',
          },
        }}
      />
    );
  }

  render() {
    let { color } = this.props.route.params;
    // Default colour, if no colour has been set by user
    if (color === '') {
      color = '#B9C6AE';
    }

    return (
      <View style={[{ backgroundColor: color }, { flex: 1 }]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/* Fix for: Android hiding message input field */}
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
