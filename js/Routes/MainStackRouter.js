import React from 'react'
import {createStackNavigator} from 'react-navigation'
import Login from 'js/Pages/Login'
import MainPage from 'js/Pages'
import ImageShow from 'js/Components/ImageShowBig'
import OrderSchedule from 'js/Pages/Home/OrderSchedule'
import OrdersReportSuccess from 'js/Pages/Home/OrdersReportSuccess'

export default createStackNavigator({
	/**
	 * 配置页面路由
	 */
	//登陆
	Login: {screen: Login},
	//首页
	MainPage: {screen: MainPage},
	//点击图片放大
	ImageShow: {screen: ImageShow},
  OrderSchedule:{screen: OrderSchedule},
  OrdersReportSuccess:{screen:OrdersReportSuccess},

},{
	//导航栏相关设置项
	headerMode: 'screen',
	navigationOptions: ({navigation}) => {
		return {
			headerBackTitle: null,
			headerTintColor: 'white',
			headerTitleStyle: {alignSelf: 'center', color: 'black'},
			headerStyle: {
				backgroundColor: 'white',
				borderBottomColor: '#f3f3f3',
				borderBottomWidth: 1,
				elevation: 0,
			},
			header: null,
		}
	}
	// headerMode: 'none',
	// navigationOptions: {
	// 	gesturesEnabled: false,
	// },
})
