import {fromJS,Map} from "immutable";

export default {
  namespace: 'home',
  state:
    Map({
      newMessageCount: 5,
      orderScheduleText:'2018-10-31 周三',
      homeSchduleData:[],
      ordersReportSuccess:{
        name:'张三',
        storeName:'京北橱柜店',
        AmountMoney:'5000',
        typeName:'预付款',
        time:'今天 15:22'
      },
      returnMoneyRatioData:{
        ratio:0.8,
        returnMoney:'8000',
        targetMoney:'10000'
      },
      workSimpleReportData:{
        incomeOrderCount:1,
        incomeMoney:5000,
        contractCount:2,
        contractMoney:10000,
      }
    }),
  reducers: {

  },
  effects: {},
}
