// React imports
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

// Asset imports
import BackgroundImage from '../assets/bgimg.png';

// Background color selection colors
const colors = {
  black: '#090C08',
  purple: '#474056',
  grey: '#8A95A5',
  green: '#B9C6AE',
};

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', color: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Chat</Text>
          </View>
          <View style={styles.loginContainer}>
            <TextInput
              accessibilityLabel="Text field to enter your name"
              accessibilityHint="Name will be used as your alias in chat"
              style={styles.input}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Your name"
            />
            {/* Colour selection section */}
            <View style={styles.colorBox}>
              <Text style={styles.colorBoxText}>Choose Background Color:</Text>
              <View style={styles.colorChoice}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Black circle"
                  accessibilityHint="Select black as background color for the chat"
                  accessibilityRole="button"
                  onPress={() => this.setState({ color: colors.black })}
                  style={styles.color1}
                ></TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Purple circle"
                  accessibilityHint="Select black as background color for the chat"
                  accessibilityRole="button"
                  onPress={() => this.setState({ color: colors.purple })}
                  style={styles.color2}
                ></TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="gray-blue circle"
                  accessibilityHint="Select black as background color for the chat"
                  accessibilityRole="button"
                  onPress={() => this.setState({ color: colors.grey })}
                  style={styles.color3}
                ></TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Green circle"
                  accessibilityHint="Select black as background color for the chat"
                  accessibilityRole="button"
                  onPress={() => this.setState({ color: colors.green })}
                  style={styles.color4}
                ></TouchableOpacity>
              </View>
            </View>
            <Pressable
              accessible={true}
              accessibilityLabel="Button to start chatting"
              accessibilityHint="Start chatting"
              accessibilityRole="button"
              // Enabels navigation to Chat screen onPress, includes entered username and chosen colour
              onPress={() => {
                this.props.navigation.navigate('Chat', {
                  name: this.state.name,
                  color: this.state.color,
                });
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  containerTitle: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  loginContainer: {
    position: 'absolute',
    bottom: 30,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 'auto',
    width: '88%',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    color: '#757083',
    opacity: 0.5,
    fontSize: 16,
    fontWeight: '300',
    padding: 10,
    marginBottom: 20,
  },
  colorBoxText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  colorChoice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    marginBottom: 20,
  },
  color1: {
    backgroundColor: '#090C08',
    borderRadius: 20,
    height: 40,
    width: 40,
    marginTop: 10,
  },
  color2: {
    backgroundColor: '#474056',
    borderRadius: 20,
    height: 40,
    width: 40,
    marginTop: 10,
  },
  color3: {
    backgroundColor: '#8A95A5',
    borderRadius: 20,
    height: 40,
    width: 40,
    marginTop: 10,
  },
  color4: {
    backgroundColor: '#B9C6AE',
    borderRadius: 20,
    height: 40,
    width: 40,
    marginTop: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#757083',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
