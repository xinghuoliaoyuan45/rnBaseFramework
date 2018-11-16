import React ,{Component} from 'react';
import {Text, View, Modal, Image, Dimensions, Platform,Keyboard,TouchableOpacity, TextInput,KeyboardAvoidingView,} from 'react-native';
import styles from 'js/Themes/TotalStyles';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import colors from 'js/Themes/Colors';
import PropTypes from 'prop-types'

export default class EditorContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contentLength:0,
		}
	}
	static propTypes = {
		/********文字****************/
		TitleText: PropTypes.any,//标题文字
		TextInputMaxLength: PropTypes.number,//输入框字体长度限制
		TextInputPlaceHolderText: PropTypes.any,//输入框占位内容
		TextInputDefaultText: PropTypes.any,//输入框默认内容
		isShowMaxLength: PropTypes.bool,//是否显示字数
		/********回调****************/
		onChangeTextCallBack: PropTypes.func,//输入框字体变化的指令


	}
	render(){
		return (
			<View style={{flex: 1}}>
				<View style={editorStyles.titleViewType}>
					<Text style={editorStyles.titleTextType}>{this.props.TitleText}</Text>
				</View>
				<View style={{marginTop: 10, marginRight: 15}}>
					{
						this.props.isShowMaxLength &&  <TextInput
							style={editorStyles.inputTextType}
							multiline={true}
							blurOnSubmit={true}
							returnKeyType='done'
							maxLength={this.props.TextInputMaxLength ? this.props.TextInputMaxLength : maxLength}
							placeholder={this.props.TextInputPlaceHolderText}
							defaultValue={this.props.TextInputDefaultText}
							underlineColorAndroid="transparent"
							onChange={(event) => {
								this.setState({contentLength: event.nativeEvent.text.length});
								if(this.props.onChangeTextCallBack){
									this.props.onChangeTextCallBack(event.nativeEvent.text);
								}
							}}
							keyboardShouldPersistTaps={false}
						>
						</TextInput>
					}
					{
						this.props.isShowMaxLength == false && <TextInput
							style={editorStyles.inputTextType}
							multiline={true}
							blurOnSubmit={true}
							returnKeyType='done'
							placeholder={this.props.TextInputPlaceHolderText}
							defaultValue={this.props.TextInputDefaultText}
							underlineColorAndroid="transparent"
							onChange={(event) => {
								this.setState({contentLength: event.nativeEvent.text.length});
								if(this.props.onChangeTextCallBack){
									this.props.onChangeTextCallBack(event.nativeEvent.text);
								}
							}}
							keyboardShouldPersistTaps={false}
						>
						</TextInput>
					}
					{
						this.props.isShowMaxLength && <View style={{alignItems: 'flex-end', marginTop: 5, alignSelf: 'flex-end'}}>
							<Text
								style={{
									fontSize: 15,
									color: colors.textLight
								}}>{this.state.contentLength ? this.state.contentLength : '0'}/{this.props.TextInputMaxLength }字</Text>
						</View>
					}

				</View>
			</View>
		)

	}
}
const editorStyles = {
	titleViewType:{
		marginTop:10,
		flexDirection: 'row',
		display: 'flex',
		width: deviceWidth
	},
	titleTextType:{
		fontSize:14,
		marginLeft:15
	},
	inputTextType:{
		backgroundColor:colors.pageBackgroundColor,
		marginLeft:15,
		borderRadius: 3,
		height:100,
		fontSize:15,
	},
}
