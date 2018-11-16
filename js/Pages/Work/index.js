import React, {Component} from 'react';
import colors from 'js/Themes/Colors'
import {
  Container,
  Text,
  Content,
  View
} from "native-base";
import {hasPermission, resourceMap,getHttpUrl,px2dp} from "js/Utils/CommonUtils";
import {Grid, Col, Row} from "react-native-easy-grid";
import HeadBar from 'js/Components/HeaderBar'
import {connect} from "react-redux";
import BasePage from "js/Pages/BasePage";
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from 'js/Components/ImageButton'

class Work extends Component {
  static navigationOptions = {
    header: null
  };

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      pageName: 'Work',
    };
  }

  initMenusByPerson(items) {
    let newArr = [];
    items.map(item => {
      //如果未为菜单设置code，则默认显示
      if (!item.code || hasPermission(item.code)) {
        newArr.push(item);
      }
    })
    return newArr;
  }

  render() {
    let saleMenuList = this.initMenusByPerson(this.props.workList.sale);
    let activityMenuList = this.initMenusByPerson(this.props.workList.activity);
    let officeMenuList = this.initMenusByPerson(this.props.workList.office);
    const {userInfo} = this.props

    return (
      <Container style={{backgroundColor: colors.pageBackgroundColor}}>
        <HeadBar
          titleText={"工作"}
          leftVisible={false}
          rightVisible={false}/>
        <Content>
          <Grid>
            <Row onPress={() => this.props.navigation.navigate("Profile")}>
              <Col style={{marginLeft: 15, marginTop: 10, marginBottom: 10, marginRight: 0, justifyContent: 'center'}}>
                <ImageButton style={{width: 70, height: 70, borderRadius: 35}}
                             defaultSource={require('js/Assets/circleDefaultHead.png')}
                             source={{uri: userInfo && userInfo.iconUrl ? getHttpUrl(userInfo.iconUrl) : ""}}/>
              </Col>
              <Col style={{width: 200}}>
                <Row style={{marginTop: 15, alignItems: 'center'}}>
                  <Text style={{fontSize: 18, color: colors.textTitle}}>{userInfo ? userInfo.username : ''}</Text>
                </Row>
                <Row style={{marginTop: 2}}>
                  {(GLOBAL.user && GLOBAL.user.roleName && GLOBAL.user.roleName.length > 0) && (
                    <Text style={{fontSize: 13, color: colors.textTitle}}>{GLOBAL.user.roleName[0]}</Text>)}
                  <Text style={{
                    fontSize: 13,
                    color: colors.textTitle,
                    marginLeft: 15
                  }}>{userInfo ? userInfo.deptName : ''}</Text>
                </Row>
              </Col>
              <Col style={{justifyContent: 'center'}}>
                <Icon name="ios-arrow-forward-outline" size={px2dp(18)} style={{textAlign: 'right', marginRight: 20}}
                      color={colors.arrowColor}/>
              </Col>
            </Row>
            {/*销售部分*/}
            {
              hasPermission(resourceMap.SALE) && (
                <Row>
                  <Separator bordered style={styless.separator}>
                    <Text style={styless.titleStyle}>销售</Text>
                  </Separator>
                </Row>
              )
            }
            {
              hasPermission(resourceMap.OFFICE) && officeMenuList.length > 0 && (
                <Row>
                  {
                    officeMenuList.slice(0, 4).map((item, index) => {

                      if (item.title == '企业通知') {
                        return this.generateColwork_notification(item);
                      }
                      if (item.title == '培训') {
                        return this.generateColwork_train(item);
                      }
                      return this.generateCol(item);
                    })
                  }
                </Row>
              )
            }

            {
              hasPermission(resourceMap.ORDER_WORK) && orderMenuList.length > 0 && (
                <Row>
                  {
                    orderMenuList.slice(0, 4).map((item, index) => {
                      return this.generateCol(item);
                    })
                  }
                </Row>
              )
            }
            {
              hasPermission(resourceMap.ORDER_WORK) && (
                <Row>
                  <Separator bordered style={styless.separator}>
                    <Text style={styless.titleStyle}>活动</Text>
                  </Separator>
                </Row>
              )
            }
            {
              hasPermission(resourceMap.ORDER_WORK) && orderMenuList.length > 0 && (
                <Row>
                  {
                    orderMenuList.slice(0, 4).map((item, index) => {
                      return this.generateCol(item);
                    })
                  }
                </Row>
              )
            }

            {
              hasPermission(resourceMap.ORDER_WORK) && orderMenuList.length > 4 && (
                <Row>
                  {
                    orderMenuList.slice(4, 8).map((item, index) => {
                      return this.generateCol(item);
                    })
                  }
                </Row>
              )
            }
            {
              hasPermission(resourceMap.ORDER_WORK) && orderMenuList.length > 8 && (
                <Row>
                  {
                    orderMenuList.slice(8, 16).map((item, index) => {
                      return this.generateCol(item);
                    })
                  }
                </Row>
              )
            }


          </Grid>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workList: state.resources.get('workList')
  }
}


export default connect(mapStateToProps)(BasePage(Work));
