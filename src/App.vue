<style lang="scss">
</style>

<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
            clipped
            fixed
            v-model="drawer"
            app
    >

      <v-list dense>
        <v-list-tile
                router
                :to="item.to"
                :key="i"
                v-for="(item, i) in items"
                exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{appName}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>{{appCompany}} &copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Meta from './mixins/meta'

  export default {
    mixins: [Meta],

    data () {
      return {
        appName: this.$configs.appName,
        appCompany: this.$configs.appCompany,
        appLogo: this.$configs.appLogo,
        drawer: null,
        items: [
          {icon: 'apps', title: 'Welcome', to: '/'},
          {icon: 'bubble_chart', title: 'About', to: '/about'}
        ],
      }
    },
    props: {
      source: String
    }
  }
</script>