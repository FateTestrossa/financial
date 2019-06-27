import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/Home.vue'
import expenditure from '../components/Expenditure.vue'
import revenue from '../components/Revenue.vue'
import index from '../components/index.vue'
import person from '../components/Person.vue'
import user from '../components/User.vue'
// import record from '../components/Record.vue'
// import paymore from '../components/PayMore.vue'
// import incomemore from '../components/IncomeMore.vue'
// import budget from '../components/Budget.vue'
import login from '../components/Login.vue'
import register from '../components/Register.vue'
import lookPSD from '../components/LookPSD.vue'
// import setnewPSD from '../components/SetNewPSD.vue'
// import addmember from '../components/AddMember.vue'
// import changename from '../components/ChangeName.vue'
// import changetel from '../components/ChangeTel.vue'
// import detail from '../components/Detail.vue'
// import showdetails from '../components/ShowDetails.vue'
//利用import 将组件导入
Vue.use(Router)
//设置路由地图
export default new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      name: 'index',
      path: '/index',
      component: index,
      children: [
        {
          name: 'home',
          path: 'home',
          component: home,
          children: [
            {
              name: 'expenditure',
              path: 'expenditure',
              component: expenditure
            },
            {
              name: 'revenue',
              path: 'revenue',
              component: revenue
            },
            {
              name: 'user',
              path: 'user',
              component: user
            }
          ]
        },
        {
          name: 'person',
          path: 'person',
          component: person
        }
      ]
    },
    //  {
    //     path:'/record',
    //     component:record
    //   },
    //   {
    //     path:'/paymore',
    //     component:paymore
    //   },
    //   {
    //     path:'/incomemore',
    //     component:incomemore
    //   },
    //   {
    //     path:'/budget',
    //     component:budget
    //   },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/lookPSD',
      component: lookPSD
    },
    //   {
    //     path:'/setnewPSD',
    //     component:setnewPSD
    //   },

    //   {
    //     path:'/moeny',
    //     component:personal
    //   },
    //   {
    //     path:'/addmember',
    //     component:addmember
    //   },
    //   {
    //     path:'/changename',
    //     component:changename
    //   },
    //   {
    //     path:'/changetel',
    //     component:changetel
    //   },
    //   {
    //     path:'/detail',
    //     component:detail
    //   },
    //   {
    //     path:'/showdetails',
    //     component:showdetails
    //   }
  ]

})
