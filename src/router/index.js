import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import About from '@/views/About'

// The meta data for your routes
const meta = require('./meta.json')

Vue.use(Router)

export default new Router({
  /*mode: 'history',*/
  routes: [
    {path: '/', name: 'Index', component: Index, meta: meta['/'] },
    {path: '/about', name: 'About', component: About, meta: meta['/about'] },
    // Global redirect for 404
    { path: '*', redirect: '/'}
  ],
})