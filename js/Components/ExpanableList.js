import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	FlatList,
	ScrollView,
	LayoutAnimation,
	TouchableOpacity,
} from 'react-native';

/**
 * ExpanableList (分组列表)
 */
class ExpanableList extends Component {
	constructor(props) {
		super(props);
		let map = new Map();
		if (props.dataSource && props.isOpen) {
			props.dataSource.map((item, i) => map.set(i, true))
		}

		if (props.openOptions) {
			props.openOptions.map((item) => map.set(item, true))
		}
		this.state = {
			memberOpened: map
		}
	}

	static propTypes = {
		dataSource: PropTypes.array.isRequired,//指定导入的数据源，必需属性
		headerKey: PropTypes.string, //指定数据源中组头数据的键值
		memberKey: PropTypes.string,//指定数据源中组成员数据的键值
		renderRow: PropTypes.func,//列表分组中每个成员行的渲染回调
		renderSectionHeaderX: PropTypes.func,//每一个列表分组组头的渲染回调
		renderSectionFooterX: PropTypes.func,//每一个列表分组组尾的渲染回调
		headerOnPress: PropTypes.func,//点击打开关闭列表分组组头的回调
		isOpen: PropTypes.bool, //默认是否打开全部分组
		openOptions: PropTypes.array, //可选单独打开某几个分组
	};

	static defaultProps = {
		headerKey: 'header',
		memberKey: 'member',
		isOpen: false,
	};

	_keyExtractor = (item, index) => index;

	_onPress = (i) => {
		const memberOpened = new Map(this.state.memberOpened);
		memberOpened.set(i, !memberOpened.get(i)); // toggle
		this.setState({memberOpened:memberOpened});

		if (this.props.headerOnPress) {
			this.props.headerOnPress(i, this.state.memberOpened.get(i) || false, memberOpened);
		}

		LayoutAnimation.easeInEaseOut();
	};

	_renderItem = ({ item, index }) => { // eslint-disable-line
		const { renderRow, renderSectionHeaderX, renderSectionFooterX, headerKey, memberKey } = this.props;
		const sectionId = index;
		let memberArr = item[memberKey];
		if (!this.state.memberOpened.get(sectionId) || !memberArr) {
			memberArr = [];
		}

		return (
			<View>
				<TouchableOpacity onPress={() => this._onPress(sectionId)}>
					{ renderSectionHeaderX ? renderSectionHeaderX(item[headerKey], sectionId) : null}
				</TouchableOpacity>
				<ScrollView scrollEnabled={false}>
					{
						memberArr.map((rowItem, rowId) => {
							return (
								<View key={rowId}>
									{renderRow ? renderRow(rowItem, rowId, index) : null}
								</View>
							);
						})
					}
					{ memberArr.length > 0 && renderSectionFooterX ? renderSectionFooterX(item, sectionId) : null }
				</ScrollView>
			</View>
		);
	};

	render() {
		const { dataSource } = this.props;
		return (
			<View>
				{
					dataSource && (
						<FlatList
							{...this.props}
							data={dataSource}
							extraData={this.state}
							keyExtractor={this._keyExtractor}
							renderItem={this._renderItem}
						/>
					)
				}
			</View>
		);
	}
}

export default ExpanableList;
