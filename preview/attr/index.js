import AttrCom from './com'
import AttrData from './Data'
import Vue from 'vue'

function install () {
  Vue.component('attr-data', AttrData)
  Vue.component('attr-resource', AttrCom)
  Vue.component('attr-function', AttrCom)
  Vue.component('attr-richtext', AttrCom)
  Vue.component('attr-event', AttrCom)
}

export default {
  install
}
