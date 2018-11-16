import React, {Component} from 'react';
import {BackHandler, Animated, Easing, Platform,AsyncStorage} from 'react-native'
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import Storage from 'react-native-storage';
import SplashScreen from 'react-native-splash-screen';//启动页
import MainStackRouter from 'js/Routes/MainStackRouter'//所有页面路由
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
//测试
import JPushModule from 'jpush-react-native';
import {MapView, MapTypes, MapModule, Geolocation} from 'react-native-baidu-map';
import * as WeChat from 'react-native-wechat'
import JAnalyticsModule from "janalytics-react-native";

const JAnalKey = 'd664899e5158f9a1b5150244';//极光统计key
var storage = new Storage({
  // maximum capacity, default 1000
  size: 1000,

  // Use AsyncStorage for RN, or window.localStorage for web.
  // If not set, data would be lost after reload.
  storageBackend: AsyncStorage,

  // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  // defaultExpires: 1000 * 3600 * 24,
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired,
  // the corresponding sync method will be invoked and return
  // the latest data.
  sync: {
    // we'll talk about the details later.
  }
})
// 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用
GLOBAL.storage = storage;


export const routerReducer = createNavigationReducer(MainStackRouter)
export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)

const App = reduxifyNavigator(MainStackRouter, 'root')

class Router extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
    const { dispatch, router } = this.props
    return (<App dispatch={dispatch} state={router} />)

	}

	componentDidMount() {
	  //启动页
		// SplashScreen.hide();
		//微信
		WeChat.registerApp('');
		//分析
		if (Platform.OS === 'ios') {
			JAnalyticsModule.setup({appKey: JAnalKey});//ios需要先加入key
		} else {

		}

		//初始化JPush相关配置
		if (Platform.OS === 'android') {  //notifyJSDidLoad仅安卓有此方法

			// JPushModule.notifyJSDidLoad((resultCode) => {
			//    if (resultCode === 0) {}
			//  })
			//官网给的上面这种会报cb方法undefined错误

			JPushModule.notifyJSDidLoad(resultCode =>
				console.log(resultCode))
			//这样用不会报错，当然还有其他不会报错的写法。

		} else {
			//极光统计
			JPushModule.setupPush()
		}
		JPushModule.addReceiveCustomMsgListener((message) => {
			// this.setState({pushMsg: message});
			debugger;
			console.log("receive CustomerMsg: " + message);
		});
		JPushModule.addReceiveNotificationListener((message) => {
			debugger;
			console.log("receive notification: " + message);
		})

	}

	componentWillMount() {
		console.disableYellowBox = true;// 禁用屏幕底部的黄色警告
		BackHandler.addEventListener('hardwareBackPress', this.backHandle)
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.backHandle);
		//JPush移除
		JPushModule.removeReceiveCustomMsgListener();
		JPushModule.removeReceiveNotificationListener();
	}

	//用于判断安卓的返回键
	backHandle = () => {
		const currentScreen = getActiveRouteName(this.props.router)
		if (currentScreen === 'Login') {
			return true
		}
		if (currentScreen !== 'Home') {
			this.props.dispatch(NavigationActions.back())
			return true
		}
		return false
	}
}


function getActiveRouteName(navigationState) {

	if (!navigationState) {
		return null
	}
	const route = navigationState.routes[navigationState.index]
	if (route.routes) {
		return getActiveRouteName(route)
	}
	return route.routeName
}

function mapStateToProps(state) {
	return {
    router:state.router
  };
}

export default connect(mapStateToProps)(Router);
