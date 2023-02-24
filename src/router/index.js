import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/* all routes */

const ArticleLayout = () => import('@/layouts/ArticleLayout')

/* layout routes */
const layoutChildRoutes = (prop, mode) => [
/*  {
    path: "/",
    name:  'home',
    meta: { auth: false, name: 'Vog Home' },
    component: Home
  },*/
  {
    path: 'article',
    name: prop + '.articlehome',
    component: () => import('@/layouts/ArticleLayout'),
    children:articleChildRoute('article'),
    redirect:'article/articlegrid'
  },
  {
    path: 'video',
    name: prop + '.videohome',
    meta: { auth: true, name: 'Video Home' },
    component: () => import('@/layouts/VideoLayout'),
    children: videoChildRoute('video'),
    redirect: 'video/videohome'
  }
]

/*Article route*/
const articleChildRoute = (prop, mode = true) => [
  {
    path: "articlegrid",
    name: prop + ".articlegrid",
    component: () => import('@/components/Article/ArticleThumbsGrid')
  },
  {
    path: 'articlepage/:lang/:id',
    name: prop + '.articlepage',
    component: () => import('@/views/Article/article_page')
  },
  {
    path: 'user/:lang/:id',
    name: prop +  '.usercontent',
    component: () => import('@/views/Article/user_content')
  },
  {
    path: 'list/:role/:lang/:id',
    name: prop + '.articlelist',
    component: () => import('@/views/Article/article_list')
  },
  {
    path: 'tags',
    name: prop + '.tags',
    component: () => import('@/views/Article/article_tags')
  },
]

/*video route*/

const videoChildRoute = (prop, mode = true) => [
  {
    path: "videohome",
    name: prop + ".videohome",
    component: () => import('@/views/Video/VideoHome')
  },
  {
    path: "channel/:id",
    name: prop + ".channel",
    component: () => import('@/views/Video/channel')
  },
]

const routes = [
  //用户登录
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import(/*webpackChunkName: "signin"*/"@/views/Login/SignIn")
  },
  //用户注册
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import(/*webpackChunkName: "signup"*/"@/views/Login/SignUp")
  },
  //忘记密码
  {
    path: '/forgot',
    name: 'Forgot',
    component: () => import(/*webpackChunkName: "forgot"*/"@/views/Login/Forgot")
  },
  //修改密码
  {
    path: '/changepwd',
    name: 'ChangePwd',
    component: () => import(/*webpackChunkName: "changepwd"*/"@/views/Login/ChangePwd")
  },

  // {
  //   path: "/layout",
  //   name: "BasicLayout2",
  //   redirect: 'timeline2',
  //   component: () => import(/*webpackChunkName: "layout"*/"@/layouts/BasicLayout2"),
  //   children:[
  //     {
  //       path: "/timeline2",
  //       name: "TimeLineLayout",
  //       component: () => import(/*webpackChunkName: "timeline2"*/"@/layouts/TimeLineLayout"),
  //     }
  //   ]
  // },

  {
    path: "/",
    component: () => import(/*webpackChunkName: "root"*/"@/layouts/BasicLayout"),
    redirect: 'timeline',
    children: [
      {
        path: "timeline",
        name: "TimeLineLayout",
        component: () => import(/*webpackChunkName: "timeline"*/"@/layouts/TimeLineLayout"),
      },

      {
        path: "notifications",
        name: "Notifications",
        component: () => import(/*webpackChunkName: "notifications"*/"@/views/Pages/Notifications"),
      },
      {
        path: "usercenter",
        name: "UserCenter",
        component: () => import(/*webpackChunkName: "usercenter"*/"@/views/Pages/UserCenter"),
      },
      {
        path: "postlist",
        name: "PostList",
        component: () => import(/*webpackChunkName: "postlist"*/"@/views/Pages/PostList"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import(/*webpackChunkName: "postlist"*/"@/views/Pages/Profile"),
      },
      {
        path: "setting",
        name: "setting",
        component: () => import(/*webpackChunkName: "postlist"*/"@/views/Pages/Setting"),
      },
      {
        path: "reports",
        name: "reports",
        component: () => import(/*webpackChunkName: "postlist"*/"@/views/Pages/Reports"),
      },
      {
        path: "userstats",
        name: "UserStats",
        component: () => import(/*webpackChunkName: "userstats"*/"@/views/Pages/UserStats"),
      },
      {
        path: "bookmark",
        name: "Bookmark",
        component: () => import(/*webpackChunkName: "bookmark"*/"@/views/Pages/Bookmark"),
      },
    ],
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
