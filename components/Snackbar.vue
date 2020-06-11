<template>
  <v-snackbar
    id="pop-up"
    v-model="snackbar"
    :timeout="snackTimeout"
    :top="true"
    :multi-line="true"
    :color="snackbarColor"
  >
    {{ snackbarText }}
    <v-btn id="popup-btn" :ripple="false" text @click="snackbar = false">
      <v-icon>mdi-close-box</v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>
// import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    snackbar: {
      get() {
        return this.$store.state.ui.snackbar
      },
      set(val) {
        this.$store.commit('ui/setState', { snackbar: val })
      }
    },
    snackTimeout: {
      get() {
        return this.$store.state.ui.snackTimeout
      },
      set(val) {
        this.$store.commit('ui/setState', { snackTimeout: val })
      }
    },
    snackbarText: {
      get() {
        return this.$store.state.ui.snackbarText
      },
      set(val) {
        this.$store.commit('ui/setState', { snackbarText: val })
      }
    },
    snackbarColor: {
      get() {
        return this.$store.state.ui.snackbarColor
      },
      set(val) {
        this.$store.commit('ui/setState', { snackbarColor: val })
      }
    }
  },
  created() {
    this.$store.watch(
      (state) => state.ui.snackbarText,
      () => {
        const msg = this.$store.state.ui.snackbarText
        // clear message on timeout
        if (msg !== '') {
          setTimeout(() => {
            this.snackbarText = ''
          }, this.snackTimeout)
        }
      }
    )
  }
}
</script>
