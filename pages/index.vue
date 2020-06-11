<template>
  <div class="container">
    <div>
      <h1 class="title">
        Welcome
      </h1>
      <h2 class="subtitle">
        Upload your image here
      </h2>
      <!-- <SnackbarMessage /> -->
      <div>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-form>
                <v-card-text>
                  <div class="file-input">
                    <div class="image-file image-file--rounded">
                      <input
                        id="file"
                        type="file"
                        :accept="SheetJSFT"
                        :rules="[rules.size]"
                        class="custom-file-input"
                        @change="onFileChangeGarbage"
                      />
                    </div>
                  </div>
                  <img
                    v-if="imageGarbage"
                    :src="imageGarbage"
                    alt="your image"
                  />
                  <template v-if="imageGarbage">
                    <a class="file-remove" href="#" @click="removeImageGarbage"
                      >&#215;</a
                    >
                  </template>
                  <div class="ipl-input-hint">
                    <p>
                      Maks. ukuran file 1 Mb, hanya menerima file .jpeg, .jpg
                      dan .png
                    </p>
                  </div>
                  <br />
                  <div>
                    <h3 class="subtitle-1">
                      This garbage is classified as {{ garbageClassification }}
                    </h3>
                  </div>
                </v-card-text>
                <v-card-actions></v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

//
<style scoped>
.file-input {
  width: 100%;
  margin-bottom: 15px;
  .image-file {
    position: relative;
    padding: 12px 12px;
    border: 1px solid #9e9e9e;

    &--rounded {
      -webkit-border-radius: 4px;
      border-radius: 4px;

      label {
        position: absolute;
        left: 10px;
        top: -13px;
        padding: 0 2px;
        font-size: 11px;
        background: #fff;
        color: rgba(0, 0, 0, 0.6);
      }
    }
    .file-remove {
      position: absolute;
      right: 16px;

      text-decoration: none;
      font-size: 24px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
  &-hint {
    color: rgba(0, 0, 0, 0.6);
    font-size: 11px;
    line-height: 1.2;
    padding: 0 12px;
    margin-top: 5px;
    margin-bottom: 8px;
  }
}
</style>

<script>
import { mapActions } from 'vuex'
// import SnackbarMessage from '@/components/Snackbar'
const _SheetJSFT = ['jpg', 'jpeg', 'png']
  .map(function(x) {
    return '.' + x
  })
  .join(',')
export default {
  // components: {
  //   SnackbarMessage
  // },
  data() {
    return {
      SheetJSFT: _SheetJSFT,
      imageGarbage: '',
      rules: {
        size: (value) => {
          return (
            !value || value.size <= 1000000 || 'Maximum image size is 1 MB.'
          )
        }
      },
      garbageClassification: '.......'
    }
  },
  methods: {
    ...mapActions({
      notifFileTooBig: 'notifFileTooBig'
    }),
    onFileChangeGarbage(e) {
      const files = e.target.files || e.dataTransfer.files
      if (files[0].size > 1000000) {
        this.notifFileTooBig()
        document.getElementById('file').value = ''
        return
      }
      if (!files.length) return
      this.createImageGarbage(files[0])
    },
    createImageGarbage(file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.imageGarbage = e.target.result
      }
      reader.readAsDataURL(file)
      this.garbageClassification = 'trash'
    },
    removeImageGarbage(e) {
      this.imageGarbage = ''
      this.garbageClassification = '.......'
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
