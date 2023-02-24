import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
    helloData: {
        Domain: '',
        TimeStamp:0
    },
    commentDialog: {
        dialog: false,
        T: '',
        User: {
            Uid: 0,
            User: "cUser",
            UserD: "cUser",
            UserA: require('../../assets/users/user-d.png')
        },
        Tw: "",
        P: null,
        Typ: "",
        Url: "",
        PatS: [
            {
                T: '',
                User: {
                    Uid: 0,
                    User: "oUser",
                    UserD: "oUser",
                    UserA: require('../../assets/users/user-d.png')
                },
                Tw: '',
                P: null,
                Typ: '',
                Url: '',
                St: '',
                Qots: null
            }
        ]
    },
    qotDialog: {
        dialog: false,
        T: '',
        User: {
            Uid: 0,
            User: "",
            UserD: "",
            UserA: require('../../assets/users/user-d.png')
        },
        Tw: "",
        P: null,
        Typ: "",
        Url: "",
        QotS: [
            {
                T: '',
                User: {
                    Uid: 0,
                    User: "",
                    UserD: "",
                    UserA: require('../../assets/users/user-d.png')
                },
                Reply: [],
                Tw: '',
                P: null,
                Typ: '',
                Url: '',
                St: '',
            }
        ]


    },
    test:'123',
    fingerprint: '',
    uploadTokens: [],
    browseRange: {
        start:0,
        end:15
    },
    user: {
        tweet:'',
        authToken: '',
        mediaUrl: [],
    },
    newMessages: {
        users: [],
        show: false,
        count:0
    },
    timelineLoader: false,
    currentUserGroup: '',
    notifyMsgs: [],
    notifyCount: 0,
    uLogs: null,
    actUsers: '',
    messages: null,
    currentTopTw:{
        T: 0,
        message:[]
    },
    cacheMessages: [],
    cacheMessagesAvatar: [],

    //群组消息相关
    groupMessages: [],


    postList: null,
    currentMenu: 0,
    //用户关注的列表
    userFollowTo: null,
    // 用户基础信息
    userInfo:{},
    // 完整消息体，组装完成后可用来直接显示消息
    msgJSON:{"T": "",
        "Typ": "",
        "InGroup": 0,
        "Group": { },
        "User": {
            "Uid": 0,
            "User": "guest",
            "UserD": "guest",
            "UserA": require('../../assets/users/user-d.png'),
            "IsGroup": 0
        },
        "Reply": null,
        "ReUser": {
            "Uid": 0,
            "User": "",
            "UserD": "",
            "UserA": "",
            "IsGroup": 0
        },
        "Retw": "",
        "Tw": "",
        "P": null,
        "MTyp": "",
        "Url": "",
        "St": 0,
        "Stat": {
            "Exposure": 0,
            "Viewer": 0,
            "ULike": 0,
            "Ret": 0,
            "Qot": 0,
            "Cot": 0
        },
        "StatU": {
            "ViewerU": 0,
            "ULikeU": 0,
            "RetU": 0
        },
        "QotS": null,
        "PatS": null
    },
    // 关注列表
    followTo: [],
    // 粉丝列表
    followBy: [],
    // 拉黑列表
    blockUser: [],
    //回复贴子输入内容
    postText:'',
    ucPostList: [],
    //自动显示新消息
    autoShowMsg: false,
    //举报弹窗
    reportDialog: false,
    //举报的贴子
    reportPost:'',
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
