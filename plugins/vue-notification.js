import Vue from 'vue'
import VueNotifications from 'vue-notifications'

import miniToastr from 'mini-toastr'

const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}

miniToastr.init({ types: toastTypes })

function toast({ title, message, type, timeout, cb, consoleMessage }) {
  if (consoleMessage) console[type](consoleMessage) //Here we go!
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

VueNotifications.config.timeout = 5000
Vue.use(VueNotifications, options)
