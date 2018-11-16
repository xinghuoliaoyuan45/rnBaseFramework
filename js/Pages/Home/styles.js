import colors from 'js/Themes/Colors'

const mystyles = {
  blackText: {
    fontSize: 15,
    color: colors.textBlack,
  },
  garyText: {
    fontSize: 13,
    color: colors.textGary,
  },
  cellRowViewTitle: {
    height: 60,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerViewTitle: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 14,
    color: '#444444',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
  },
  imageArrow: {
    marginLeft: 5,
    width: 5,
    height: 10
  },
  topNewMessage: {
    width: 80,
    height: 35,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  returnMoneyRatioTitleTextStyle: {
    marginVertical: 5,
    fontSize: 18,
    color: colors.textBlack,
  },
  progressBarStyle: {
    backgroundColor: colors.textGary,
    borderRadius: 4,
    height: 10,
  },
  blockCenter:{
    flex:1,
    height:80,
    justifyContent:'center',
    alignItems:'center'
  }
};
export default mystyles
