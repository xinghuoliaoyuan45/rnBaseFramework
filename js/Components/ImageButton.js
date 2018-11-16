import React, {Component} from 'react';
import {TouchableOpacity, Image,ImageBackground} from 'react-native';

/**
 * <Image/>  + default Image
 *  Note: Image 只需要设置width,height 就可以了，尽量不要设置margin,如果需要设置margin,请在外层包裹View,避免显示uri时的背景图显示出来
 *
 */
export default class ImageButton extends Component {
	render() {
		return (
			<TouchableOpacity activeOpacity={0.9} onPress={this.props.onPress}>
				{this._renderImg()}
			</TouchableOpacity>
		)
	}

	_renderImg() {
		if (this.props.defaultSource) {
			return (
				<ImageBackground
					style={{...this.props.style}}
					source={this.props.defaultSource}
				>
					<Image
						style={{...this.props.style}}
						source={this.props.source}
					>
					</Image>
				</ImageBackground>
			)
		} else {
			return (
				<Image
					style={this.props.style}
					source={this.props.source}
				>
				</Image>
			)
		}
	}

}
