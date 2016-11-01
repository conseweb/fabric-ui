import Vue from 'vue'
import VueResource from 'vue-resource'
import {
  // API_FABRIC,
  API_ROOT
} from '../config'
// import { getCookie,signOut } from '../utils/authService'

Vue.use(VueResource)

// HTTP相关
Vue.http.options.crossOrigin = true
// Vue.http.options.credentials = false
Vue.http.options.emulateJSON = false
Vue.http.options.emulateHTTP = true
// Vue.http.headers.post['content-type'] = 'application/json; charset=UTF-8'

Vue.http.interceptors.push((request, next) => {
  // 这里对请求体进行处理
  request.headers = request.headers || {}

  next((response) => {
    // 这里可以对响应的结果进行处理
    if (response.status === 409) {
      window.location.pathname = '/login'
    }
  })
})

export const RootResource = Vue.resource(API_ROOT + '{/action}')
export const AccountResource = Vue.resource(API_ROOT + '/account{/action}')
export const DeviceResource = Vue.resource(API_ROOT + '/device{/action}')
export const SignupResource = Vue.resource(API_ROOT + '/signup{/action}')

export const ChainResource = Vue.resource(API_ROOT + '/chain')
export const BlockResource = Vue.resource(API_ROOT + '/chain/blocks/{height}')
export const TransactionResource = Vue.resource(API_ROOT + '/transactions/{UUID}')
export const PeersResource = Vue.resource(API_ROOT + '/network/peers')
export const ChaincodeResource = Vue.resource(API_ROOT + '/chaincode{/action}')
// export const EventResource = Vue.resource(API_ROOT + '/socket.io/')
// export const AuthResource = Vue.resource(API_ROOT + 'auth{/id}')
// export const ArticleResource = Vue.resource(API_ROOT + 'article{/id}{/controller}')
// export const TagResource = Vue.resource(API_ROOT + 'tags{/id}')
// export const CommentResource = Vue.resource(API_ROOT + 'comment{/id}{/controller}')
// export const MobileResource = Vue.resource(API_ROOT + 'mobile{/id}')
