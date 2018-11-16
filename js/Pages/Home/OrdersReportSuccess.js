import React, {Component} from 'react';
import colors from 'js/Themes/Colors'
import {
  Container,
  Text,
  Content,
  View
} from "native-base";
import HeadBar from 'js/Components/HeaderBar'
import { connect } from 'react-redux';

class OrdersReportSuccess extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container style={{backgroundColor: colors.pageBackgroundColor}}>
        <HeadBar
          titleText={"签单捷报"}
          leftVisible={false}
          rightVisible={false}/>
        <Content>

        </Content>
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(OrdersReportSuccess)
