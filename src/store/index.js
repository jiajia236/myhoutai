import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  state:{
    menu:[]
  },
  mutations:{
    setMenu(state,menu){
      state.menu=menu;
      localStorage.setItem("menu",JSON.stringify(menu));
    },
    clearMenu(state){
      state.menu=[];
      localStorage.removeItem("menu");
    }
  }
})

export default store
