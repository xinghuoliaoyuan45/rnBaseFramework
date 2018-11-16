
//--------------------
//下面的内容复制到 config/api文件 里面

//登录
login: server + '/api/v1/us/users/login'


//-----------------------------
//下面的内容复制到 constants/ActionTypes文件 里面
//（用 '> '替代 '/'是因为dva会认为没必要写namespace但是我认为在ActionTypes文件还是要区分，便于阅读代码

//登录
export const LOGIN = 'global>LOGIN'
export const LOGINSuccess = 'global>LOGIN_SUCCESS'
export const LOGINError = 'global>LOGIN_ERROR'

//保存登陆表单
export const SAVE_LOGIN_FORM = 'global>SAVE_LOGIN_FORM'


//下面的内容会写到 output文件夹 名字为filename --------------------------
import {API} from 'js/Config/api'
import request from 'js/Utils/Request';
import {Toast} from 'antd-mobile-rn'
import {createAction} from "js/Utils/CommonUtils";
import Immutable from 'immutable';

import{
  LOGIN,//登录
  LOGINSuccess,//登录成功后
  LOGINError,//登录失败后
  COMMON_ERROR,//处理错误
  SAVE_LOGIN_FORM//保存登陆表单
  }  from 'js/Constants/ActionTypes';

export default {
  namespace: 'global',
  state: Immutable.fromJS({
      a:2
  }),
reducers: {
  /** 登录*/
  [LOGINSuccess](state, { payload }){
          return state.set('a',1);
        },
  [LOGINError](state, { payload }){
            return state.set('a',1);
        },
  /** 保存登陆表单*/
  [SAVE_LOGIN_FORM](state, { payload }){
        return state.set('a',1);
    },
  },
effects: {
 
  * [LOGIN]({payload}, {call, put, select}){
      const requestURL = API.LOGIN;
       const result = yield call(request, requestURL, {
          body: payload || {}
       });
       if (result.success) {
          yield put(createAction(`${LOGINSuccess}`)(result.data));
        }else{
         yield put(createAction(`${COMMON_ERROR}`)(result));
      }
   }, 
  },
}

