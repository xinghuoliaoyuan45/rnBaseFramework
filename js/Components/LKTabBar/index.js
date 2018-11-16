const React = require('react');
const ReactNative = require('react-native');
import colors from 'js/Themes/Colors';
const {
	StyleSheet,
	Text,
	View,
	Animated,
} = ReactNative;
const Button = require('./Button');
import PropTypes from 'prop-types'

const BaseTabBar = React.createClass({
	propTypes: {
		goToPage: PropTypes.func,
		activeTab: PropTypes.number,
		tabs: PropTypes.array,
		backgroundColor: PropTypes.string,
		activeTextColor: PropTypes.string,
		inactiveTextColor: PropTypes.string,
		textStyle: Text.propTypes.style,
		tabStyle: View.propTypes.style,
		renderTab: PropTypes.func,
		underlineStyle: View.propTypes.style,
	},

	getDefaultProps() {
		return {
			activeTextColor: 'navy',
			inactiveTextColor: 'black',
			backgroundColor: null,
		};
	},

	renderTabOption(name, page) {
	},

	renderTab(name, page, isTabActive, onPressHandler) {
		const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
		const textColor = isTabActive ? activeTextColor : inactiveTextColor;
		const fontWeight = isTabActive ? 'bold' : 'normal';

		return <Button
			style={styles.flexOne}
			key={name}
			accessible={true}
			accessibilityLabel={name}
			accessibilityTraits='button'
			onPress={() => onPressHandler(page)}
		>
			<View style={[styles.tab, this.props.tabStyle, ]}>
				<View style={{borderBottomColor: isTabActive ? colors.primaryLight: 'transparent', borderBottomWidth: 2, paddingBottom: 10, paddingTop: 14}}>
					<Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
						{name}
					</Text>
				</View>
			</View>
		</Button>;
	},

	render() {

		return (
			<View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, borderColor: this.props.borderColor}, this.props.style, ]}>
				{this.props.tabs.map((name, page) => {
					const isTabActive = this.props.activeTab === page;
					const renderTab = this.props.renderTab || this.renderTab;
					return renderTab(name, page, isTabActive, this.props.goToPage);
				})}
			</View>
		);
	},
});

const styles = {
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 5,
	},
	flexOne: {
		flex: 1,
	},
	tabs: {
		height: 40,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-end',
		borderWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderColor: '#ccc',
	},
};

module.exports = BaseTabBar;
