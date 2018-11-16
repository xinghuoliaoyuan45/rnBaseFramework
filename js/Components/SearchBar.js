import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import {px2dp} from 'js/Utils/CommonUtils';

const deviceWidth = Dimensions.get('window').width;
import colors from 'js/Themes/Colors';
import PropTypes from 'prop-types'

/**
 *  SearchBar
 */
export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			intputTect: "",
			isFocous: false,
			alwaysShowSearchBtn:true,
			rightSearchIsTextOrIsIcon: true,
		}
	}

	static propTypes = {
		editable: PropTypes.bool,//输入框是否可编辑
		keyboardType: PropTypes.any,//输入框弹出键盘类型
		alwaysShowSearchBtn: PropTypes.bool,//是否总是显示搜索按钮
		searchIconStyle: PropTypes.object, //搜索按钮的样式
		rightSearchIsTextOrIsIcon: PropTypes.bool,//右侧的搜索显示按钮还是文字

		/********文字****************/
		placeholderText: PropTypes.any,//输入框占位字符


		/********字体****************/
		placeHolderTextFontColor: PropTypes.any,//输入框占位字体颜色
		textInputMaxSize: PropTypes.number,//输入框最大字数
		textInputFontSize: PropTypes.number,//输入框字体大小
		textInputFontColor: PropTypes.any,//输入框字体颜色


		/********样式****************/
		textInputViewHeight: PropTypes.number,//输入框背景高度
		textInputViewWidth: PropTypes.number,//输入框背景宽度
		textInputViewBackGroundColor: PropTypes.any,//输入框背景颜色
		textInputImageSource: PropTypes.any,//输入框icon

		/********回调****************/
		onChangeTextCallBack: PropTypes.func,//输入框字体变化的指令
		onChangeCallBack: PropTypes.func,//输入框onChange的指令
		onFocusCallBack: PropTypes.func,//输入框onFocus的指令
		onBlurCallBack: PropTypes.func,//输入框onBlur的指令
		onSearchPressedCallBack: PropTypes.func,//点击搜索图标时的指定
		onEndEditingCallBack: PropTypes.func,

		onRightClickCancel: PropTypes.func,//点击右侧取消按钮
	};

	render() {
		return (
			<View style={styles.containers}>
				<View style={{
					...styles.textInputViewStyle,
					height: this.props.textInputViewHeight ? this.props.textInputViewHeight : 32,
					width: this.props.textInputViewWidth ? this.props.textInputViewWidth : deviceWidth - 65,
					backgroundColor: colors.white,
					//backgroundColor: this.props.textInputViewBackGroundColor ? this.props.textInputViewBackGroundColor : colors.colorEC
				}}>
					<Icon name="ios-search" size={px2dp(24)} color={colors.arrowColor}/>
					<TextInput underlineColorAndroid="transparent"
										 style={{
											 ...styles.textInputStyle,
											 fontSize: this.props.textInputFontSize ? this.props.textInputFontSize : 13,
											 color: this.props.textInputFontColor ? this.props.textInputFontColor : colors.textTitle,
										 }}
										 keyboardType={this.props.keyboardType ? this.props.keyboardType : "default"}
										 placeholder={this.props.placeholderText ? this.props.placeholderText : "关键字"}
										 placeholderTextColor={this.props.placeHolderTextFontColor ? this.props.placeHolderTextFontColor : colors.placeHolderTextColor}
										 onChangeText={this.props.onChangeTextCallBack}
										 onChange={this.props.onChangeCallBack}
										 onEndEditing={this.props.onEndEditingCallBack}
										 onFocus={this.props.onFocusCallBack ? this.props.onFocusCallBack : () => {
											 this.setState({isFocous: true});
										 }}
										 onBlur={this.props.onBlurCallBack ? this.props.onBlurCallBack : () => {
											 this.setState({isFocous: false});
										 }}
										 editable={this.props.editable === false ? this.props.editable : true}>
					</TextInput>
				</View>
				{
					this.props.rightSearchIsTextOrIsIcon && this.props.textInputImageSource && <TouchableOpacity onPress={this.props.onSearchPressedCallBack.bind(this)}>
						<View style={[
							styles.searchIconViewStyle,
							{
								height: this.props.textInputViewHeight ? this.props.textInputViewHeight : 32
							},
							this.props.searchIconStyle
						]}>
							<View>
								{
									this.props.rightSearchIsTextOrIsIcon && this.props.textInputImageSource && (
										<FAIcon name={this.props.textInputImageSource}
														size={(this.state.isFocous || this.state.alwaysShowSearchBtn) ? px2dp(24) : 0}
														color={colors.orange}/>
									)
								}
								{
									this.props.rightSearchIsTextOrIsIcon &&   !this.props.textInputImageSource && (
										<Icon name= {"ios-search"}
													size={(this.state.isFocous || this.state.alwaysShowSearchBtn) ? px2dp(24) : 0} color={colors.orange}/>
									)
								}
								{
									!this.props.rightSearchIsTextOrIsIcon && <Text style={{marginLeft:5,fontSize:15}}>
										取消
									</Text>
									// onRightClickCancel
								}

							</View>
						</View>
					</TouchableOpacity>
				}
				{
					this.props.rightSearchIsTextOrIsIcon &&   !this.props.textInputImageSource && <TouchableOpacity onPress={this.props.onSearchPressedCallBack.bind(this)}>
						<View style={[
							styles.searchIconViewStyle,
							{
								height: this.props.textInputViewHeight ? this.props.textInputViewHeight : 32
							},
							this.props.searchIconStyle
						]}>
							<View>
								{
									this.props.rightSearchIsTextOrIsIcon && this.props.textInputImageSource && (
										<FAIcon name={this.props.textInputImageSource}
														size={(this.state.isFocous || this.state.alwaysShowSearchBtn) ? px2dp(24) : 0}
														color={colors.orange}/>
									)
								}
								{
									this.props.rightSearchIsTextOrIsIcon &&   !this.props.textInputImageSource && (
										<Icon name= {"ios-search"}
													size={(this.state.isFocous || this.state.alwaysShowSearchBtn) ? px2dp(24) : 0} color={colors.orange}/>
									)
								}
								{
									!this.props.rightSearchIsTextOrIsIcon && <Text style={{marginLeft:5,fontSize:15}}>
										取消
									</Text>
									// onRightClickCancel
								}

							</View>
						</View>
					</TouchableOpacity>
				}
				{
					!this.props.rightSearchIsTextOrIsIcon && <TouchableOpacity onPress={this.props.onRightClickCancel.bind(this)}>
						<View style={[
							styles.searchIconViewStyle,
							{
								height: this.props.textInputViewHeight ? this.props.textInputViewHeight : 32
							},
							this.props.searchIconStyle
						]}>
							<View>
								{
									this.props.rightSearchIsTextOrIsIcon && this.props.textInputImageSource && (
										<FAIcon name={this.props.textInputImageSource}
														size={(this.state.isFocous || this.state.alwaysShowSearchBtn) ? px2dp(24) : 0}
														color={colors.orange}/>
									)
								}
								{
									this.props.rightSearchIsTextOrIsIcon &&   !this.props.textInputImageSource && (
										<Icon name= {"ios-search"}
													size={(this.state.isFocous || this.state.alwaysShowSearchBtn) ? px2dp(24) : 0} color={colors.orange}/>
									)
								}
								{
									!this.props.rightSearchIsTextOrIsIcon && <Text style={{marginLeft:5,fontSize:15}}>
										取消
									</Text>
								}

							</View>
						</View>
					</TouchableOpacity>
				}
			</View>
		)
	}
}


const styles =
	{
		containers: {
			flexDirection: 'row',
			display: 'flex',
			width: '100%',
			justifyContent: 'space-between',
			backgroundColor: colors.pageBackgroundColor,
			paddingLeft: 10,
			paddingRight: 10,
			paddingTop: 10,
			paddingBottom: 10,

		},
		textInputViewStyle: {
			flexDirection: 'row',
			display: 'flex',
			alignItems: 'center',
			borderRadius: 20,
			paddingLeft: 10,
			paddingRight: 10,
		},
		textInputStyle: {
			flex: 1,
			paddingVertical: 0,
			marginLeft: 3,
			paddingHorizontal: 10,
		},
		searchIconViewStyle: {
			flexDirection: 'row',
			display: 'flex',
			alignItems: 'center',

		}


	};


