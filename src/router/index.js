import {createRouter, createWebHistory} from "vue-router";

import MainView from '@/pages/MainView';
import SnackView from '@/pages/SnackView';
import CreateSnackView from '@/pages/CreateSnackView';
import UpdateSnackView from '@/pages/UpdateSnackView';

import ResultView from '@/pages/ResultView';

import StoreView from '@/pages/StoreView';
import SelectStoreView from '@/pages/SelectStoreView';
import CreateStoreView from '@/pages/CreateStoreView';
import UpdateStoreView from '@/pages/UpdateStoreView';

const routes = [
  {
    path: '/',
    redirect: '/snack/home'
  },
  {
    path: '/snack',
    name: 'MainView',
    component: MainView,
    redirect: '/snack/home',
    children: [   
      {
        path: '/snack/home',
        name: 'SnackView',
        component: SnackView
      },
      {
        path: '/snack/create/:userId',
        name: 'CreateSnackView',
        component: CreateSnackView,
        props(route) {
          return {
            userId: parseInt(route.params.userId)
          }
        }
      },
      {
        path: '/snack/update',
        name: 'UpdateSnackView',
        component: UpdateSnackView
      }
    ]
  }, 
  {
    path: '/result',
    name: 'ResultView',
    component: ResultView
  },
  {
    path: '/pickshop',
    name: 'StoreView',
    component: StoreView,
    redirect: '/pickshop/shop',
    children: [
      {
        path: '/pickshop/shop',
        name: 'SelectStoreView',
        component: SelectStoreView
      },
      {
        path: '/pickshop/create',
        name: 'CreateStoreView',
        component: CreateStoreView
      },
      {
        path: '/pickshop/update/:shopId',
        name: 'UpdateStoreView',
        component: UpdateStoreView
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;