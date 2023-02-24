export default {
  helloDataAction (context, payload) {
    context.commit('helloDataCommit', payload)
  },
  notifyMsgAction (context,payload) {
    context.commit('notifyMsgCommit',payload)
  },
  notifyMsgAddAction (context,payload) {
    context.commit('notifyMsgAddCommit',payload)
  },
  notifyCountAction (context,payload) {
    context.commit('notifyCountCommit',payload)
  },
  notifyMsgEmptyAction (context,payload) {
    context.commit('notifyMsgEmptyCommit',payload)
  },
  uLogsAction (context,payload) {
    context.commit('uLogsCommit',payload)
  },
  uLogsSetReadedAction (context,payload) {
    context.commit('uLogsSetReadedCommit',payload)
  },
  testAction (context, payload) {
    context.commit('testCommit', payload)
  },
  fingerprintAction (context, payload) {
    context.commit('fingerprintCommit', payload)
  },
  userAction (context, payload) {
    context.commit('userCommit',payload)
  },
  msgJSONAction (context, payload) {
    // alert(JSON.stringify(payload))
    context.commit('msgJSONCommit',payload)
  },
  messagesAction (context, payload) {
    context.commit('messagesCommit',payload)
  },
  messagesClearAction (context, payload) {
    context.commit('messagesClearCommit',payload)
  },
  messageUpdateAction (context, payload) {
    context.commit('messageUpdateCommit',payload)
  },
  messagePatSUpdateAction (context, payload) {
    context.commit('messagePatSUpdateCommit',payload)
  },
  userDomainAction (context, payload) {
    context.commit('userDomainCommit',payload)
  },
  authTokenAction (context, payload) {
    context.commit('authTokenCommit',payload)
  },
  uploadTokensAction (context, payload) {
    context.commit('uploadTokensCommit',payload)
  },
  tweetAction (context,payload) {
    context.commit('tweetCommit',payload)
  },
  uploadMediaAction (context,payload) {
    context.commit('uploadMediaCommit',payload)
  },
  browseRangeAction (context,payload) {
    context.commit('browseRangeCommit',payload)
  },
  commentDialogAction (context,payload) {
    context.commit('commentDialogCommit',payload)
  },
  commentDialogStatusAction (context,payload) {
    context.commit('commentDialogStatusCommit',payload)
  },
  commentDialogCommentAction (context,payload) {
    context.commit('commentDialogCommentCommit',payload)
  },
  qotDialogAction (context,payload) {
    context.commit('qotDialogCommit',payload)
  },
  qotDialogStatusAction (context,payload) {
    context.commit('qotDialogStatusCommit',payload)
  },
  qotDialogCommentAction (context,payload) {
    context.commit('qotDialogCommentCommit',payload)
  },
  actUsersAction (context,payload) {
    context.commit('actUsersCommit',payload)
  },
  cacheMessagesPushAction (context,payload) {
    context.commit('cacheMessagesPushCommit',payload)
  },
  cacheMessagesClearAction (context,payload) {
    context.commit('cacheMessagesClearCommit',payload)
  },
  cacheMessagesAvatarPushAction (context,payload) {
    context.commit('cacheMessagesAvatarPushCommit',payload)
  },
  cacheMessagesAvatarClearAction (context,payload) {
    context.commit('cacheMessagesAvatarClearCommit',payload)
  },
  newMessagesUsersPushAction (context,payload) {
    context.commit('newMessagesUsersPushommit',payload)
  },
  newMessagesShowAction (context,payload) {
    context.commit('newMessagesShowCommit',payload)
  },
  newMessagesCountAction (context,payload) {
    context.commit('newMessagesCountCommit',payload)
  },
  currentUserGroupAction (context,payload) {
    context.commit('currentUserGroupCommit',payload)
  },
  timelineLoaderAction (context,payload) {
    context.commit('timelineLoaderCommit',payload)
  },
  currentMenuAction (context,payload) {
    context.commit('currentMenuCommit',payload)
  },
  //主贴数据
  postListAddAction (context,payload) {
    context.commit('postListAddCommit',payload)
  },
  //主贴数据更新
  postListMainUpdateAction (context,payload) {
    context.commit('postListMainUpdateCommit',payload)
  },
  //主贴中的评论数据更新
  postListCommentsUpdateAction (context,payload) {
    context.commit('postListCommentsUpdateCommit',payload)
  },
  //主贴点赞
  postListMainLikeAction (context,payload) {
    context.commit('postListMainLikeCommit',payload)
  },
  //主贴取消点赞
  postListMainDisLikeAction (context,payload) {
    context.commit('postListDisLikeCommit',payload)
  },
  //主贴评论
  postListMainCommentAction (context,payload) {
    context.commit('postListAddCommit',payload)
  },
  //主贴转推
  postListMainRetAction (context,payload) {
    context.commit('postListAddCommit',payload)
  },
  //主贴取消转推
  postListMainDisRetAction (context,payload) {
    context.commit('postListAddCommit',payload)
  },
  //主贴引用
  postListMainQotAction (context,payload) {
    context.commit('postListAddCommit',payload)
  },
  userInfoAction (context,payload) {
    context.commit('userInfoCommit',payload)
  },
  userInfoTwCountAddAction (context,payload) {
    context.commit('userInfoTwCountAddCommit',payload)
  },
  currentTopTwAction (context,payload) {
    context.commit('currentTopTwCommit',payload)
  },
  followToAction (context,payload) {
    context.commit('followToCommit',payload)
  },
  followByAction (context,payload) {
    context.commit('followByCommit',payload)
  },
  blockUserAction (context,payload) {
    context.commit('blockUserCommit',payload)
  },
  userFollowToAction (context,payload) {
    context.commit('userFollowToCommit',payload)
  },
  updateUserFollowToAction (context,payload) {
    context.commit('updateUserFollowToCommit',payload)
  },




  postTextAction (context, payload) {
    context.commit('postTextCommit', payload)
  },
  ucPostListAction (context, payload) {
    context.commit('ucPostListCommit', payload)
  },
  ucPostListAppendAction (context, payload) {
    context.commit('ucPostListAppendCommit', payload)
  },
  autoShowMsgAction (context, payload) {
    context.commit('autoShowMsgCommit', payload)
  },
  reportDialogAction (context, payload) {
    context.commit('reportDialogCommit', payload)
  },
  reportPostAction (context, payload) {
    context.commit('reportPostCommit', payload)
  },

}
