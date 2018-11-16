import React, {Component} from 'react';
import {
	TextInput,
} from 'react-native';
import PropTypes from 'prop-types'

/**
 *  AutoExpandingTextInput
 *  TextInput  高度自适应  textHeightMin textHeightMax 必须添加
 * Created by yang on 2017/10/17.
 */
export default class AutoExpandingTextInput extends Component {
	constructor(props) {
		super(props);
		this.displayName = 'AutoExpandingTextInput';
		this.state = {text: '', height: 0,};
		this.onChange = this.onChange.bind(this);
		this.onContentSizeChange = this.onContentSizeChange.bind(this);
	}

	/***
	 * 必填属性
	 */
	static propTypes = {
		textHeightMin: PropTypes.number.isRequired,//必填
		textHeightMax: PropTypes.number.isRequired,//必填
		defaultValue:PropTypes.any, //可以不写
	};


	onChange(event) {
		// console.log('======onChange========', event.nativeEvent);
		this.setState({text: event.nativeEvent.text});
	}

	onContentSizeChange(event) {
		// console.log('======onContentSizeChange========', event.nativeEvent);
		this.setState({height: event.nativeEvent.contentSize.height})
	}


	render() {
		const {style, textHeightMin, textHeightMax} = this.props;
		let textHeight = Math.max(textHeightMin, this.state.height);
		if (textHeight >= textHeightMax) {
			textHeight = textHeightMax;
		}
		return (<TextInput {...this.props}
											 multiline={true}
											 ref={'textInput'}
											 onChange={this.onChange}
											 onContentSizeChange={this.onContentSizeChange}
											 underlineColorAndroid="transparent"
											 style={[style, {height: textHeight}]}
											 value={this.props.defaultValue?this.props.defaultValue:this.state.text}/>);
	}
}

