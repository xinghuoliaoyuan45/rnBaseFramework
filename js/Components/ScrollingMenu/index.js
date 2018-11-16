'use strict'

import React, {
	Component
} from 'react';

import ReactNative, {
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	Image,
	View
} from 'react-native';
import PropTypes from 'prop-types'

class ScrollingMenu extends Component {

	constructor(props) {
		super(props)
		this.state = {
			selected: 0,
			widths: new Array(props.items.length),
			contentWidth: 0
		}
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.selectedIndex != this.props.selectedIndex){
			this.setState({selected: nextProps.selectedIndex})
			//加入延时是因为需要等ScrollView渲染完后才会正确滚动到尾部
			setTimeout(()=>{
				this.refs.scrollView && this.refs.scrollView.scrollToEnd();
			}, 700)
		}
	}
	componentDidMount(){
		//ScrollView的宽度计算稍慢了些
		setTimeout(()=>{
			this.refs.scrollView && this.refs.scrollView.scrollTo({x: 0});
		}, 700)
	}
	scroll(itemNum) {
		let widthInFront = 0,
			currentItemWidth = this.state.widths[itemNum],
			screenWidth = Dimensions.get('window').width,
			contentWidth = this.state.contentWidth,
			self = this

		for (let i = 0; i <= itemNum; i++) {
			if (i < itemNum) widthInFront += this.state.widths[i] + this.props.itemSpacing
		}

		setTimeout(function(){
			window.requestAnimationFrame(
				() => {
					let x = (widthInFront + self.props.itemSpacing) - ( ( screenWidth / 2 ) - ( currentItemWidth / 2 ) )
					if (x < 0) {
						x = 0
					} else if (x > (contentWidth - screenWidth)) {
						x = contentWidth - screenWidth
					}
					if (self.props.noSetState) {
						if (self.props.noSetState.indexOf(self.props.items[itemNum]) === -1) {
							self.refs.scrollView.scrollTo({x})
							self.setState({selected: itemNum})
						}
					} else {
						self.refs.scrollView.scrollTo({x})
						self.setState({selected: itemNum})
					}
				}
			)
		},500)

		this.props.callback(itemNum)
	}

	render() {

		let styles = StyleSheet.create({
			scrollBar: {
				backgroundColor: this.props.backgroundColor,
				paddingBottom: 10,
				paddingTop: 8
			},
			scrollBarItem: {
				color: this.props.textColor,
				marginRight: this.props.itemSpacing
			},
			scrollBarFirstItem: {
				marginLeft: this.props.itemSpacing
			},
			scrollBarSelectedItem: {
				color: this.props.selectedTextColor
			}
		})

		let items = []
		for (let i = 0; i < this.props.items.length; i++) {
			items.push(
				<TouchableOpacity
					key={i}
					style={[{flexDirection: 'row'}, styles.button]}
					onPress={() => { this.scroll(i) }}
				>
					<Text style={[i === 0 ? styles.scrollBarFirstItem : null, styles.scrollBarItem, this.state.selected === i ? styles.scrollBarSelectedItem : null]}
								onLayout={(object) => {
									let {width} = object.nativeEvent.layout
									let newState = this.state
									newState.widths[i] = width
									this.setState(newState)
								}}
					>
						{this.props.items[i]}
					</Text>
					<Image style={{marginRight: 5, marginLeft: -10, width: 5, height: 10, alignSelf: 'center'}}
								 source={require('js/assets/images/arrow-right.png')}></Image>
				</TouchableOpacity>
			)
		}

		return (
			<ScrollView
				ref='scrollView'
				style={styles.scrollBar}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				onContentSizeChange={(contentWidth, contentHeight) => {
					this.setState({contentWidth})
				}}
			>
				{items}
			</ScrollView>
		)
	}
}

ScrollingMenu.propTypes = {
	items: PropTypes.array.isRequired,
	callback: PropTypes.func.isRequired,
	backgroundColor: PropTypes.string,
	textColor: PropTypes.string,
	selectedTextColor: PropTypes.string,
	itemSpacing: PropTypes.number
}

ScrollingMenu.defaultProps = {
	backgroundColor: "#ffffff",
	textColor: "#cccccc",
	selectedTextColor: "#000000",
	itemSpacing: 20
}

module.exports = ScrollingMenu
