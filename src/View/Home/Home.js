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
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Modal from 'react-native-modal';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DataUser: [],
      data: [],
      ispriceVisible: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('DataUser').then(value =>
      this.setState(
        {
          DataUser: JSON.parse(value),
        },
        function() {
          console.log('idpgw', this.state.DataUser.username);
        },
      ),
    );
    this.loadData();
  }

  async loadData() {
    this.setState({
      visibleDialogSubmit: true,
    });
    var url = GlobalConfig.SERVERHOST + 'api/v2/home';
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer Uj41mLXNTVGo95EM8qe9ndv5pIbdTSG0v2jkhXey',
      },
      body: JSON.stringify({
        token:
          'Vs67RydbIeCp1n3qloxn57grNzE5AL9qkRM5JMZOc7BTnXFUFfjpGTvIFhlc8SnSl784ftXxqHRoUkTwUBv7nERa-jXbhibqbaAIoRVzIMXKLYTVyXVfXOA-tRRRbBQQA4',
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          data: response,
        });
      })
      .catch(error => {
        this.setState({
          visibleDialogSubmit: false,
        });
      });
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
  }

  onSwipeUp(gestureState) {
    this.setState({ispriceVisible: true});
    console.log('swipe up');
  }

  togglePrice = () => {
    this.setState({ispriceVisible: !this.state.ispriceVisible});
  };

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <Container style={{flex: 1, display: 'flex'}}>
        <GestureRecognizer
          config={config}
          style={{
            flex: 1,
            backgroundColor: this.state.backgroundColor,
          }}
          onSwipeUp={state => this.onSwipeUp(state)}
          onSwipeDown={state => this.setState({ispriceVisible: false})}>
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
                    onPress={() => this.props.navigation.openDrawer()}
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
                  <Text style={styles.fontHeader}>Home</Text>
                </View>
              </View>
            </Header>
            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  paddingTop: '10%',
                  paddingHorizontal: '5%',
                }}>
                <Text style={styles.fontDisplay}>{this.state.data.salam}</Text>
                <Text style={styles.fontDisplay}>
                  {this.state.data.username}
                </Text>
                <Text style={styles.fontDisplay}>
                  IDR {this.state.data.balance}
                </Text>
                <Text style={styles.fontDisplay}>
                  {this.state.data.beans} beans
                </Text>
              </View>
            </View>
          </ImageBackground>
          <Modal
            style={{marginHorizontal: 0, marginBottom: 0}}
            animationIn={'slideInUp'}
            isVisible={this.state.ispriceVisible}
            onBackdropPress={this.togglePrice}
            backdropOpacity={0.2}
            animationOut={'slideOutDown'}
            animationInTiming={1000}>
            <View
              style={{
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <View
                style={{
                  paddingBottom: 50,
                  backgroundColor: 'rgba(255,255,255,0.5)',
                }}>
                <View style={{alignItems: 'flex-start', borderBottomWidth: 1}}>
                <Text>Prime To Pay</Text>
                </View>
              </View>
            </View>
          </Modal>
        </GestureRecognizer>
      </Container>
    );
  }
}
