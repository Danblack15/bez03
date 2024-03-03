<template>
  <Hint v-if="hintData" :data="hintData"/>
  <router-view/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Cookies from 'js-cookie';

import Hint from '@/components/Hint';

export default {
  mounted() {
    if (!Cookies.get('account')) return;
    
    this.getUserData(JSON.parse(Cookies.get('account')).username);
  },

  components: {
    Hint
  },

  methods: {
    ...mapActions({
      getUserData: 'users/getUserData'
    })
  },

  computed: {
    ...mapGetters({
      hintData: 'getHint'
    })
    
  }
}
</script>

<style lang="sass">

</style>
