/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import {View, Text, Container, Content, Button, Header} from 'native-base';
import colors from '../../Component/colors';
import styles from '../../Component/styles/GlobalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import GlobalConfig from '../../Services/GlobalConfig';
import ShowImage from './showimage';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      DataUser: [],
      routes: [
        {key: 'Drink', title: 'Drink'},
        {key: 'Food', title: 'Food'},
        {key: 'Merchandise', title: 'Merchandise'},
      ],

      Food: [],
      Drinks: [],
      Merchandise: [],

      imageVisible: false,
    };
  }

  async LoadData() {
    var url = GlobalConfig.SERVERHOST + 'api/menu/list';
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization:
          this.state.Auth.token_type + ' ' + this.state.Auth.access_token,
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log('sss', response.menu);
        this.setState(
          {
            allMenu: response.menu,
          },
          async function() {
            var b = await Object.values(this.state.allMenu).map(data => data);
            // var c = await b[1][0];
            var Food = [];
            var Drinks = [];
            var Merchandise = [];

            // console.log('a', c);

            for (var i = 0; i < b.length; i++) {
              var d = await b[i];
              if (d.length === 0) {
                d = 'kosong';
              } else {
                d = await b[i][0].group;
              }
              //   console.log(d);

              if (d === 'Food') {
                Food.push(b[i][0]);
              } else if (d === 'Drinks') {
                Drinks.push(b[i][0]);
              } else if (d === 'Merchandise') {
                Merchandise.push(b[i][0]);
              }

              this.setState(
                {
                  Food: Food,
                  Drinks: Drinks,
                  Merchandise: Merchandise,
                },
                function() {
                  this.setState({
                    isLoading: false,
                  });
                },
              );
            }
          },
        );
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    AsyncStorage.getItem('DataUser').then(value =>
      this.setState(
        {
          DataUser: JSON.parse(value),
        },
        function() {
          console.log('idpgw', this.state.DataUser.username);
          AsyncStorage.getItem('Auth').then(value =>
            this.setState(
              {
                Auth: JSON.parse(value),
              },
              function() {
                this.LoadData();
              },
            ),
          );
        },
      ),
    );
  }

  render() {
    const Drink = () => (
      <Content>
        {this.state.Drinks.map(data => (
          <ShowImage data={data} />
        ))}
      </Content>
    );

    const Food = () => (
      <Content>
        {this.state.Food.map(data => (
          <ShowImage data={data} />
        ))}
      </Content>
    );

    const Merchandise = () => (
      <Content>
        {this.state.Merchandise.map(data => (
          <ShowImage data={data} />
        ))}
      </Content>
    );

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
                <Text style={styles.fontHeader}>Menu List</Text>
              </View>
            </View>
          </Header>
          <Content style={{flex: 1}}>
            <TabView
              navigationState={this.state}
              renderScene={SceneMap({
                Drink: Drink,
                Food: Food,
                Merchandise: Merchandise,
              })}
              onIndexChange={index => this.setState({index})}
              initialLayout={{width: Dimensions.get('window').width}}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  indicatorStyle={{backgroundColor: 'white'}}
                  tabStyle={{backgroundColor: 'gray'}}
                  labelStyle={{fontWeight: 'bold', fontSize: 10}}
                />
              )}
            />
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
