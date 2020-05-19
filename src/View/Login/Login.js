/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  AsyncStorage,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {View, Text, Container, Content, Button, Header} from 'native-base';
import Dialog, {
  DialogTitle,
  SlideAnimation,
  DialogContent,
  DialogButton,
} from 'react-native-popup-dialog';
import colors from '../../Component/colors';
import styles from '../../Component/styles/GlobalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GlobalConfig from '../../Services/GlobalConfig';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'support@technopartner.id',
      password: '1234567',
      visibleDialogSubmit: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('Auth').then(value =>
      this.setState({
        Auth: JSON.parse(value),
      }),
    );
  }

  onLoginPress() {
    this.setState({
      visibleDialogSubmit: true,
    });
    var url = GlobalConfig.SERVERHOST + 'api/login';
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization:
          this.state.Auth.token_type + ' ' + this.state.Auth.access_token,
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.status === 'success') {
          console.log('mlaku');
          AsyncStorage.setItem('DataUser', JSON.stringify(response)).then(() =>
            this.setState(
              {
                visibleDialogSubmit: false,
                email: '',
                password: '',
              },
              function() {
                this.props.navigation.navigate('Drawer');
              },
            ),
          );
        } else {
          this.setState({
            visibleDialogSubmit: false,
          });

          Alert.alert('Cannot Login', 'Gagal Login', [
            {
              text: 'Okay',
            },
          ]);
        }
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
                <Text style={styles.fontHeader}>Login</Text>
              </View>
            </View>
          </Header>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                paddingHorizontal: '5%',
              }}>
              <View style={{marginBottom: hp('3%')}}>
                <View style={{marginTop: 10}}>
                  <Text style={styles.fontLabel}>Email addres</Text>
                </View>
                <View>
                  <TextInput
                    style={styles.fontTextInput}
                    rowSpan={1}
                    editable={true}
                    bordered
                    value={this.state.email}
                    placeholder="Email addres"
                    onChangeText={text => this.setState({email: text})}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text style={styles.fontLabel}>Password</Text>
                </View>
                <View>
                  <TextInput
                    style={styles.fontTextInput}
                    rowSpan={1}
                    editable={true}
                    bordered
                    value={this.state.password}
                    placeholder="Password"
                    onChangeText={text => this.setState({password: text})}
                  />
                </View>
              </View>

              <Button
                onPress={() => this.onLoginPress()}
                style={{
                  marginBottom: 20,
                  backgroundColor: colors.greenDss,
                }}>
                <Text
                  style={{flex: 1, textAlign: 'center', color: colors.graydar}}>
                  Login
                </Text>
              </Button>
              <View style={{width: 270, position: 'absolute'}}>
                <Dialog
                  visible={this.state.visibleDialogSubmit}
                  dialogTitle={<DialogTitle title="Authenticating .." />}>
                  <DialogContent>
                    {
                      <ActivityIndicator
                        size="large"
                        color="#330066"
                        animating
                      />
                    }
                  </DialogContent>
                </Dialog>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
