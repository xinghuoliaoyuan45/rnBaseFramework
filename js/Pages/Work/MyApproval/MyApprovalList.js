import React, {Component} from "react";
import BaseComponent from 'js/containers/Base/BaseComponent';
import {connect} from "react-redux";
import {View, ScrollView, Image, Alert, TouchableOpacity, Keyboard, DeviceEventEmitter} from 'react-native';
import HeadStatusBar from 'js/components/HeadStatusBar';
import HeadBar from 'js/components/HeadBar';
import colors from 'js/themes/colors';
import styles from 'js/themes/styles';
import {px2dp,} from 'js/utils/commonUtils';
import Communications from 'react-native-communications';

import {
  Container,
  Header,
  Title,
  Content,
  ListItem,
  Separator,
  ActionSheet,
  Text,
  Row,
  Col,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";
import HeaderSearchAndSegment from "js/components/HeaderSearchAndSegment"
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import TextPopViewModal from '../Components/OrderPopViewModal';
import {orderStyles} from "../Components/OrderUtils";
import moment from 'moment';
import {
  pickGoodsList,
  pickGoodsSubmit,
  saveListForm,
  toggelInfoCheckModal
} from './actions'
import {Divider} from "../Components/CustomerView";


const imgWidth = 80;

class PickGoodsList extends BaseComponent {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshState: RefreshState.Idle,
      searchText: '',
      segmentTabIndex: 0,
      reportContent: '',
      checkStatus: 3,//3：汇报完成、4：汇报未完成
      toggleId:'',
    }
    this.loadData.bind(this)
  }

  componentDidMount() {
    this.props.toggelInfoCheckModal({flag: false});
    this.loadData()
    DeviceEventEmitter.addListener('PickGoodsListRefresh',()=>{
      this.loadData()
    })
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('PickGoodsListRefresh')
  }

  loadData() {
    this.props.saveListForm({
      status: this.state.segmentTabIndex == 0?[1,2]:[3,4],
      current: 1,
      pageSize: 10,
      key: this.state.searchText,
    });
    setTimeout(() => {
      this.props.pickGoodsList();
    }, 20)
  }

  render() {
    return (
      <Container style={{backgroundColor: colors.pageBackgroundColor}}>
        <HeadStatusBar/>
        <HeadBar
          titleText={'取货汇报'}
          leftBackIconOnPress={() => this.props.navigation.goBack()}/>
        <HeaderSearchAndSegment
          placeholderTexts='采购单号/退货单号/任务单号'
          segmentOneValue={'未完成'}
          segmentTwoValue={'已完成'}
          // segmentTreeValue={'完成'}
          // haveTree
          onSearchChangeTextCallBlock={(text) => {
            this.setState({searchText: text});
          }}
          onSearchPressedCallBlock={() => {
            this.searchClick();
          }}
          onSegmentOnChangeBlock={this.onChange}
        />
        <RefreshListView
          data={this.props.listData}
          renderItem={this.renderDiscountItem}
          keyExtractor={(item, index) => item.id}
          refreshState={this.props.pickGoodsListForm.refreshState}
          onHeaderRefresh={this.onHeaderRefresh}
          onFooterRefresh={this.onFooterRefresh}
          ItemSeparatorComponent={() => <Separator style={{height: 10, backgroundColor: colors.pageBackgroundColor}}/>}
        />
        {
          //为了重新渲染
          this.props.isToggelInfoCheckModal && (
            <TextPopViewModal
              oneBtnSubtitleText={"未完成"}
              twoBtnSubtitleText={"完成"}
              TitleText={"取货汇报是否完成"}
              TextInputPlaceHolderText={"汇报内容"}
              subTitleVisible={true}
              TextInputVisible={true}
              TextInputMaxLength={200}
              onChangeTextCallBack={(text) => {
                this.setState({reportContent: text});
              }}
              onClinckCheckBtnBack={(index) => {
                if(index==1){
                  this.setState({checkStatus: 4});
                }else{
                  this.setState({checkStatus: 3});
                }
              }}
              confirmCallBack={() => {
                Keyboard.dismiss();
                this.props.toggelInfoCheckModal({flag: false});
                this.submitDatas();
              }}
              cancelCallBack={() => {
                this.setState({checkStatus: 4});
                Keyboard.dismiss();
                this.props.toggelInfoCheckModal({flag: false});
              }}
            />
          )
        }

      </Container>
    );
  }

  /*******************顶部搜索*************************/
  onChange = (event) => {
    Keyboard.dismiss();
    debugger
    this.setState({segmentTabIndex: event.i}, this.loadData)
  }

  searchClick() {
    Keyboard.dismiss();
    this.loadData();
  };

  /*****************提交审核确定****************************/
  submitDatas() {
    debugger
    // 3通过   4驳回
    this.props.pickGoodsSubmit({
      id: this.state.toggleId,
      status: this.state.checkStatus,
      reportContent: this.state.reportContent
    });
  }

  /********************渲染item****************************/
  renderDiscountItem = (item) => {
    let alreadyReport = false
    let status = item.item.status
    if (status == 3 || status == 4) {
      alreadyReport = true
    }

    return (
      <View>
        <View style={orderStyles.orderItemSepType}>
          {/*订单号*/}
          <View style={styles.rowFlexViewStyle}>
            <Text style={orderStyles.itemLeftLableStyle}>{"任务单号 ："}</Text>
            <Text style={{fontSize: 15, color: colors.textTitle}}>{item.item.code}</Text>
          </View>
          {/*分割线*/}
          <View style={[styles.horizontalDivideLine, {marginTop: 8}]}/>
          <View style={orderStyles.orderLine}>
            <View style={styles.rowStyle}>
              <Text style={orderStyles.itemLeftLableStyle}>{"类型  : "}</Text>
              <Text style={{fontSize: 15, color: colors.textTitle}}> {item.item.businessTypeName}</Text>
              <View style={{flex:1}}></View>
              <Text style={orderStyles.itemLeftLableStyle}>{"状态  : "}</Text>
              <Text style={{fontSize: 15, color: colors.textTitle}}> {item.item.statusName}</Text>
            </View>
          </View>
          <View style={orderStyles.orderLine}>
            <Text style={orderStyles.itemLeftLableStyle}>{"取货人: "}</Text>
            <Text
              style={{fontSize: 15, color: colors.textTitle}}>{item.item.invoiceEmployeeName}</Text>
          </View>
          {/*取货时间*/}
          {this.state.segmentTabIndex == 1 && (
            <View style={orderStyles.orderLine}>
              <Text style={orderStyles.itemLeftLableStyle}>{"取货时间: "}</Text>
              <Text
                style={orderStyles.itemRightDesLabelMax100}>{item.item.invoiceTime && moment(item.item.invoiceTime).format('YYYY-MM-DD HH:mm')}</Text>
            </View>)
          }
          {/*汇报时间*/}
          {this.state.segmentTabIndex == 1 && (
            <View style={orderStyles.orderLine}>
              <Text style={orderStyles.itemLeftLableStyle}>{"汇报时间: "}</Text>
              <Text
                style={orderStyles.itemRightDesLabelMax100}>{item.item.reportTime && moment(item.item.reportTime).format('YYYY-MM-DD HH:mm')}</Text>
            </View>)
          }
          <View style={orderStyles.orderLine}>
            <Text style={orderStyles.itemLeftLableStyle}>{"取货描述："}</Text>

            <Text
              style={{
                fontSize: 13,
                color: colors.textTitle,
                flex: 1
              }}>{item.item.invoiceRemarks}</Text>
          </View>
          {
            this.state.segmentTabIndex == 1 && (
              <View style={orderStyles.orderLine}>
                <Text style={orderStyles.itemLeftLableStyle}>{"汇报内容："}</Text>
                <Text
                  style={{fontSize: 13, color: colors.textTitle, flex: 1}}>{item.item.reportContent}</Text>
              </View>

            )
          }
          <View style={[styles.horizontalDivideLine, {marginTop: 4}]}/>
          <View style={orderStyles.bottomLine}>
            {
              status == 2  ?
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => {
                    this.setState({toggleId: item.item.id},()=>{
                      this.props.toggelInfoCheckModal({flag: true});
                    });
                  }}>
                  <View style={[orderStyles.bgOrangeButton, {marginLeft: 0, alignSelf: 'flex-end'}]}>
                    <Text style={orderStyles.whiteTextInButton}>{"汇报"}</Text>
                  </View>
                </TouchableOpacity>:null
            }
            {
              alreadyReport ?
                <View style={{...styles.rowFlexViewStyle}}>
                  <View style={{flex: 1}}/>

                  {
                    item.item.status === 3 ?
                      <Image style={{...orderStyles.imageFinishType, marginRight: 10}}
                             source={require('js/assets/images/report_unfinished.png')}/> : null
                  }
                  {
                    item.item.status === 4 ?
                      <Image style={{...orderStyles.imageFinishType, marginRight: 10}}
                             source={require('js/assets/images/report_finished.png')}/> : null
                  }

                </View> : null
            }
          </View>
        </View>
      </View>
    )
  }
  /********************刷新*****************************/
  onHeaderRefresh = () => {
    this.props.saveListForm({
      refreshState: RefreshState.HeaderRefreshing,
      current: 1
    });
    setTimeout(() => {
      this.props.pickGoodsList();
    }, 200);
  }
  onFooterRefresh = () => {
    this.props.saveListForm({
      refreshState: RefreshState.HeaderRefreshing,
      current: this.props.pickGoodsListForm.current + 1
    });
    setTimeout(() => {
      this.props.pickGoodsList();
    }, 200);
  }
}

const mapStateToProps = (state) => {
  return {
    listData: state.getIn(['pickGoodsReportReducer', 'listData']),
    isToggelInfoCheckModal: state.getIn(['pickGoodsReportReducer', 'isToggelInfoCheckModal']),
    pickGoodsListForm: state.getIn(['pickGoodsReportReducer', 'pickGoodListForm']),
  }
};

export function mapDispatchToProps(dispatch) {
  return {
    pickGoodsList: (data) => dispatch(pickGoodsList({data})),
    saveListForm: (data) => dispatch(saveListForm({data})),
    pickGoodsSubmit: (data) => dispatch(pickGoodsSubmit({data})),
    toggelInfoCheckModal: (payload) => dispatch(toggelInfoCheckModal(payload)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PickGoodsList);
