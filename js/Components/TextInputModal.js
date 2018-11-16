import React from 'react';
import {Text, View, Modal, Image, Dimensions, Platform,Keyboard,TouchableOpacity, TextInput,KeyboardAvoidingView,} from 'react-native';

const {height, width} = Dimensions.get('window');
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import colors from 'js/Themes/Colors';
import PropTypes from 'prop-types'

/**
 *  custom TextInputModal.js
 *  contains Title, Des, TextInput, cancel ,confirm
 */
export default class TextInputModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cancelButtonVisible:this.props.cancelVisible===undefined? true: this.props.cancelVisible,
			placeViewHeight:0,
		}
	}

	static propTypes = {
		ModalVisible: PropTypes.bool,//是否显示对话框
		TitleVisible: PropTypes.bool,//是否显示标题
		TextInputVisible: PropTypes.bool,//是否显示输入框
		DescriptionVisible: PropTypes.bool,//是否显示描述
		cancelVisible:PropTypes.bool,//是否显示取消按钮,default为true


		/********宽高、距离****************/
		HeightModal: PropTypes.any,//这个弹窗的高度
		WidthModal: PropTypes.any,//这个弹窗的宽度
		TitleHeight: PropTypes.any,//这个弹窗的标题高度
		TitleWidth: PropTypes.any,//这个弹窗的标题宽度
		DescriptionHeight: PropTypes.any,//这个弹窗的标题高度
		DescriptionWidth: PropTypes.any,//这个弹窗的标题宽度
		BottomHeight: PropTypes.any,//这个弹窗的底部高度
		BottomWidth: PropTypes.any,//这个弹窗的底部宽度
		TextInputHeight: PropTypes.any,//这个弹窗的输入框高度
		TextInputWidth: PropTypes.any,//这个弹窗的输入框宽度
		TextInputMarginBottom: PropTypes.any,//输入框与底部的距离
		TitleMarginTop: PropTypes.any,//标题顶部距离
		TitleMarginBottom: PropTypes.any,//标题底部距离
		DescriptionMarginBottom: PropTypes.any,//描述底部距离


		keyboardAvoidingViewBehavior:PropTypes.any,//KeyboardAvoidingView behavior



		/********字体****************/
		TitleFontSize: PropTypes.number,//标题的文字大小
		TitleFontColor: PropTypes.any,//标题的文字颜色
		DescriptionFontSize: PropTypes.number,//描述的文字大小
		DescriptionFontColor: PropTypes.any,//描述的文字颜色
		BottomFontSize: PropTypes.number,//下面取消确定的文字大小
		BottomFontColor: PropTypes.any,//下面取消确定的文字的颜色
		TextInputFontSize: PropTypes.number,//输入框字体大小
		TextInputFontColor: PropTypes.any,//输入框字体颜色
		TextInputPlaceHolderTextFontColor: PropTypes.any,//输入框占位字体颜色
		TextInputMaxLength: PropTypes.number,//输入框字体长度限制


		/********文字****************/
		TitleText: PropTypes.any,//标题文字
		DescriptionText: PropTypes.any,//描述文字
		CancelText: PropTypes.any,//取消文字
		OkText: PropTypes.any,//确定文字
		TextInputPlaceHolderText: PropTypes.any,//输入框占位内容
		TextInputDefaultText: PropTypes.any,//输入框默认内容


		/********回调****************/
		onChangeTextCallBack: PropTypes.func,//输入框字体变化的指令
		confirmCallBack: PropTypes.func,//回调确定的指令
		cancelCallBack: PropTypes.func,//回调取消的指令


	};


	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
			// console.log("键盘keyboardDidShow：",e);
			if(e.endCoordinates){
				this.setState({placeViewHeight: e.endCoordinates.height+20});
			}else{
				this.setState({placeViewHeight: 150});
			}

		});
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e) => {
			// console.log("键盘keyboardDidHide：",e);
			this.setState({placeViewHeight: 0});
		});

	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();

	}

	renderContent(){
		return (
			<View style={styles.ViewPage}>
				<View style={{
					height: this.props.HeightModal ? this.props.HeightModal : (this.props.TextInputVisible?200:150),
					width: this.props.WidthModal ? this.props.WidthModal : 303,
					backgroundColor: 'white',
					borderRadius: 8,
					display:'flex',
					marginBottom:this.state.placeViewHeight,
				}}>
					<View style={{flex:1}}>
						{this.props.TitleVisible && <View style={{     /****title******/
						height: this.props.TitleHeight ? this.props.TitleHeight : 44,
							width: this.props.TitleWidth ? this.props.TitleWidth : 303,
							alignItems: 'center',
							justifyContent: 'center'
						}}>
							<Text style={{
								fontSize: this.props.TitleFontSize ? this.props.TitleFontSize : 16,
								color: this.props.TitleFontColor ? this.props.TitleFontColor : colors.textTitle,
								marginTop: this.props.TitleMarginTop ? this.props.TitleMarginTop : 18,
								marginBottom: this.props.TitleMarginBottom ? this.props.TitleMarginBottom : 10
							}}>{this.props.TitleText}</Text>
						</View>}

						{this.props.DescriptionVisible && <View style={{   /**** Description ******/
						height: this.props.DescriptionHeight,
							width: this.props.DescriptionWidth,
							alignItems: 'center', justifyContent: 'center'
						}}>
							<Text style={{
								fontSize: this.props.DescriptionFontSize ? this.props.DescriptionFontSize : 14,
								color: this.props.DescriptionFontColor ? this.props.DescriptionFontColor : colors.textTitle,
								marginBottom: this.props.DescriptionMarginBottom ? this.props.DescriptionMarginBottom : 10
							}}>{this.props.DescriptionText}</Text>
						</View>}



						{this.props.TextInputVisible && (

							<TextInput  style={{ /*****输入框******/
							flex: 1,
								padding: 10,
								borderRadius: 10,
								justifyContent: 'center',
								alignItems:'center',
								alignSelf:'center',
								borderWidth: 1,
								borderColor: colors.dividerLineColor,
								height: this.props.TextInputHeight ? this.props.TextInputHeight : 80,
								width: this.props.TextInputWidth ? this.props.TextInputWidth : 250,
								marginBottom: this.props.TextInputMarginBottom ? this.props.TextInputMarginBottom : 10,
								fontSize: this.props.TextInputFontSize ? this.props.TextInputFontSize : 13,
								color: this.props.TextInputFontColor ? this.props.TextInputFontColor : colors.textTitle,
							}}
													underlineColorAndroid="transparent"
													placeholder={this.props.TextInputPlaceHolderText}
													placeholderTextColor={this.props.TextInputPlaceHolderTextFontColor ? this.props.TextInputPlaceHolderTextFontColor : colors.placeHolderTextColor}
													multiline={true}
													defaultValue={this.props.TextInputDefaultText}
													maxLength={this.props.TextInputMaxLength}
													onChangeText={this.props.onChangeTextCallBack? this.props.onChangeTextCallBack.bind(this):''}
													ref={c => {
														this._root = c;
													}}/>


						)}



					</View>
					<View style={{  /***取消确定**/
					height: this.props.BottomHeight ? this.props.BottomHeight : 47,
						width: this.props.BottomWidth ? this.props.BottomWidth : 303,
						flexDirection: 'row',
						borderTopWidth: 1,
						borderColor: colors.dividerLineColor,
					}}>
						{this.state.cancelButtonVisible &&(
							<TouchableOpacity style={{flex: 1}} onPress={this.props.cancelCallBack && this.props.cancelCallBack.bind(this)}
							>
								<View style={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'center',
									borderRightWidth: 1,
									borderColor: colors.dividerLineColor
								}}>
									<Text style={{
										fontSize: this.props.BottomFontSize ? this.props.BottomFontSize : 14
										, color: this.props.BottomFontColor ? this.props.BottomFontColor : colors.colorNine
									}}>{this.props.CancelText ? this.props.CancelText : '取消'}</Text>
								</View>
							</TouchableOpacity>
						)}
						<TouchableOpacity style={{flex: 1}}
															onPress={
																this.props.confirmCallBack && this.props.confirmCallBack.bind(this)
															}>
							<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
								<Text style={{
									fontSize: this.props.BottomFontSize ? this.props.BottomFontSize : 14
									, color: this.props.BottomFontColor ? this.props.BottomFontColor : colors.blue
								}}>{this.props.OkText ? this.props.OkText : '确定'}</Text>
							</View>
						</TouchableOpacity>
					</View>


				</View>

			</View>
		);

	}



	render() {
		return (
			<View>
				<Modal
					animationType={"fade"}
					transparent={true}
					visible={this.props.ModalVisible}
					onRequestClose={this.props.cancelCallBack ? this.props.cancelCallBack.bind(this):''}
				>
					{this.renderContent()}
				</Modal>
			</View>);
	}
}


const styles =
	{
		ViewPage: {
			width: deviceWidth,
			height:deviceHeight,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'rgba(0,0,0,0.2)'
		},
		container: {
			flex: 1,
			justifyContent: 'center',

		},
	};
