/**
 */
import React, {Component} from 'react';
import {
	View,
	Image,
	Text,
} from 'react-native';
class PlaceholdImage extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={{flex:1,justifyContent: 'center', alignItems:'center'}}>
				<Image source={require('js/assets/images/noDataImage.png')}
							 style={{width:150,height:150,marginTop:100}}/>
			</View>
		)
	}


}
export default PlaceholdImage;
