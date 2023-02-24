export default {
  testState: state => "" + state.test,
  fingerprintState: state => "" + state.fingerprint,
  userState: state => state.user,
  uploadTokensState: state => state.uploadTokens,
  msgJSONState: state => state.msgJSON,
  messagesState: state => state.messages,
  browseRangeState: state => state.browseRange,
  commentDialogState: state => state.commentDialog,
  qotDialogState: state => state.qotDialog,
  helloDataState: state => state.helloData,
  notifyMsgsState: state => state.notifyMsgs,
  notifyCountState: state => state.notifyCount,
  uLogsState: state => state.uLogs,
  actUsersState: state => state.actUsers,
  cacheMessagesState: state => state.cacheMessages,
  cacheMessagesAvatarState: state => state.cacheMessagesAvatar,
  newMessagesState: state => state.newMessages,
  currentUserGroupState: state => state.currentUserGroup,
  timelineLoaderState: state => state.timelineLoader,
  currentMenuState: state => state.currentMenu,
  postListState: state => state.postList,
  userInfoState: state => state.userInfo,
  currentTopTwState: state => state.currentTopTw,
  followToState: state => state.followTo,
  followByState: state => state.followBy,
  blockUserState: state => state.blockUser,
  userFollowToState : state => state.userFollowTo,
  // 群组消息相关
  groupMessagesState: state => state.groupMessages,




  postTextState: state => state.postText,
  ucPostListState: state => state.ucPostList,
  autoShowMsgState: state => state.autoShowMsg,
  reportDialogState: state => state.reportDialog,
  reportPostState: state => state.reportPost
}
