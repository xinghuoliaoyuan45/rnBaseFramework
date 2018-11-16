'use strict';

import React, { Component } from 'react'
import colors from 'js/Themes/Colors';
import {px2dp} from 'js/Utils/CommonUtils';
import {
	Text,
	View,
	Platform,
	TouchableHighlight,
	TouchableNativeFeedback
} from 'react-native'
import { Row, Col} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types'
/**
 * ExpandText
 *
 */
export default class ExpandText extends Component {
	constructor(props){
		super(props);
		this.state = {
			textIsExpand:false,
		}
	}

	static propTypes = {

		color:PropTypes.string,//text颜色
		fontSize:PropTypes.number,//text大小
		text:PropTypes.any,//text文字

		iconUpName:PropTypes.string,//icon名称
		iconUpSize:PropTypes.number,//icon大小
		iconUpColor:PropTypes.string,//icon颜色

		iconDownName:PropTypes.string,//icon名称
		iconDownSize:PropTypes.number,//icon大小
		iconDownColor:PropTypes.string,//icon颜色



	};
	render(){
		return(
			<Row>
				<Col style={{flex:1}}>
					<Text style={{color:this.props.color?this.props.color:'black',
						fontSize:this.props.fontSize?this.props.fontSize:12,}}
								numberOfLines={this.state.textIsExpand?999:1}
					>{this.props.text}</Text>
				</Col>
				<Col style={{alignSelf:'flex-end',paddingLeft:15,paddingRight:15}}  onPress={()=>{
					this.setState({textIsExpand:!this.state.textIsExpand});
				}}>

					{this.state.textIsExpand && (<Icon name={this.props.iconUpName? this.props.iconUpName : "ios-arrow-up-outline"}
																						 size={this.props.iconUpSize? this.props.iconUpSize : px2dp(18)}
																						 color={this.props.iconUpColor? this.props.iconUpColor:colors.arrowColor}/>)}

					{!this.state.textIsExpand && (<Icon name={this.props.iconDownName? this.props.iconDownName : "ios-arrow-down-outline"}
																							size={this.props.iconDownSize? this.props.iconDownSize : px2dp(18)}
																							color={this.props.iconDownColor? this.props.iconDownColor:colors.arrowColor}/>)}


				</Col>


			</Row>
		)
	}
}
