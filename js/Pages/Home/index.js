import React, {Component} from 'react';
import colors from 'js/Themes/Colors'
import HeadStatusBar from 'js/Components/HeaderStatus'
import HeadBar from 'js/Components/HeaderBar'
import {connect} from "react-redux";
import {Container, Icon, Content} from 'native-base';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Clipboard,
  NativeAppEventEmitter,
  NativeModules,
  Keyboard,
  DeviceEventEmitter
} from 'react-native';

import BasePage from 'js/Pages/BasePage'
import myStyles from './styles'
import HorizontalProgressBar from 'js/Components/ProgressBarView'

class Home extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)
    this.state = {
      pageName: 'Home',
    }
  }

  componentDidMount() {
    console.log('!GLOBAL.user',GLOBAL.user);
  }
  renderOrderSchdule() {

    if (this.props.homeSchduleData.length == []) {
      return (
        <TouchableOpacity style={{height: 40, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={myStyles.garyText}>{'每一次跟进都是争取成功的机会，抽空记录下吧！'}</Text>
        </TouchableOpacity>
      )
    } else {
      <View style={{height: 100, flex: 1}}>

      </View>
    }
  }

  renderOrderReportSuccess() {
    let ordersReportSuccess = this.props.ordersReportSuccess
    if (ordersReportSuccess == []) {
      return (
        <View style={{height: 100}}>

        </View>
      )
    } else {
      return (
        <View style={{paddingHorizontal: 15, height: 100}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={myStyles.blackText}>恭喜{ordersReportSuccess.name}成交一单</Text>
            <Text style={myStyles.blackText}>{ordersReportSuccess.storeName}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItem: 'center'}}>
            <Text>收款 ￥{ordersReportSuccess.AmountMoney}</Text>
            <Text style={[myStyles.blackText, {marginLeft: 5}]}>{ordersReportSuccess.typeName}</Text>
            <View style={{flex: 1}}/>
            <Text style={myStyles.blackText}>{ordersReportSuccess.time}</Text>
          </View>
        </View>
      )
    }
  }

  judgeTextRatio(ratio) {
    if (ratio <= 0.7) {
      return '相信自己是最棒的，加油!'
    }
    if (0.7 < ratio && ratio < 0.9) {
      return '您马上就要完成本月目标，继续加油哦!'
    }
    if (ratio == 1) {
      return '您已完成本月目标，真棒!'
    }
    if (ratio > 1) {
      return '您已超额完成本月目标，给自己一个赞！'
    }
    return ''
  }

  returnMoneyRatio() {
    let showText = this.judgeTextRatio(this.props.returnMoneyRatioData.ratio)
    let returnMoneyRatioData = this.props.returnMoneyRatioData
    return (
      <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
        <View style={{height: 60, justifyContent: 'center'}}>
          <HorizontalProgressBar
            animated
            color={colors.primaryLight2}
            progress={Number(returnMoneyRatioData.ratio)}
            style={myStyles.progressBarStyle}/>
        </View>
        <View style={{marginVertical: 10, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text>{'完成率'}</Text>
            <Text style={myStyles.returnMoneyRatioTitleTextStyle}>
              {returnMoneyRatioData.ratio * 100}%</Text>
          </View>
          <View style={{flex: 2, flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={myStyles.blackText}>{'回款金额'}</Text>
              <Text style={myStyles.returnMoneyRatioTitleTextStyle}>
                ￥{returnMoneyRatioData.returnMoney}
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={myStyles.blackText}>{'目标金额'}</Text>
              <Text style={myStyles.returnMoneyRatioTitleTextStyle}>
                ￥{returnMoneyRatioData.targetMoney}
              </Text>
            </View>
          </View>
        </View>
        <View style={{height: 40, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={myStyles.blackText}>{showText}</Text>
        </View>
      </View>
    )
  }

  workSimpleReport() {
    let workSimpleReportData = this.props.workSimpleReportData
    return (
      <View style={{flexDirection: 'row',paddingVertical: 10,paddingHorizontal:10 }}>
        <View style={myStyles.blockCenter}>
          <Text style={myStyles.garyText}>收款订单数</Text>
          <Text style={myStyles.returnMoneyRatioTitleTextStyle}>
            {workSimpleReportData.incomeOrderCount}
          </Text>
        </View>
        <View style={myStyles.blockCenter}>
          <Text style={myStyles.garyText}>收款金额</Text>
          <Text style={myStyles.returnMoneyRatioTitleTextStyle}>
            ￥{workSimpleReportData.incomeMoney}
          </Text>
        </View>
        <View style={myStyles.blockCenter}>
          <Text style={myStyles.garyText}>合同数</Text>
          <Text style={myStyles.returnMoneyRatioTitleTextStyle}>
            {workSimpleReportData.contractCount}

          </Text>
        </View>
        <View style={myStyles.blockCenter}>
          <Text style={myStyles.garyText}>合同金额</Text>
          <Text style={myStyles.returnMoneyRatioTitleTextStyle}>
            ￥{workSimpleReportData.contractMoney}

          </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <Container style={{backgroundColor: colors.pageBackgroundColor}}>
        <HeadBar
          titleText={"首页"}
          leftVisible={false}
          rightVisible={false}/>
        <Content>
          <View style={{height: 60, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              style={myStyles.topNewMessage}
              onPress={() => {
                // this.props.navigation.navigate('aa')
              }}>
              <Text style={myStyles.blackText}>新消息{this.props.newMessageCount}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={myStyles.cellRowViewTitle} onPress={() => {
            this.props.navigation.navigate('OrderSchedule')
          }}>
            <Text style={myStyles.blackText}>{'订单跟进日程'}</Text>
            <View style={{flex: 1}}/>
            <Text style={myStyles.blackText}>{this.props.orderScheduleText}</Text>
          </TouchableOpacity>
          {this.renderOrderSchdule()}
          <TouchableOpacity style={myStyles.cellRowViewTitle} onPress={() => {
            this.props.navigation.navigate('OrderSchedule')
          }}>
            <Text style={myStyles.blackText}>{'签单捷报'}</Text>
            <View style={{flex: 1}}/>
            <Image style={myStyles.imageArrow}
                   source={require('js/Assets/arrow-right.png')}/>
          </TouchableOpacity>
          {this.renderOrderReportSuccess()}
          <TouchableOpacity style={myStyles.cellRowViewTitle} onPress={() => {
            this.props.navigation.navigate('OrderSchedule')
          }}>
            <Text style={myStyles.blackText}>{'回款占比'}</Text>
            <View style={{flex: 1}}/>
            <Text style={[myStyles.garyText, {marginRight: 5}]}>{'本月'}</Text>
            <Image style={myStyles.imageArrow}
                   source={require('js/Assets/arrow-right.png')}/>
          </TouchableOpacity>
          {this.returnMoneyRatio()}
          <TouchableOpacity style={myStyles.cellRowViewTitle} onPress={() => {
            this.props.navigation.navigate('OrderSchedule')
          }}>
            <Text style={myStyles.blackText}>{'工作简报'}</Text>
            <View style={{flex: 1}}/>
            <Text style={[myStyles.garyText, {marginRight: 5}]}>{'今天'}</Text>
            <Image style={myStyles.imageArrow}
                   source={require('js/Assets/arrow-right.png')}/>
          </TouchableOpacity>
          {this.workSimpleReport()}
        </Content>
      </Container>
    )
  }
}

const
  mapStateToProps = (state) => {
    return {
      newMessageCount: state.home.get('newMessageCount'),
      orderScheduleText: state.home.get('orderScheduleText'),
      homeSchduleData: state.home.get('homeSchduleData'),
      ordersReportSuccess: state.home.get('ordersReportSuccess'),
      returnMoneyRatioData: state.home.get('returnMoneyRatioData'),
      workSimpleReportData: state.home.get('workSimpleReportData')
    }
  }

export default BasePage(connect(mapStateToProps)(Home))
