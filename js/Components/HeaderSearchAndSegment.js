/**
 */
import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, TextInput, Text} from 'react-native';
import SearchBar from 'js/Components/SearchBar';
import SegmentedControlBoth from 'js/Components/SegmentedControlBoth';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import colors from 'js/themes/colors';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import PolyTabBar from 'js/Components/LKTabBar'
import PropTypes from 'prop-types'
export default class HeaderSearchAndSegment extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	static propTypes = {
		/**searchBar**/
		/********文字****************/
		placeholderTexts:PropTypes.any,//输入框占位字符
		/**segmentControl**/
		segmentValues:PropTypes.any,//seg值
		segmentOneValue:PropTypes.any,//第一个值
		segmentTwoValue:PropTypes.any,//第二个值
		/**回调**/
		onSearchChangeTextCallBlock: PropTypes.func,//输入框字体变化的指令
		onSearchPressedCallBlock:PropTypes.func,//点击搜索图标时的指定
		onSegmentOnChangeBlock:PropTypes.func,//点击segment回调

	}
	render(){
		return (
			<View style={{backgroundColor:'white'}}>
				<SearchBar
					placeholderText={this.props.placeholderTexts? this.props.placeholderTexts:"搜索"}
					onChangeTextCallBack={this.props.onSearchChangeTextCallBlock}
					onSearchPressedCallBack={this.props.onSearchPressedCallBlock}
					style={{flex:1,backgroundColor:colors.pageBackgroundColor}}
				/>
				<View style={{height:44}}>
					<View style={{height:27,width:1,marginLeft:deviceWidth/2-1,backgroundColor:'#ccc', marginTop:(44-27)/2}}/>
					<ScrollableTabView
						initialPage={0}
						tabBarActiveTextColor={colors.primaryLight}
						tabBarUnderlineStyle={{backgroundColor: 'transparent', height: 1}}
						tabBarBorderColor={'#fff'}
						tabBarPosition="bottom"
						tabBarTextStyle={{fontSize: 14}}
						scrollWithoutAnimation={true}
						onChangeTab={this.props.onSegmentOnChangeBlock}
						renderTabBar={this._renderTabBar}
						style={{height: 44,marginTop:-27}}
					>
						<Text tabLabel={this.props.segmentOneValue? this.props.segmentOneValue:'未完成'}/>
						<Text tabLabel={this.props.segmentTwoValue? this.props.segmentTwoValue:'已完成'}/>
					</ScrollableTabView>
				</View>

				<View style={{height:10,width:deviceWidth,backgroundColor:colors.pageBackgroundColor}}/>
			</View>
		)
	}
	_renderTabBar = (props) => {
		return (
			<PolyTabBar
				{...props}
				page={0}
				initialPage={0}/>
		)
	};
}

