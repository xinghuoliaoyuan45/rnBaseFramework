import{
	CLICK_TABBAR,//主页点击tabbar,
  COMMON_ERROR//公共错误
}  from 'js/Constants/ActionTypes'
import {fromJS,Map} from "immutable";
import  {Toast} from 'antd-mobile-rn'

export default {
	namespace: 'app',
	state: Map({
		tabIndex:1,
    error:{}
	}),
	reducers: {
		/** 主页点击tabbar*/
		[CLICK_TABBAR](state, {payload}) {
			return state.set('tabIndex', payload);
		},
    [COMMON_ERROR](state, {payload}) {
      if(payload.error && payload.error.errorMsg){
        if(payload.error.toastType == 'info'){
          Toast.info(payload.error.errorMsg, 1);
        }else{
          Toast.fail(payload.error.errorMsg, 1);
        }
      }else if(payload.error.status){
        Toast.fail('服务器繁忙')
      }else if(payload.error == 'abort promise'){
        setTimeout(()=>{
          Toast.hide();
        }, 500)
      }else{
        console.log(payload.error);
      }
      return state.set('error', payload.error)
    },
	},
	effects: {

	},
}
