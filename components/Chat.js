// React imports
import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

export default class Chat extends React.Component {
  constructor() {
    super();
    // State initialization
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
      },
    };

    // Initialize Firebase
    const firebaseConfig = {
      apiKey: 'AIzaSyCyWk6Lu8MInhg6yqKiEaaiTZJLbB9HmmE',
      authDomain: 'chatapp-4b3c6.firebaseapp.com',
      projectId: 'chatapp-4b3c6',
      storageBucket: 'chatapp-4b3c6.appspot.com',
      messagingSenderId: '202096306480',
      appId: '1:202096306480:web:7b9184f9beed37d73a40f5',
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // References the Firestore "messages" collection
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  // Gets up to date data from message collection, stores it in state messages
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Go through each document
    querySnapshot.forEach((doc) => {
      // Get the QueryDocumentsSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  componentDidMount() {
    // Set name as chat title
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    // Reference to load messages from Firestore
    this.referenceChatMessages = firebase.firestore().collection('messages');

    // Anonymous user auth
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
        },
      });
      this.unsubscribeMessages = this.referenceChatMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    this.unsubscribeMessages();
    this.authUnsubscribe();
  }

  // Messages send by the user get appended to the state "messages" and then displayed in the chat
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
      }
    );
  }

  // Adds/saves message to Firestore
  addMessages = (message) => {
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
    });
  };

  //  Chat bubble customization
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#efefef',
          },
          right: {
            backgroundColor: '#44d0de',
          },
        }}
      />
    );
  }

  render() {
    let { color, name } = this.props.route.params;
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
            _id: this.state.user._id,
            name: name,
            avatar: this.state.user.avatar,
          }}
          showAvatarForEveryMessage={true}
          renderUsernameOnMessage={true}
        />
        {/* Fix for: Android hiding message input field */}
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
