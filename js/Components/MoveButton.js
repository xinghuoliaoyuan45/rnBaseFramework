import React, {Component} from 'react';
import {PanResponder, StyleSheet, View, TouchableOpacity, processColor, Dimensions, Text, Image} from 'react-native';
import colors from "js/Themes/Colors";
import PropTypes from 'prop-types'

const CIRCLE_SIZE = 75;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

/**
 * Move Button
 */
class MoveButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leftLimit: this.props.leftLimit?this.props.leftLimit:0,
			rightLimit: this.props.rightLimit?this.props.rightLimit:deviceWidth - 70,
			topLimit: this.props.topLimit?this.props.topLimit:60,
			bottomLimit: this.props.bottomLimit?this.props.bottomLimit:deviceHeight - 170,

			imageWidth:this.props.imageWidth?this.props.imageWidth:70,
			imageHeight:this.props.imageHeight?this.props.imageHeight:70,

			badgeMarginLeft:this.props.badgeMarginLeft?this.props.badgeMarginLeft: -20,

		};
		this._panResponder = {};
		this._previousLeft = 0;
		this._previousTop = 0;
		this._circleStyles = {};
		this.circle = (null: ?{ setNativeProps(props: Object): void });
	}

	static propTypes = {
		//func
		onPress: PropTypes.func,//点击
		onLongPress:PropTypes.func,//长按

		//图片
		imageSource:PropTypes.any, //图片source
		imageWidth:PropTypes.number, //图片 width
		imageHeight:PropTypes.number, //图片 height

		//badge
		badgeNum: PropTypes.any,//小红点数量
		badgeMarginLeft: PropTypes.number,//leftMargin


		//移动的limit
		leftLimit: PropTypes.number,
		rightLimit: PropTypes.number,
		topLimit: PropTypes.number,
		bottomLimit: PropTypes.number,


	};

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
			onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
			onPanResponderGrant: this._handlePanResponderGrant,
			onPanResponderMove: this._handlePanResponderMove,
			onPanResponderRelease: this._handlePanResponderEnd,
			onPanResponderTerminate: this._handlePanResponderEnd,
		});
		this._previousLeft = this.state.rightLimit;
		this._previousTop = this.state.bottomLimit;
		this._circleStyles = {
			style: {
				left: this._previousLeft,
				top: this._previousTop,
				backgroundColor: "#00000000",
				// backgroundColor: "green",
			}
		};
	}


	componentDidMount() {
		this._updateNativeStyles();
	};

	render() {
		return (
			<View
				ref={(circle) => {
					this.circle = circle;
				}}
				style={styles.circle}
				{...this._panResponder.panHandlers}
			>
				<Image resizeMode='cover' style={{width: this.state.imageWidth, height: this.state.imageHeight}} source={this.props.imageSource? this.props.imageSource: require('js/assets/images/grab.png')}/>
				{(!isNaN(this.props.badgeNum) && this.props.badgeNum != 0) && (
					<View style={{
						width: 18,
						height: 18,
						borderRadius: 9,
						justifyContent: 'center',
						alignItems: 'center',
						borderColor: colors.appRed,
						backgroundColor: colors.appRed,
						borderWidth: 1,
						marginLeft: this.state.badgeMarginLeft,
					}}>
						<Text style={{color: colors.white, fontSize: 12, backgroundColor: colors.transparent, marginBottom: 2}}>{this.props.badgeNum + ""}</Text>
					</View>
				)}


			</View>
		);
	};

	_highlight = () => {
		// console.log("点击");
		// this._circleStyles.style.backgroundColor = 'blue';
		this._updateNativeStyles();
	};

	_unHighlight = () => {
		// console.log("收起点击");
		// this._circleStyles.style.backgroundColor = 'green';
		this._updateNativeStyles();
	};

	_updateNativeStyles = () => {
		this.circle && this.circle.setNativeProps(this._circleStyles);
	};

	_handleStartShouldSetPanResponder = (e: Object, gestureState: Object) => {
		// Should we become active when the user presses down on the circle?
		return true;
	};

	_handleMoveShouldSetPanResponder = (e: Object, gestureState: Object) => {
		// Should we become active when the user moves a touch over the circle?
		return true;
	};

	_handlePanResponderGrant = (e: Object, gestureState: Object) => {
		this.lastPressed = Date.now();
		this.moveStatus = false;
		this._highlight();
	};

	_handlePanResponderMove = (e: Object, gestureState: Object) => {
		let newLeft = this._previousLeft + gestureState.dx;
		let newTop = this._previousTop + gestureState.dy;

		if (newLeft < this.state.leftLimit) {
			newLeft = this.state.leftLimit;
		}

		if (newLeft > this.state.rightLimit) {
			newLeft = this.state.rightLimit;
		}

		if (newTop < this.state.topLimit) {
			newTop = this.state.topLimit;
		}
		if (newTop > this.state.bottomLimit) {
			newTop = this.state.bottomLimit;
		}

		this._circleStyles.style.left = newLeft;
		this._circleStyles.style.top = newTop;

		this._updateNativeStyles();
		if(gestureState.dx!= 0 && gestureState.dy!=0){
			this.moveStatus = true;
		}

	};

	_handlePanResponderEnd = (e: Object, gestureState: Object) => {
		this._unHighlight();
		this._previousLeft += gestureState.dx;
		this._previousTop += gestureState.dy;
		if (!this.moveStatus) {
			//Press
			if (this.lastPressed + 800 >= Date.now()) {
				console.log("onPress");
				this.props.onPress();
			}

			//LongPress
			if (this.lastPressed + 800 < Date.now()) {
				console.log("onLongPress");
				this.props.onLongPress();
			}
		}


	};
};

const styles = {
	circle: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE - 5,
		// borderRadius: CIRCLE_SIZE / 2,
		position: 'absolute',
		left: 0,
		top: 0,
		flexDirection: 'row',
	},
	container: {
		// flex: 1,
		backgroundColor: "#00000000"
	},
};
export default MoveButton;
