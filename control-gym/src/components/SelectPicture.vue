<template>
  <div class="relative-position">
    <picture-input
      ref="picture"
      :width="isPersonalFile ? '200' : '1500'"
      :height="isPersonalFile ? '200' : '1000'"
      margin="16"
      class="relative-position picture"
      :style="{ opacity: model ? 0 : 1, zIndex: 2 }"
      :crop="false"
      :hideChangeButton="true"
      :removable="true"
      removeButtonClass="bg-red no-border text-white"
      accept="image/jpeg,image/png"
      size="0.24"
      :custom-strings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Arrastra una imagen o seleccionala',
        remove: 'Eliminar la foto'
      }"
      @change="onChange"
    >
    </picture-input>

    <div
      v-if="model"
      class="absolute-top-right fit"
      style="background-position: center; background-repeat: no-repeat; background-size: contain;z-index: 1;"
      :style="{ backgroundImage: 'url(' + model + ')' }"
    />

    <q-btn
      icon="create"
      flat
      round
      class="text-white absolute-top-right q-ma-none"
      style="z-index: 100"
      @click="editar = true"
      v-if="model"
      color="primary"
    />
    <q-btn
      icon="delete"
      flat
      round
      class="text-white absolute-top-right q-mt-xl q-mx-none q-mb-none"
      style="z-index: 100"
      @click="deleteImg()"
      v-if="model"
      color="primary"
    />

    <q-dialog v-model="editar" maximized>
      <q-card style="width: 100%">
        <q-toolbar
          class=" text-white"
          style="background: linear-gradient(0.25turn, #0a111b, #2e2f34)"
        >
          <q-btn flat round dense v-close-popup icon="keyboard_arrow_left" />
          <q-toolbar-title>
            Editar imagen
          </q-toolbar-title>
          <q-btn flat round dense icon="check" @click="crop" />
        </q-toolbar>

        <vue-cropper
          class="fit"
          ref="cropper"
          v-if="model && editar"
          :src="model"
          alt="Source Image"
          @cropmove="cropImage"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import PictureInput from "vue-picture-input";

export default {
  components: {
    VueCropper,
    PictureInput
  },
  props: {
    value: {}
  },
  data() {
    return {
      editar: false,
      path: null,
      isPersonalFile: true,
      isRemoved: false
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    onChange(image) {
      this.model = image;
    },
    cropImage(e) {},
    crop() {
      this.editar = false;
      this.model = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    deleteImg() {
      this.onChange(null);
    }
  },
  mounted() {
    const path = this.$route.path;
  }
};
</script>

<style>
.picture-preview {
  z-index: 1 !important;
  border-radius: 30px;
}
.d-azul {
  background: rgba(79, 43, 138, 1);
}
</style>
