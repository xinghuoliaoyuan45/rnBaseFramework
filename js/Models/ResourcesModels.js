import {fromJS, Map} from "immutable";
import  SystemConstants from 'js/Constants/SystemConstants'
let resourceMap = SystemConstants.resourceMap
export default {
  namespace: 'resources',
  state: Map({
      workList: {
        sale: [
          {
            icon: require('js/Assets/work_card.png'),
            title: '名片',
            to: 'BusinessCard',
            code: resourceMap.CARD
          },
          {
            icon: require('js/Assets/work_case.png'),
            title: '案例',
            to: 'CaseShow',
            code: resourceMap.CARD
          },
          {
            icon: require('js/Assets/work_card.png'),
            title: '英雄榜',
            to: 'HeroList',
            code: resourceMap.CARD
          },
          {
            icon: require('js/Assets/work_card.png'),
            title: '产品',
            to: 'Product',
            code: resourceMap.CARD
          },

        ],
        activity: [
          {
            icon: require('js/Assets/work_card.png'),
            title: '活动中心',
            to: 'ActiveCenter',
            code: resourceMap.CARD
          },
          {
            icon: require('js/Assets/work_card.png'),
            title: '活动申请',
            to: 'ScanQRSaleCard',
            code: resourceMap.CARD
          },
        ],
        office: [
          {
            icon: require('js/Assets/work_card.png'),
            title: '工作简报',
            to: 'Notification',
            code: resourceMap.CARD
          },
          {
            icon: require('js/Assets/work_card.png'),
            title: '我的审核',
            to: 'Contacts',
            code: resourceMap.CARD
          },
          {
            icon: require('js/Assets/work_card.png'),
            title: '我的申请',
            to: 'Train',
            code: resourceMap.CARD,
          },
          {
            icon: require('js/Assets/work_card.png'),
            title: '测量管理',
            to: 'SpeechCraft',
            code: resourceMap.CARD
          },
          {
            icon: require('js/Assets/work_card.png'),
            title: '安装管理',
            to: 'SpeechCraft',
            code: resourceMap.CARD
          },
          {
            icon: require('js/Assets/work_card.png'),
            title: '问题管理',
            to: 'SpeechCraft',
            code: resourceMap.CARD
          },
          {
            icon: require('js/Assets/work_card.png'),
            title: '售后管理',
            to: 'SpeechCraft',
            code: resourceMap.CARD
          },{
            icon: require('js/Assets/work_card.png'),
            title: '违规管理',
            to: 'SpeechCraft',
            code: resourceMap.CARD
          },
          {
            icon: require('js/Assets/work_card.png'),
            title: '任务安排表',
            to: 'SpeechCraft',
            code: resourceMap.CARD
          }
        ]
      },
    }),
  reducers: {},
  effects: {},
}
