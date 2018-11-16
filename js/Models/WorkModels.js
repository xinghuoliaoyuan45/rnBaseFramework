import {Map} from "immutable";
import {COMMON_ERROR, GET_USER_BY_ID, GET_USER_BY_IDError, GET_USER_BY_IDSuccess} from "../Constants/ActionTypes";
import {API} from "../Config/api";
import request from "../Utils/Request";
import {createAction} from "../Utils/CommonUtils";

export default {
  namespace: 'work',
  state: Map({
    useInfo:{

    }
  }),
  reducers: {
    /** 获取登录人信息*/
    [GET_USER_BY_IDSuccess](state, { payload }){
      return state.set('useInfo',payload);
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
