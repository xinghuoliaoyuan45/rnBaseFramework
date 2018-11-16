import React, { Component } from 'react'
import colors from 'js/Themes/Colors';
import {
	Text,
	View,
	Platform,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableWithoutFeedback,
	ScrollView,
	Animated,
	Dimensions,
	Image
} from 'react-native'
import { Row, Col} from "native-base";
import PropTypes from 'prop-types';
import ImageButton from 'js/Components/ImageButton';
import {spiltStringToArray, px2dp, getHttpUrl, checkPhone} from 'js/Utils/CommonUtils';
import Icon from 'react-native-vector-icons/Ionicons';
// 屏幕宽度
var screenWidth = Dimensions.get('window').width;
/**
 * 横向轮播图
 *
 */
export default class FocusImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 0,
		};
	}
	static propTypes = {
		dataSource: PropTypes.array.isRequired,//指定导入的数据源，必需属性
	}

	render() {

		return (
			<View style={styles.container}>
				<ScrollView horizontal={true}
										showsHorizontalScrollIndicator={false}
										pagingEnabled={true}
										onMomentumScrollEnd={(e) => this.onAnimatinonEnd(e)}
										onScrollBeginDrag={() => this.onScrollBeginDrag()}
										onScrollEndDrag={() => this.onScrollEndDrag()}
										ref={(scrollView) => {
											this._scrollView = scrollView;
										}}>

					{this.renderAllImage()}
				</ScrollView>
			</View>
		);
	}
	//开始拖拽
	onScrollBeginDrag(){
		console.log('beginDrag');
	};
	//停止拖拽
	onScrollEndDrag(){
		console.log('endDrag');
	};
	//当一帧滚动结束
	onAnimatinonEnd(e){
		// //1.水平方向上的偏移量
		// var offSetX = e.nativeEvent.contentOffset.x;
		// //2.求出当前页数
		// var currentPage = Math.floor(offSetX / screenWidth);
		// console.log(currentPage);
		// //3.更新状态机，重新绘制ui
		// this.setState({
		//   currentPage:currentPage
		// })
	}
	renderAllImage(){
		var allImage = [];
		//拿到图像数组
		var imgsArr = this.props.dataSource;
		// console.log(imgsArr);
		for(var i=0; i<imgsArr.length; i++){
			// 去出单独的每个对象
			var imgItem = imgsArr[i];
			// //创建组件装入数组
			allImage.push(
				<ImageButton style={styles.focusImage}
										 defaultSource={require('js/assets/images/defaultImage.jpg')}
										 source={{uri: getHttpUrl(imgItem)}}/>
			)
		}
		return allImage;
	};

}
const styles = {
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	focusImage: {
		width: 80,
		height: 80,
		marginRight:15
	}
}
