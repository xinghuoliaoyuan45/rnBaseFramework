
//--------------------
//下面的内容复制到 config/api文件 里面

//获取登录人信息
getUserById: server + '/api/v1/us/users/get'

//-----------------------------
//下面的内容复制到 constants/ActionTypes文件 里面
//（用 '> '替代 '/'是因为dva会认为没必要写namespace但是我认为在ActionTypes文件还是要区分，便于阅读代码

//获取登录人信息
export const GET_USER_BY_ID = 'work>GET_USER_BY_ID'
export const GET_USER_BY_IDSuccess = 'work>GET_USER_BY_ID_SUCCESS'
export const GET_USER_BY_IDError = 'work>GET_USER_BY_ID_ERROR'


//下面的内容会写到 output文件夹 名字为filename --------------------------
import {API} from 'js/Config/api'
import request from 'js/Utils/Request';
import {Toast} from 'antd-mobile-rn'
import {createAction} from "js/Utils/CommonUtils";
import {Map} from 'immutable';

import{
  GET_USER_BY_ID,//获取登录人信息
  GET_USER_BY_IDSuccess,//获取登录人信息成功后
  GET_USER_BY_IDError,//获取登录人信息失败后
  COMMON_ERROR,//处理错误
  
  }  from 'js/Constants/ActionTypes';

export default {
  namespace: 'work',
  state: Map({
      a:2
  }),
reducers: {
  /** 获取登录人信息*/
  [GET_USER_BY_IDSuccess](state, { payload }){
          return state.set('a',1);
        },
  [GET_USER_BY_IDError](state, { payload }){
            return state.set('a',1);
        },
  },
effects: {
 
  * [GET_USER_BY_ID]({payload}, {call, put, select}){
      const requestURL = API.getUserById;
       const result = yield call(request, requestURL, {
          body: payload || {}
       });
       if (result.success) {
          yield put(createAction(`${GET_USER_BY_IDSuccess}`)(result.data));
        }else{
         yield put(createAction(`${COMMON_ERROR}`)(result));
      }
   }, 
  },
}

