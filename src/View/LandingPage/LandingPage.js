/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  AsyncStorage,
} from 'react-native';
import {View, Text, Container, Content, Button, Header} from 'native-base';
import colors from '../../Component/colors';
import styles from '../../Component/styles/GlobalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import GlobalConfig from '../../Services/GlobalConfig';

export default class LandingPage extends Component {
  componentDidMount() {
    this.loadKey();
  }

  loadKey() {
    this.setState({
      visibleDialogSubmit: true,
    });
    var url = GlobalConfig.SERVERHOST + 'oauth/access_token';
    var formData = new FormData();
    formData.append('client_secret', '0a40f69db4e5fd2f4ac65a090f31b823');
    formData.append('client_id', 'e78869f77986684a');
    formData.append('grant_type', 'password');
    formData.append('username', 'support@technopartner.id');
    formData.append('password', '1234567');
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        AsyncStorage.setItem('Auth', JSON.stringify(response));
      })
      .catch(error => {
        this.setState({
          visibleDialogSubmit: false,
        });
      });
  }

  render() {
    return (
      <Container style={{flex: 1, display: 'flex'}}>
        <ImageBackground
          source={require('../../Component/Image/BackgroundHome.jpg')}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            paddingTop: 0,
          }}>
          <Header
            style={{
              borderBottomWidth: 0,
              marginTop: Platform.OS === 'ios' ? -10 : 0,
            }}
            transparent>
            <View style={styles.ViewHeader}>
              <View>
                <TouchableOpacity
                  style={{flex: 1, justifyContent: 'center'}}
                  transparent>
                  <Icon
                    name="md-menu"
                    size={hp('3.5%')}
                    style={{color: 'white', marginTop: 2}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.viewFontHeader}>
                <Text style={styles.fontHeader}>Good Morning</Text>
              </View>
            </View>
          </Header>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                paddingBottom: '10%',
                justifyContent: 'flex-end',
                paddingHorizontal: '5%',
              }}>
              <Button
                style={{
                  marginBottom: 20,
                  backgroundColor: colors.greenDss,
                }}>
                <Text
                  style={{flex: 1, textAlign: 'center', color: colors.graydar}}>
                  Sign Up
                </Text>
              </Button>
              <Button
                onPress={() => this.props.navigation.navigate('Login')}
                transparent
                style={{borderWidth: 1, borderColor: colors.graydar}}>
                <Text
                  style={{flex: 1, textAlign: 'center', color: colors.graydar}}>
                  Login
                </Text>
              </Button>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
