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

export default class showimage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageVisible: false,
    };
  }

  toggleImage = () => {
    this.setState({imageVisible: !this.state.imageVisible});
  };

  render() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            paddingVertical: hp('1.3%'),
            backgroundColor: colors.graydar,
            marginVertical: 1,
          }}>
          <TouchableOpacity
            onPress={() => this.toggleImage()}
            style={{flexDirection: 'row', paddingHorizontal: wp('2%')}}>
            <View style={{flex: 5}}>
              <Text>{this.props.data.nama_menu}</Text>
            </View>
            <Icon name="md-arrow-dropdown" color="black" size={hp('3%')} />
          </TouchableOpacity>
        </View>
        <View>
          {this.state.imageVisible === true ? (
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image
                source={{uri: this.props.data.gambar}}
                style={{
                  height: hp('40%'),
                  width: wp('100%'),
                  resizeMode: 'cover',
                }}
              />
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
}
