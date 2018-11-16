import React, {
	Component,
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	Image,
} from 'react-native';

import PropTypes from 'prop-types'

const styles ={
	cardItemTimeRemainTxt: {
		fontSize: 20,
		color: '#ee394b'
	},
	text: {
		fontSize: 30,
		color: '#FFF',
		marginLeft: 7,
	},
	containerStyle: {
		flexDirection: 'row',
	},
	//时间文字
	defaultTime: {
		paddingHorizontal: 3,
		backgroundColor: 'white',
		fontSize: 12,
		color: 'black',
		marginHorizontal: 3,
		borderRadius: 2,
	},
	//冒号
	defaultColon: {
		fontSize: 12, color: 'rgba(85, 85, 85, 1)'
	}
};

/**
 * 起计时：从指定时间一直计时，不结束，没有结束回调
 */

export default class StartCountTime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showTime:'',

		}
	}
	static propTypes = {

		// time: PropTypes.number,//倒计时为起始时间到0， 起计时为从0到结束时间
		daySuffix: PropTypes.objectOf(PropTypes.string),//天后缀
		hourSuffix: PropTypes.string,//小时后缀
		minSuffix: PropTypes.string,//分钟后缀
		segSuffix: PropTypes.string,//秒后缀
		// onEnd: PropTypes.func,//结束时回调

		containerStyle: View.propTypes.style,
		daysStyle: Text.propTypes.style,
		hoursStyle: Text.propTypes.style,
		minsStyle: Text.propTypes.style,
		secsStyle: Text.propTypes.style,
		firstColonStyle: Text.propTypes.style,
		secondColonStyle: Text.propTypes.style,


		startTime: PropTypes.number,//起始时间


	};


	static defaultProps = {
		startTime: 0,
		daySuffix: {
			plural: '天',
			singular: '天',
		},
		hourSuffix: ':',
		minSuffix: ':',
		segSuffix: ':',
		// onEnd: () => {},

		containerStyle: styles.containerStyle,//container 的style
		daysStyle: styles.defaultTime,//天数 字体的style
		hoursStyle: styles.defaultTime,//小时 字体的style
		minsStyle: styles.defaultTime,//分钟 字体的style
		secsStyle: styles.defaultTime,//秒数 字体的style
		firstColonStyle: styles.defaultColon,//从左向右 第一个冒号 字体的style
		secondColonStyle: styles.defaultColon,//从左向右 第2个冒号 字体的style

	};


	componentDidMount() {
		this.start();
	}
	componentWillMount() {
		this.getData();
	}
	componentWillUnmount() {
		this.stopTime();
	}


	/**
	 * 获取开始数据
	 */
	getData(){
		let date = this.getDateData(this.props.startTime);
		this.setState({showTime:date});
	}


	/**
	 * 开始计时
	 */
	start(){
		this.getBeginTime(this.props.startTime);
	}


	/**
	 * 起计时
	 * @param time
	 */
	getBeginTime(time){
		this.interval = setInterval(()=> {
			const date = this.getDateData(time);
			if (date) {
				this.setState({showTime:date});
				time++;
			} else {
				this.stopTime();
			}
		}, 1000);
	}

	/***** 根据diff 展示time *****/
	getDateData(diff) {
		// console.log("diff",diff);
		if (diff < 0) {
			return false;
		}

		const timeLeft = {
			years: 0,
			days: 0,
			hours: 0,
			min: 0,
			sec: 0,
			millisec: 0,
		};

		if (diff >= (365.25 * 86400)) {
			timeLeft.years = Math.floor(diff / (365.25 * 86400));
			diff -= timeLeft.years * 365.25 * 86400;
		}
		if (diff >= 86400) {
			timeLeft.days = Math.floor(diff / 86400);
			diff -= timeLeft.days * 86400;
		}
		if (diff >= 3600) {
			timeLeft.hours = Math.floor(diff / 3600);
			diff -= timeLeft.hours * 3600;
		}
		if (diff >= 60) {
			timeLeft.min = Math.floor(diff / 60);
			diff -= timeLeft.min * 60;
		}
		timeLeft.sec = diff;
		// console.log("timeLeft",timeLeft);
		return timeLeft;
	}


	stopTime() {
		clearInterval(this.interval);

	}

	leadingZeros(num, length = null) {
		let length_ = length;
		let num_ = num!=null? num:0;
		if (length_ === null) {
			length_ = 2;
		}
		num_ = String(num_);
		while (num_.length < length_) {
			num_ = '0' + num_;
		}
		return num_;
	}


	render() {
		const date = this.state.showTime;
		let days;

		if (date.days === 1) {
			days = this.props.daySuffix.singular;
		} else {
			days = this.props.daySuffix.plural;
		}
		// }
		return (
			<View style={this.props.containerStyle}>
				{ (date.days>0)&& (<Text style={this.props.daysStyle}>{ this.leadingZeros(date.days)+days}</Text>)}
				{ (date.hours>0) && ( <Text style={this.props.hoursStyle}>{ this.leadingZeros(date.hours)}</Text>)}
				{ (date.hours>0) && (<Text style={ this.props.firstColonStyle}>{this.props.hourSuffix}</Text>)}

				<Text style={this.props.minsStyle}>{this.leadingZeros(date.min)}</Text>
				<Text style={this.props.secondColonStyle}>{this.props.minSuffix}</Text>
				<Text style={this.props.secsStyle}>{this.leadingZeros(date.sec)}</Text>
			</View>


		);
	}
};




