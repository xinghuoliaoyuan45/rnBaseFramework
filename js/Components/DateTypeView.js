'use strict';

import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	Dimensions,
	Image,
	Keyboard,
	TextInput,
} from 'react-native';
import PropTypes from 'prop-types'

import colors from 'js/Themes/Colors';
import {Toast} from 'antd-mobile-rn';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import ImageTopTab from 'js/Components/ImageTopTab';

import Picker from "react-native-picker/index";
import {pickerUtils,loadDateData} from "js/Utils/DatesUtils";
import {spiltStringToArray, px2dp, checkPhone} from 'js/Utils/CommonUtils';
import styless from 'js/Themes/TotalStyles';
import { SegmentedControl } from 'antd-mobile-rn';

import moment from 'moment';

const TYPE_CUSTOM = 5;

const startDate = '选择开始时间';
const endDate = '选择结束时间';

/**
 * 日周月年切换View
 */
class DateTypeView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tabIndex: 0,
			selectDate: startDate,
			selectEndDate: endDate,

			datesArray: loadDateData(2010),
		}

	}

	static propTypes = {


		onTabChanged: PropTypes.func,//tab选择事件
		onCustomDateClick: PropTypes.func,//自定义时间点击
	};


	componentDidMount() {
	}
	componentWillUnmount() {
		Picker.isPickerShow(status => {
			if (status) {
				Picker.hide();
			}
		});
	}
	render() {
		return (
			<View style={{
				height: this.state.tabIndex === TYPE_CUSTOM ? 90 : 50,
				backgroundColor: colors.white,
				flexDirection: 'column'
			}}>
				<SegmentedControl
					selectedIndex={0}
					tintColor={colors.primary}
					values={['本日','近7天','近30天','本月','本年','自定义']}
					style={{
						flex:1,
						marginLeft:10,
						marginRight:10,
						marginTop:10,
						marginBottom:10
					}}
					onChange={e=>{
						console.log('!!eee',e.nativeEvent);

						let selectIndex = e.nativeEvent.selectedSegmentIndex;
						this.setState({
							tabIndex: selectIndex
						},()=>{this.props.onTabChanged && this.props.onTabChanged(selectIndex)});
						if(this.state.tabIndex != TYPE_CUSTOM){
							this.setState({selectDate:startDate,selectEndDate:endDate});
						}
					}}
				/>
				{/*时间筛选*/}
				{this.state.tabIndex === TYPE_CUSTOM && (
					<View style={{...styles.select_S_N_Time, height:40}}>
						<TouchableOpacity style={{flex:1,backgroundColor:colors.dividerLineColor,textAlign: 'center',justifyContent: 'center',marginTop:5,marginBottom:5,borderRadius:5}}
															onPress={() => this.showDatePicker()}>
							<Text style={{
								color: this.state.selectDate == startDate ? '#C2C2C2':colors.textBlack,
								textAlign: 'center',
								justifyContent: 'center',
							}}
							>{this.state.selectDate}</Text>
						</TouchableOpacity>

						<Text style={{color: colors.textBlack, textAlign: 'center',padding:10,flext:0.2}}>--</Text>

						<TouchableOpacity style={{flex: 1, backgroundColor: colors.dividerLineColor,textAlign: 'center',justifyContent: 'center',marginTop:5,marginBottom:5,borderRadius:5}}
															onPress={() => this.showEndDatePicker()}>
							<Text style={{
								color: this.state.selectEndDate == endDate ? '#C2C2C2':colors.textBlack,
								textAlign: 'center',
								justifyContent: 'center',
							}}>{this.state.selectEndDate}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flex:0.3,textAlign: 'center',justifyContent: 'center',marginLeft:10}}
															onPress={() => {
																if(this.state.selectDate == startDate){
																	Toast.info('请选择开始时间');
																}
																else if(this.state.selectEndDate == endDate){
																	Toast.info('请选择结束时间');
																}
																else {
																	this.props.onCustomDateClick ? this.props.onCustomDateClick(this.state.selectDate, this.state.selectEndDate) : '';
																}}}>
							<Text style={{color: 'orange', textAlign: 'center', justifyContent: 'center',}}>确定
							</Text>
						</TouchableOpacity>
					</View>)}

			</View>
		);
	}

	/************initPicker************/
	_initCommonPicker = (selectValue, callback) => {
		Picker.init({
			pickerData: this.state.datesArray,
			...styless.pickerStyle,
			selectedValue: spiltStringToArray(selectValue),
			onPickerConfirm: (pickedValue, pickedIndex) => {
				// console.log('date', pickedValue, pickedIndex);
				callback(pickedValue.join('-'));
			}
		});
		Picker.show();
	};

	showDatePicker() {
		if(this.state.selectDate == startDate){
			this.setState({selectDate:moment(new Date()).format('YYYY-MM-DD')},this.initStartDatePicker);
		}else{
			this.initStartDatePicker();
		}

	};
	initStartDatePicker = () =>{
		this._initCommonPicker(this.state.selectDate, (value) => {
			const newEndDate = this.state.selectEndDate;
			//开始时间不能晚于结束时间
			if(newEndDate != endDate && moment(value).valueOf() > moment(newEndDate).valueOf()){
				Toast.fail('开始时间不能晚于结束时间');
				return false;
			}
			this.setState({selectDate: value});
		});
	}

	showEndDatePicker() {
		if(this.state.selectEndDate == endDate){
			this.setState({selectEndDate:moment(new Date()).format('YYYY-MM-DD')},this.initEndDatePicker);
		}else{
			this.initEndDatePicker();
		}
	};

	initEndDatePicker = () =>{
		this._initCommonPicker(this.state.selectEndDate, (value) => {
			const newStartDate = this.state.selectDate;
			//结束时间不能早于开始时间
			if(newStartDate != startDate && moment(value).valueOf() < moment(newStartDate).valueOf()){
				Toast.fail('结束时间不能早于开始时间');
				return false;
			}
			this.setState({selectEndDate: value});
		});
	}

	// /*自定义时间筛选点击*/
	// check_Time() {
	//   //判断自定义时间区域是否有值
	//   if (this.state.selectDate === '选择开始日期') {
	//     Toast.info('请选择开始日期', 1);
	//     return;
	//   }
	//   if (this.state.selectEndDate === '选择结束日期') {
	//     Toast.info('请选择结束日期', 1);
	//     return;
	//   }
	//   let startTime = this.state.selectDate.split('-');
	//   let endTime = this.state.selectEndDate.split('-');
	//   if (Number(startTime[0]) > Number(endTime[0])) {
	//     Toast.info('开始时间不得超过结束时间', 1);
	//     return;
	//   }
	//   if (Number(startTime[0]) === Number(endTime[0]) && Number(startTime[1]) > Number(endTime[1])) {
	//     Toast.info('开始时间不得超过结束时间', 1);
	//     return;
	//   }
	//   if (Number(startTime[0]) === Number(endTime[0]) && Number(startTime[1]) === Number(endTime[1]) && Number(startTime[2]) > Number(endTime[2])) {
	//     Toast.info('开始时间不得超过结束时间', 1);
	//     return;
	//   }
	//   this.props.onCustomDateClick ? this.props.onCustomDateClick(this.state.selectDate, this.state.selectEndDate) : '';
	//
	// };

}


const styles = {
		imageTittle: {
			width: 12,
			height: 14,
			alignItems: 'center',
			alignSelf: 'center',
			marginLeft: 15,
		},
		textTittle: {
			color: colors.textGary,
			fontSize: 12,
			marginLeft: 5,
			margin: 15,
			marginTop: 8,
			marginBottom: 8,
			alignSelf: 'center',
		},
		textGary: {
			flex: 1,
			fontSize: 13,
			color: colors.textGary,
			margin: 15,
			marginTop: 10,
			marginBottom: 10,
			alignSelf: 'center'
		},
		select_S_N_Time: {
			marginLeft: 15,
			marginRight: 10,
			backgroundColor: colors.white,
			flexDirection: 'row',
		},
	}
;


export default DateTypeView;
