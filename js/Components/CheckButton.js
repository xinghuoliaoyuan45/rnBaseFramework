'use strict';

import React, {Component} from 'react'
import colors from 'js/Themes/Colors';
import {px2dp} from 'js/Utils/CommonUtils';
import {
	Text,
	View,
	Platform,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback
} from 'react-native'
import {Row, Col} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from "react-native-vector-icons/FontAwesome";
import PropTypes from 'prop-types'

/**
 * CheckButton
 *
 */
export default class CheckButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isCheck: this.props.check || false,
		}
	}

	static propTypes = {
		iconCheckName: PropTypes.string,//icon选中名称
		iconUnCheckName:PropTypes.string,//icon未选中名称
		iconSize: PropTypes.number,//icon大小
		iconCheckColor: PropTypes.string,//icon选中颜色
		iconUnCheckColor: PropTypes.string,//icon未选中颜色
		touchAreaWidth: PropTypes.number,//触摸区域宽度
		touchAreaHeight: PropTypes.number,//触摸区域高度


		isShowFAIcon:PropTypes.bool,//是否用isShowFAIcon图标

		alignStyle:PropTypes.string,//icon水平布局的样式
		iconPaddingRight: PropTypes.number,//距离右侧的宽度

		check: PropTypes.bool,//不是通过touch改变，而是通过外部属性指定是否选中
		onChange: PropTypes.func,//改变回调，传递给外界是否选中


	};


	onChange = () => {
		this.setState({isCheck: !this.state.isCheck},()=>{
			this.props.onChange(this.state.isCheck);
		});
	};

	componentWillReceiveProps(nextProps) {
		// console.log('CheckButton--props.value', nextProps);
		if ('check' in nextProps) {
			this.setState({
				isCheck: nextProps.check,
			});
		}
		// console.log("nextProps['value']",nextProps['value']);
		if (nextProps['value']) {
			this.setState({
				isCheck: nextProps.value.check,
			});
		}

	}

	render() {
		return (
			<TouchableOpacity onPress={this.onChange}>
				<View style={{height: this.props.touchAreaHeight ? this.props.touchAreaHeight : 45,
					width: this.props.touchAreaWidth ? this.props.touchAreaWidth : 60,
					flex:1,
					alignItems: this.props.alignStyle?this.props.alignStyle: 'center',
					paddingRight:this.props.iconPaddingRight?this.props.iconPaddingRight:0,
					justifyContent: 'center'}}>
					{/*显示的是Ionicons*/}
					{!this.props.isShowFAIcon &&(
						<View>
							{this.state.isCheck && (  <Icon name={this.props.iconCheckName ? this.props.iconCheckName : "ios-checkmark-circle"}
																							size={this.props.iconSize ? this.props.iconSize : 18}
																							color={this.props.iconCheckColor ? this.props.iconCheckColor : 'red'}/>)}

							{!this.state.isCheck && (  <Icon name={this.props.iconUnCheckName ? this.props.iconUnCheckName : "ios-checkmark-circle"}
																							 size={this.props.iconSize ? this.props.iconSize : 18}
																							 color={this.props.iconUnCheckColor ? this.props.iconUnCheckColor : 'gray'}/>)}
						</View>
					)}

					{/*显示的是FontAwesome*/}
					{this.props.isShowFAIcon &&(
						<View>
							{this.state.isCheck && (  <FAIcon name={this.props.iconCheckName ? this.props.iconCheckName : "check-circle"}
																								size={this.props.iconSize ? this.props.iconSize : 18}
																								color={this.props.iconCheckColor ? this.props.iconCheckColor : 'red'}/>)}

							{!this.state.isCheck && (  <FAIcon name={this.props.iconUnCheckName ? this.props.iconUnCheckName : "check-circle"}
																								 size={this.props.iconSize ? this.props.iconSize : 18}
																								 color={this.props.iconUnCheckColor ? this.props.iconUnCheckColor : 'gray'}/>)}
						</View>
					)}

				</View>
			</TouchableOpacity>
		)
	}
}
