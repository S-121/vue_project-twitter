export default {
  //群组消息相关
  groupMessagesCommit (state,data) {

    // 添加新消息到最后
    if(data.type === 'push'){

      console.log('消息数组长度：' + state.groupMessages.length)

      state.groupMessages.push(data.message)

      console.log('追加后新消息数组长度：' + state.groupMessages.length)

    } else if(data.type === 'concat'){
      //追加数组

      state.groupMessages = state.groupMessages.concat(data.message)

      console.log('追加后新消息数组长度：' + state.groupMessages.length)

    }
    // 删除timeline中某条贴文
    else if(data.type === 'del'){

      console.log('data.message:' + data.message)

      let t = data.message.toString()

      for(let i = 0; i < state.groupMessages.length; i++) {

        if(state.groupMessages[i].T.toString() === t) {
          // alert(JSON.stringify(state.messages[i]))
          state.groupMessages.splice(state.groupMessages.indexOf(state.groupMessages[i]),1)
          i -= 1
        }

      }


    }
    // 添加新消息到最上
    else if(data.type ==='unshift'){

      // 判断如果E消息已更新了数组，则不再添加
      let len = 0
      // 如果消息数组大于20，只判断前20条数据即可
      if(state.groupMessages.length > 20) {
        len = 20
      }else {
        len = state.groupMessages.length
      }

      let flag = true
      //如果存在相同消息体，消息体不加进消息数组
      /*for (let i = 0; i < len; i++) {
        if(state.messages[i].T === data.message.T) {
          flag = false
        }
      }*/

      if(flag) {
        //防止修改同样的数组引用  JSON.parse(JSON.stringify(data.message)
        state.groupMessages.unshift(JSON.parse(JSON.stringify(data.message)))
      }


    }else if(data.type ==='assign'){

      state.groupMessages = data.message

    }else if(data.type ==='update'){

      let start = state.browseRange.start
      let end = state.browseRange.end

      if(end < 1) {
        end = state.groupMessages.length
      }

      console.log(`推送更新数据，范围:start:${start},end:${end}`)

      //遍历现有messages数组中需更新的消息，即T相同

      for(let i = 0; i < data.message.TStats.length; i++) {
        // console.log( "state.messages: " + JSON.stringify(state.messages[i]))
        console.log('data.message.Tstats: ' + JSON.stringify(data.message.TStats[i]))
        for(let j = start; j < end; j++) {
          // console.log( "state.messages: " + JSON.stringify(state.messages[j]))
          try {
            if ((state.groupMessages[j].T.toString() === data.message.TStats[i].T.toString() || (state.groupMessages[j].Retw.toString() === data.message.TStats[i].T.toString()) )) {
              /*alert(JSON.stringify(this.$store.getters["Post/messagesState"][j].Stat))
              alert(JSON.stringify(message.TStats[i]))*/
              state.groupMessages[j].Stat.ULike = data.message.TStats[i].ULike
              state.groupMessages[j].Stat.Ret = data.message.TStats[i].Ret
              state.groupMessages[j].Stat.Qot = data.message.TStats[i].Qot
              state.groupMessages[j].Stat.Cot = data.message.TStats[i].Cot
            }
          } catch (e) {
            console.log("更新统计数据出错mutations："+e)
          }
        }
      }
      // state.messages = data.message
    }else if(data.type ==='like'){

    }else {
      state.groupMessages.push(data.message)
    }
  },

  helloDataCommit (state,data) {
    state.helloData = data
  },
  notifyMsgAddCommit (state,data) {
    state.notifyMsgs.unshift(data)
  },
  notifyMsgCommit (state,data) {
    state.notifyMsgs = data
  },
  notifyCountCommit (state,data) {
    state.notifyCount = data
  },
  notifyMsgEmptyCommit (state,data) {
    state.notifyMsgs = []
  },

  uLogsCommit (state,data) {
    state.uLogs = data
  },

  uLogsSetReadedCommit (state,data) {

    if (state.uLogs) {

      for (let i = 0; i < state.uLogs.length; i++) {

        if(state.uLogs[i].Unread)
          state.uLogs[i].Unread = false

      }

    }

  },

  msgJSONCommit (state,data) {
    if(data.Type === 'T') {
      state.msgJSON.T = data.T
    }else if( data.Type === 'Tw') {
      state.msgJSON.Tw = data.Tw
    }else if( data.Type === 'P') {
      state.msgJSON.P = data.P
    }else if( data.Type === 'Tw') {
      state.msgJSON.Tw = data.Tw
    }else if( data.Type === 'Url') {
      state.msgJSON.Url = data.Url
    }else if( data.Type === 'Retw') {
      state.msgJSON.Retw = data.Retw
    }else if( data.Type === 'User') {
      state.msgJSON.User = data.User
    }else if( data.Type === 'Typ') {
      state.msgJSON.MTyp = data.MTyp
    }else if( data.Type === 'Url') {
      state.msgJSON.Url = data.Url
    }else if( data.Type === 'PatS') {
      state.msgJSON.PatS = data.PatS
    }else if( data.Type === 'QotS') {
      state.msgJSON.QotS = data.QotS
    }else if( data.Type === 'GroupId') {
      state.msgJSON.GroupId = data.GroupId
    }else if( data.Type === 'Group') {
      state.msgJSON.Group = data.Group
    }
    else{
      console.log('mutations:msgJSONCommit is null')
    }
  },
  messagesClearCommit (state,data) {
    state.messages = []
  },
  // 消息数组操作
  messagesCommit (state,data) {

    // 添加新消息到最后
    if(data.type === 'push'){

      console.log('消息数组长度：' + state.messages.length)

      state.messages.push(data.message)

      console.log('追加后新消息数组长度：' + state.messages.length)

    } else if(data.type === 'concat'){
      //追加数组

      state.messages = state.messages.concat(data.message)

      console.log('追加后新消息数组长度：' + state.messages.length)

    }
    // 删除timeline中某条贴文
    else if(data.type === 'del'){

      console.log('data.message:' + data.message)

      let t = data.message.toString()

      for(let i = 0; i < state.messages.length; i++) {

        if(state.messages[i].T.toString() === t) {
          // alert(JSON.stringify(state.messages[i]))
          state.messages.splice(state.messages.indexOf(state.messages[i]),1)
          i -= 1
        }

      }


    }
    // 添加新消息到最上
    else if(data.type ==='unshift'){

      // 判断如果E消息已更新了数组，则不再添加
      let len = 0
      // 如果消息数组大于20，只判断前20条数据即可
      if(state.messages.length > 20) {
        len = 20
      }else {
        len = state.messages.length
      }

      let flag = true
      //如果存在相同消息体，消息体不加进消息数组
      /*for (let i = 0; i < len; i++) {
        if(state.messages[i].T === data.message.T) {
          flag = false
        }
      }*/

      if(flag) {
        //防止修改同样的数组引用  JSON.parse(JSON.stringify(data.message)
        state.messages.unshift(JSON.parse(JSON.stringify(data.message)))
      }


    }else if(data.type ==='assign'){

      state.messages = data.message

    }else if(data.type ==='update'){

      let start = state.browseRange.start
      let end = state.browseRange.end

      if(end < 1) {
        end = state.messages.length
      }

      console.log(`推送更新数据，范围:start:${start},end:${end}`)

      //遍历现有messages数组中需更新的消息，即T相同

      for(let i = 0; i < data.message.TStats.length; i++) {
        // console.log( "state.messages: " + JSON.stringify(state.messages[i]))
        console.log('data.message.Tstats: ' + JSON.stringify(data.message.TStats[i]))
        for(let j = start; j < end; j++) {
          // console.log( "state.messages: " + JSON.stringify(state.messages[j]))
          try {
            if ((state.messages[j].T.toString() === data.message.TStats[i].T.toString() || (state.messages[j].Retw.toString() === data.message.TStats[i].T.toString()) )) {
              /*alert(JSON.stringify(this.$store.getters["Post/messagesState"][j].Stat))
              alert(JSON.stringify(message.TStats[i]))*/
              state.messages[j].Stat.ULike = data.message.TStats[i].ULike
              state.messages[j].Stat.Ret = data.message.TStats[i].Ret
              state.messages[j].Stat.Qot = data.message.TStats[i].Qot
              state.messages[j].Stat.Cot = data.message.TStats[i].Cot
            }
          } catch (e) {
            console.log("更新统计数据出错mutations："+e)
          }
        }
      }
      // state.messages = data.message
    }else if(data.type ==='like'){

    }else {
      state.messages.push(data.message)
    }
  },
  messagePatSUpdateCommit (state,data) {
    console.log('更新数据message：' + JSON.stringify(data))
    /* let start = this.$store.getters["Post/browseRangeState"].start
     let end = this.$store.getters["Post/browseRangeState"].end
     alert('start'+start)*/
    try{
      for(let i = 0; i<state.messages.length; i++){

        // console.log('state.messages[i].PatS[0]' + state.messages[i].PatS[0].T)

        if(state.messages[i].PatS && data.message.T === state.messages[i].PatS[0].T) {
          if(data.type === 'like') {
            state.messages[i].PatS[0].StatU.ULikeU = 1
            state.messages[i].PatS[0].Stat.ULike += 1
          }else if(data.type === 'dislike') {
            state.messages[i].PatS[0].StatU.ULikeU = 0
            if(state.messages[i].PatS[0].Stat.ULike<1) {
              state.messages[i].PatS[0].Stat.ULike = 0
            }else{
              state.messages[i].PatS[0].Stat.ULike -= 1
            }
          }else if(data.type === 'ret') {
            state.messages[i].PatS[0].StatU.RetU = 1
            state.messages[i].PatS[0].Stat.Ret += 1
          }else if(data.type === 'disret') {
            state.messages[i].PatS[0].StatU.RetU = 0
            if((state.messages[i].PatS[0].Stat.Ret + state.messages[i].PatS[0].Stat.Qot)<1) {
              state.messages[i].PatS[0].Stat.Ret = 0
            }else{
              state.messages[i].PatS[0].Stat.Ret -= 1
            }
          }

        }
      }

    }catch (e) {
      console.log('messagePatSUpdateCommit Error:' + e)
    }
  },
  messageUpdateCommit (state,data) {
    console.log('更新数据message：' + JSON.stringify(data))
    /* let start = this.$store.getters["Post/browseRangeState"].start
     let end = this.$store.getters["Post/browseRangeState"].end
     alert('start'+start)*/
    try{
      for(let i = 0; i<state.messages.length; i++){
        if(data.message.T === state.messages[i].T) {
          if(data.type === 'like') {
            state.messages[i].StatU.ULikeU = 1
            state.messages[i].Stat.ULike += 1
          }else if(data.type === 'dislike') {
            state.messages[i].StatU.ULikeU = 0
            if(state.messages[i].Stat.ULike<1) {
              state.messages[i].Stat.ULike = 0
            }else{
              state.messages[i].Stat.ULike -= 1
            }
          }else if(data.type === 'ret') {
            state.messages[i].StatU.RetU = 1
            state.messages[i].Stat.Ret += 1
          }else if(data.type === 'disret') {
            state.messages[i].StatU.RetU = 0
            if((state.messages[i].Stat.Ret + state.messages[i].Stat.Qot)<1) {
              state.messages[i].Stat.Ret = 0
            }else{
              state.messages[i].Stat.Ret -= 1
            }
          }

          console.log(`第${i}条message：` + JSON.stringify(data))
        }
      }

    }catch (e) {
      console.log('messageUpdateCommit Error:' + e)
    }
  },
  testCommit (state, data) {
    state.test = data
  },
  fingerprintCommit (state, data) {
    state.fingerprint = data
  },
  userCommit (state,data) {
    state.user = data
  },
  userDomainCommit (state,data) {
    state.user.domain = data
  },
  uploadTokensCommit (state,data) {
    state.uploadTokens = data
  },
  uploadMediaCommit(state,data) {
    state.user.mediaUrl = data
  },
  authTokenCommit (state,data) {
    state.user.authToken = data
  },
  tweetCommit (state,data) {
    state.user.tweet = data
  },
  browseRangeCommit (state,data) {
    state.browseRange = data
  },
  commentDialogCommit (state,data) {
    state.commentDialog = data
  },
  commentDialogStatusCommit (state,data) {
    state.commentDialog.dialog = data
  },
  commentDialogCommentCommit (state,data) {
    state.commentDialog.Tw = data
  },
  qotDialogCommit (state,data) {
    state.qotDialog = data
  },
  qotDialogStatusCommit (state,data) {
    state.qotDialog.dialog = data
  },
  qotDialogCommentCommit (state,data) {
    state.qotDialog.Tw = data
  },
  actUsersCommit (state,data) {
    state.actUsers = data
  },
  cacheMessagesPushCommit (state,data) {
    state.cacheMessages.push(data)
  },
  cacheMessagesClearCommit (state,data) {
    state.cacheMessages = []
  },
  cacheMessagesAvatarPushCommit (state,data) {
    state.cacheMessagesAvatar.push(data)
  },
  cacheMessagesAvatarClearCommit (state,data) {
    state.cacheMessagesAvatar = []
  },
  newMessagesUsersPushCommit (state,data) {
    state.newMessages.users.push(data)
  },

  newMessagesShowCommit (state,data) {
    state.newMessages.show = data
  },
  newMessagesCountCommit (state,data) {
    state.newMessages.count = data
  },
  currentUserGroupCommit (state,data) {
    state.currentUserGroup = data
  },
  timelineLoaderCommit (state,data) {
    state.timelineLoader = data
  },
  currentMenuCommit (state,data) {
    state.currentMenu = data
  },
  userInfoCommit (state,data) {
    state.userInfo = data
  },
  userInfoTwCountAddCommit (state,data) {
    state.userInfo.TwCount = data
  },
  postListAddCommit (state,data) {
    state.postList = data
  },
  //主贴的数据更新
  postListMainUpdateCommit (state,data) {

    // alert(data.T.toString() === state.postList.T.toString())

    if(data.T.toString() === state.postList.T.toString()) {
      if(data.type === 'like') {
        state.postList.StatU.ULikeU = 1
        state.postList.Stat.ULike += 1
      }else if(data.type === 'dislike') {
        state.postList.StatU.ULikeU = 0
        if(state.postList.Stat.ULike < 1) {
          state.postList.Stat.ULike = 0
        }else{
          state.postList.Stat.ULike -= 1
        }
      }else if(data.type === 'ret') {
        state.postList.StatU.RetU = 1
        state.postList.Stat.Ret += 1
      }else if(data.type === 'disret') {
        state.postList.StatU.RetU = 0
        if((state.postList.Stat.Ret + state.postList.Stat.Qot) < 1) {
          state.postList.Stat.Ret = 0
        }else{
          state.postList.Stat.Ret -= 1
        }
      }
    }


  },
  //主贴中的评论数据更新
  postListCommentsUpdateCommit (state,data) {

    //评论列表中数据更新
    try{
      for(let i = 0; i<state.postList.CotS.length; i ++ ){
        if(data.T.toString() === state.postList.CotS[i].T.toString()) {
          if(data.type === 'like') {
            state.postList.CotS[i].StatU.ULikeU = 1
            state.postList.CotS[i].Stat.ULike += 1
          }else if(data.type === 'dislike') {
            state.postList.CotS[i].StatU.ULikeU = 0
            if(state.postList.CotS[i].Stat.ULike<1) {
              state.postList.CotS[i].Stat.ULike = 0
            }else{
              state.postList.CotS[i].Stat.ULike -= 1
            }
          }else if(data.type === 'ret') {
            state.postList.CotS[i].StatU.RetU = 1
            state.postList.CotS[i].Stat.Ret += 1
          }else if(data.type === 'disret') {
            state.postList.CotS[i].StatU.RetU = 0
            if((state.postList.CotS[i].Stat.Ret + state.postList.CotS[i].Stat.Qot)<1) {
              state.postList.CotS[i].Stat.Ret = 0
            }else{
              state.postList.CotS[i].Stat.Ret -= 1
            }
          }
        }
      }

    }catch (e) {
      console.log('messageUpdateCommit Error:' + e)
    }

  },
  postListMainLikeCommit (state,data) {
    if(state.postList) {

    }
    state.postList = data
  },
  postListMainDisLikeCommit (state,data) {
    state.postList = data
  },
  currentTopTwCommit (state,data) {
    state.currentTopTw = data
  },
  followToCommit (state,data) {
    state.followTo = data
  },
  followByCommit (state,data) {
    state.followBy = data
  },
  blockUserCommit (state,data) {
    state.blockUser = data
  },
  userFollowToCommit (state,data) {
    state.userFollowTo = data
  },
  updateUserFollowToCommit (state,message) {

    //对比following数据，如有相同，则将用户往上顶
    let followingUsers = state.userFollowTo

    let index,tem

    for (let i = 0; i < followingUsers.length; i++) {

      if(message.User.Uid === followingUsers[i].UserId) {

        //更新消息内容
        followingUsers[i].LTw = message.Tw

        //更新消息时间
        followingUsers[i].ALive = 1

        //将指定用户置顶
        index = i
        tem = followingUsers[i]
        // console.log('followingUser[i]:' + followingUsers[i])

        //删除原数组中的元素
        followingUsers.splice(index,1)

        //新元素添加到顶部
        followingUsers.unshift(tem)

        // console.log('new following list :' + JSON.stringify(followingUsers))

      }
    }

    state.userFollowTo = followingUsers

  },






  postTextCommit (state,data) {
    state.postText = data
  },
  ucPostListCommit (state,data) {
    state.ucPostList = data
  },
  ucPostListAppendCommit (state,data) {

    state.ucPostList = state.ucPostList.concat(data)

  },
  autoShowMsgCommit (state,data) {
    state.autoShowMsg = data
  },
  reportDialogCommit (state,data) {
    state.reportDialog = data
  },
  reportPostCommit (state,data) {
    state.reportPost = data
  },

}
