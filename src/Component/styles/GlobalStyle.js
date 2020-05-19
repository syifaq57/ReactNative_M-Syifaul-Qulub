import {StyleSheet} from 'react-native';
import colors from '../colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.grayBG,
  },
  ViewHeader: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    justifyContent: 'flex-start',
  },
  fontHeader: {
    fontSize: hp('2.5%'),
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.white,
  },
  viewFontHeader: {
    flex: 2,
    justifyContent: 'center',
  },
  boxShaddow: {
    borderRadius: wp('5%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  fontTitle: {
    fontSize: 15,
    color: colors.gray11,
  },
  ListItem: {
    flexDirection: 'row',
    padding: wp('3%'),
    marginTop: hp('2%'),
    borderTopWidth: 0.5,
    borderTopColor: colors.gray11,
  },
  TitleList: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  BoxButtonPlay: {
    borderRadius: hp('10%'),
    backgroundColor: '#F1F1F1',
    marginLeft: wp('10%'),
    marginRight: wp('10%'),
  },
  fontTextInput: {
    marginBottom: 5,
    paddingLeft: 10,
    fontSize: 11,
    height: 50,
    borderRadius: 5,
    fontWeight: 'bold',
    backgroundColor: 'rgba(230,230,230, 0.5)',
    width: '100%',
  },
  fontLabel: {
    marginBottom: 5,
    fontSize: 10,
    marginLeft: 5,
    color: 'white',
  },
  fontDisplay: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
});

export default styles;
