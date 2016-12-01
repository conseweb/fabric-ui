import NotFound from './components/NotFound'
import MainNav from './components/MainNav'

import Login from './components/account/Login'
import SignUp from './components/account/SignUp'

import DashBoard from './components/DashBoard'
import Account from './components/account/Account'
import Chain from './components/blockchain/Chain'
import Chaincode from './components/blockchain/Chaincode'
import Network from './components/network/Network'
import SysSetting from './components/system/Setting'

// the router needs a root component to render.
// for demo purposes, we will just use an empty one
// because we are using the HTML as the app template.

export function configRouter (router) {
  router.map({
    '/': {
      component: MainNav,
      subRoutes: {
        '/dashboard': {
          component: DashBoard
        },
        '/account': {
          component: Account
        },
        '/chaincode': {
          component: Chaincode
        },
        '/block': {
          component: Chain
        },
        '/network': {
          component: Network
        },
        '/setting': {
          component: SysSetting
        }
      }
    },
    '/login': {
      component: Login
    },
    '/signup': {
      component: SignUp
    },
    '*': {
      component: NotFound
    }
  })

  router.redirect({
    '/': '/dashboard'
  })
}
