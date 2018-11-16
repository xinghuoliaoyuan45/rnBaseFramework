
import React, {Component} from "react";
import {connect} from "react-redux";
import {
  View,ScrollView,TextInput,Image,Alert,Keyboard,TouchableOpacity,
  Dimensions,RefreshControl,Platform,ActivityIndicator,DeviceEventEmitter,StyleSheet
} from 'react-native';
import {
  Container,Header,Footer,FooterTab,Title,Input,Content,ListItem,Separator,
  Text,Row,Col,Button,Left,Right,Body
} from "native-base";
import colors from 'js/Themes/Colors';



export class PolyTable extends Component {
  constructor() {
    super();
    this.state = {
      dataSource:[],
      selectedData:[]
    };
  }
  static navigationOptions = {
    header: null
  };
  componentWillMount() {

  }
  switchTab(){

  }
  render() {
    return (
      <View>
        {/*表头*/}
        <View style={mystyles.tableviewHeaderView}>
          {
            this.props.columns&&this.props.columns.map((column,index)=>{
              return (
                <Text key={index} style={mystyles.headerViewTitle}>{column.title}</Text>
              )
            })
          }
        </View>
        {/*表数据*/}
        {
          this.props.dataSource&&this.props.dataSource.length != 0&&this.props.dataSource.map((item,index) => {
            let props={};
            if(this.props.rowKey){
              props['key'] = this.props.rowKey(column);
            }else{
              props['key'] = index;
            }
            return (
              <ListItem
                style={mystyles.listItem}
                {...props}
              >
                <View
                  style={{flexDirection: 'row',}}
                >
                  { this.props.columns && this.props.columns.map((column,idx)=>{
                    return (
                      <Text key={idx} style={mystyles.cellTitle}>{column.render?column.render(item[column.dataIndex],item,idx):item[column.dataIndex]}</Text>
                    )
                  })}
                </View>
              </ListItem>
            )
          })
        }
        {
          (!this.props.dataSource||this.props.dataSource.length == 0) && <ListItem
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}><Text style={{fontSize:12,fontWeight:'normal'}}>暂无数据</Text></ListItem>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
}

export function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PolyTable);

const mystyles = {
  blackText: {
    fontSize: 15,
    color: colors.textBlack,
  },
  garyText: {
    fontSize: 12,
    color: colors.textGary,
  },
  cellTitle: {
    fontSize: 13,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1
  },
  headerViewTitle: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 14,
    color: '#9B9B9B',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
  },
  tableviewHeaderView: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    backgroundColor: '#F7F7F9',
    flexDirection: 'row',
    paddingTop:5,
    paddingBottom:5
  },
  listItem:{
    marginLeft:15,
    marginRight:15,
    borderLeftWidth:StyleSheet.hairlineWidth,
    borderRightWidth:StyleSheet.hairlineWidth,
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderColor:'#F0F0F0',
    paddingRight:0
  }
};
