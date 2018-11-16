import {API} from 'js/Config/api'
import request from 'js/Utils/Request';
import  {Toast} from 'antd-mobile-rn'
import {createAction} from "js/Utils/CommonUtils";
import {Map} from 'immutable';
import {Alert} from  'react-native'
import { NavigationActions } from 'react-navigation';
// import NavigationService from 'js/Routes/NavigationService';


import{
  LOGIN,//登录
  LOGINSuccess,//登录成功后
  LOGINError,//登录失败后
  COMMON_ERROR,
  SAVE_LOGIN_FORM//保存登陆表单
}  from 'js/Constants/ActionTypes';


export default {
  namespace: 'global',
  state: Map({
    user: {}, //登录返回的数据
    //控制UI
    loginForm: {
      doingAutoLogin: false, //是否正在登录
      showLoginUI: false, //是否显示登录UI
    },

  }),
  reducers: {
    /** 登录*/
    [LOGINSuccess](state, { payload }){
      return state
    },
    [LOGINError](state, { payload }){
      return state.set('a',1);
    },
    /** 保存登陆表单*/
    [SAVE_LOGIN_FORM](state, { payload }){
      return state.set('a',1);
    }
  },
  effects: {
    * [LOGIN]({payload}, {call, put, select}){
      let userLoginInfo = new Object();
      userLoginInfo.loginName = payload.loginName;
      userLoginInfo.password = "";
      GLOBAL.storage.save({
        key: 'userLoginInfo',
        data: userLoginInfo
      },);
      const requestURL = API.login;
      const result = yield call(request, requestURL, {
        body: payload || {}
      });
      if (result.success) {
        //用戶的登录信息,存放登录名、密码
        let userLoginInfo = new Object();
        userLoginInfo.loginName = payload.loginName;
        userLoginInfo.password = payload.password;
        GLOBAL.storage.save({
          key: 'userLoginInfo',
          data: userLoginInfo
        });
        //非null判断
        let userInfo  = result.data;
        if(userInfo.labels == undefined){
          Toast.info("角色为空，请联系管理员");
          userInfo.labels  = "";
        }
        if(userInfo.labelIds == undefined){
          userInfo.labelIds  = "";
        }
        if(!userInfo.codes || userInfo.codes.length<=0){
          setTimeout(() => {
            Alert.alert(
              '权限配置',
              '\n用户权限暂未配置，请尽快联系管理员~',
              [
                {text: '确定', onPress: () => {}},
              ],
            )
          },100);
        }
        GLOBAL.storage.save({
          key: 'user',
          data: userInfo,
        });

        GLOBAL.token = result.data.token;
        GLOBAL.user = userInfo;
        yield put(createAction(`${LOGINSuccess}`)(result.data));
        yield put(NavigationActions.navigate({routeName: 'MainPage'}))

      }else{
        yield put(createAction(`${COMMON_ERROR}`)(result));
      }
    },
  }
}
