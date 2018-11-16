
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, SectionList, ActivityIndicator, TouchableOpacity} from 'react-native'

export const RefreshState = {
	Idle: 0,
	HeaderRefreshing: 1,
	FooterRefreshing: 2,
	NoMoreData: 3,
	Failure: 4,
}

const DEBUG = false
const log = (text) => {DEBUG && console.log(text)}


class RefreshSectionListView extends PureComponent {
	props: Props

	static defaultProps = {
		footerRefreshingText: '数据加载中…',
		footerFailureText: '点击重新加载',
		footerNoMoreDataText: '已加载全部数据',
	}

	componentWillReceiveProps(nextProps) {
		log('[RefreshSectionListView]  RefreshSectionListView componentWillReceiveProps ' + nextProps.refreshState)
	}

	componentDidUpdate(prevProps, prevState) {
		log('[RefreshSectionListView]  RefreshSectionListView componentDidUpdate ' + prevProps.refreshState)
	}

	onHeaderRefresh = () => {
		log('[RefreshSectionListView]  onHeaderRefresh')

		if (this.shouldStartHeaderRefreshing()) {
			log('[RefreshSectionListView]  onHeaderRefresh')
			this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
		}
	}

	onEndReached = (info) => {
		log('[RefreshSectionListView]  onEndReached   ' + info.distanceFromEnd)

		if (this.shouldStartFooterRefreshing()) {
			log('[RefreshSectionListView]  onFooterRefresh')
			this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
		}
	}

	shouldStartHeaderRefreshing = () => {
		log('[RefreshSectionListView]  shouldStartHeaderRefreshing')

		if (this.props.refreshState == RefreshState.HeaderRefreshing ||
			this.props.refreshState == RefreshState.FooterRefreshing) {
			return false
		}

		return true
	}

	shouldStartFooterRefreshing = () => {
		log('[RefreshSectionListView]  shouldStartFooterRefreshing')

		let {refreshState, sections} = this.props
		if (sections.length == 0) {
			return false
		}

		return (refreshState == RefreshState.Idle)
	}

	render() {
		log('[RefreshSectionListView]  render')

		return (
			<SectionList
				ref={this.props.listRef}
				onEndReached={this.onEndReached}
				onRefresh={this.onHeaderRefresh}
				refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
				ListFooterComponent={this.renderFooter}
				onEndReachedThreshold={0.1}
				{...this.props}
			/>
		)
	}

	renderFooter = () => {
		let footer = null

		let footerContainerStyle = [styles.footerContainer, this.props.footerContainerStyle]
		let footerTextStyle = [styles.footerText, this.props.footerTextStyle]
		let {footerRefreshingText, footerFailureText, footerNoMoreDataText} = this.props

		switch (this.props.refreshState) {
			case RefreshState.Idle:
				footer = (<View style={footerContainerStyle} />)
				break
			case RefreshState.Failure: {
				footer = (
					<TouchableOpacity
						style={footerContainerStyle}
						onPress={() => {
							this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
						}}
					>
						<Text style={footerTextStyle}>{footerFailureText}</Text>
					</TouchableOpacity>
				)
				break
			}
			case RefreshState.FooterRefreshing: {
				footer = (
					<View style={footerContainerStyle} >
						<ActivityIndicator size="small" color="#888888" />
						<Text style={[footerTextStyle, {marginLeft: 7}]}>{footerRefreshingText}</Text>
					</View>
				)
				break
			}
			case RefreshState.NoMoreData: {
				footer = (
					<View style={footerContainerStyle} >
						<Text style={footerTextStyle}>{footerNoMoreDataText}</Text>
					</View>
				)
				break
			}
		}

		return footer
	}
}

const styles = StyleSheet.create({
	footerContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		height: 44,
	},
	footerText: {
		fontSize: 14,
		color: '#555555'
	}
})

export default RefreshSectionListView
