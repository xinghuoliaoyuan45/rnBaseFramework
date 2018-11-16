import React, {Component} from 'react';
import {TouchableOpacity,SegmentedControlIOS,  Platform,Image} from 'react-native';
import { SegmentedControl } from 'antd-mobile-rn';

/**
 * segment used on Android & ios
 */

export default class SegmentedControlBoth extends Component {

	render(){
		return Platform.OS === 'ios'?(
			<SegmentedControlIOS {...this.props}>{this.props.children}</SegmentedControlIOS>
		):(
			<SegmentedControl {...this.props}>{this.props.children}</SegmentedControl>
		)
	}
}

