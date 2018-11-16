import React, {Component} from 'react';
import colors from 'js/Themes/Colors'
import {
  Container,
  Text,
  View,
  Content
} from "native-base";
import HeadBar from 'js/Components/HeaderBar'
import {Calendar, LocaleConfig, CalendarList, Agenda} from 'react-native-calendars';
import BasePage from 'js/Pages/BasePage'
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import moment from 'moment'

LocaleConfig.locales['zh-Hans'] = {
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
  dayNames: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
  amDesignator: '上午',
  pmDesignator: '下午'
};
LocaleConfig.defaultLocale = 'zh-Hans';

class OrderSchedule extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      show: false,
      config: {},
    };
  }

  static navigationOptions = {
    header: null
  };
  onSelectHasDisableDate = (dates) => {
    console.warn('onSelectHasDisableDate', dates);
  }

  onConfirm = (startTime, endTime) => {
    this.setState({
      startTime,
      endTime,
    });
  }

  onCancel = () => {
    this.setState({
      show: false,
      startTime: undefined,
      endTime: undefined,
    });
  }


  render() {
    const now = new Date();
    var min = moment().subtract(3, 'months').format();
    var max = moment().add(3, 'months').format();
    return (
      <Container style={{backgroundColor: colors.pageBackgroundColor}}>
        <HeadBar
          titleText={"订单跟进日程"}
          leftBackIconOnPress={() => this.props.navigation.goBack()}
          rightVisible={false}/>
        <Content>
          <View>
            <CalendarList
              onDayLongPress={this.onDayLongPress}
              theme={{
               // calendarBackground: '#333248',//背景色
                textSectionTitleColor: 'black',//标题的颜色
                dayTextColor: 'red',//在范围内的天的颜色
                todayTextColor: 'black',//今天字体颜色
                selectedDayTextColor: 'black',//选中的天的字体颜色
                monthTextColor: 'black',
                selectedDayBackgroundColor: 'green',
                arrowColor: 'white',
                // textDisabledColor: 'red',
                'stylesheet.calendar.header': {
                  moment: {
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }
                }
              }}
              markingType={'custom'}
              style={[mystyles.calendar, {height: 300}]}
              minDate={min}
              maxDate={max}
              onVisibleMonthsChange={(months) => {
                console.log('now these months are visible', months);
              }}
              pastScrollRange={10}
              horizontal={true}
              futureScrollRange={10}
              scrollEnabled={true}
              showScrollIndicator={true}
            />
          </View>

        </Content>
      </Container>
    )
  }
}

const mystyles = {
  calendar: {}
}

const mapStateToProps = (state) => {
  return {
    newMessageCount: state.home.getIn(['newMessageCount']),
  }
}

export default connect(mapStateToProps)(OrderSchedule)

