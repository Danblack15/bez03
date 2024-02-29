<template>
  <router-view/>
</template>

<script>
import { mapActions } from 'vuex';
import Cookies from 'js-cookie';

export default {
  mounted() {
    if (!Cookies.get('account')) return;
    
    this.getUserData(JSON.parse(Cookies.get('account')).username);
  },

  methods: {
    ...mapActions({
      getUserData: 'users/getUserData'
    })
  }
}
</script>

<style lang="sass">

</style>
