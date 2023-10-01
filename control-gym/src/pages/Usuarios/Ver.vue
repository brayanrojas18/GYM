<template>
  <div class="column">
    <div class="float-left q-ml-md">
      <q-btn
        icon="keyboard_backspace"
        to="/usuarios"
        round
        flat
        color="white"
      />
    </div>
    <div align="center">
      <q-card class="card q-ma-md q-mt-xl" style="width: 60%">
        <q-card-section>
          <q-avatar v-if="form.photo" rounded size="200px">
            <img :src="form.photo" />
          </q-avatar>
          <q-avatar
            v-else
            color="grey-8"
            text-color="white"
            icon="person"
            size="200px"
          />
          <div class="row q-gutter-md justify-center">
            <div class="col-md-3 col-xs-12">
              <q-input
                ref="first_name"
                dark
                :rules="[val => !!val || 'campo requerido']"
                color="white"
                readonly
                v-model="form.first_name"
                label="Nombres"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <q-input
                ref="last_name"
                dark
                :rules="[val => !!val || 'campo requerido']"
                color="white"
                readonly
                v-model="form.last_name"
                label="Apellidos"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <q-input
                ref="identity_card"
                dark
                :rules="[val => !!val || 'campo requerido']"
                color="white"
                type="number"
                readonly
                v-model="form.identity_card"
                label="Cedula de identidad"
              />
            </div>
            <div class="row col-md-3 col-xs-12">
              <q-input
                ref="entry_date"
                dark
                :rules="[val => !!val || 'campo requerido']"
                color="white"
                v-model="form.entry_date"
                label="Fecha de entrada"
                readonly
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <q-input
                ref="email"
                dark
                :rules="[val => !!val || 'campo requerido']"
                color="white"
                readonly
                v-model="form.email"
                label="Correo"
                type="email"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <q-input
                ref="phone"
                dark
                :rules="[val => !!val || 'campo requerido']"
                color="white"
                readonly
                v-model="form.phone"
                label="Número de telefono"
                mask="(####) ### - ####"
                unmasked-value
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <q-select
                ref="sex"
                :rules="[val => !!val || 'campo requerido']"
                readonly
                v-model="form.sex"
                :options="[
                  { label: 'Masculino', value: 'm' },
                  { label: 'Femenino', value: 'f' }
                ]"
                dark
                color="white"
                label="Sexo"
                map-options
                emit-value
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <q-select
                ref="payment_type"
                :rules="[val => !!val || 'campo requerido']"
                readonly
                v-model="form.payment_type"
                :options="[
                  { label: 'Mensual', value: 'mes' },
                  { label: 'Semanal', value: 'semana' }
                ]"
                dark
                color="white"
                label="Tipo de pago"
                map-options
                emit-value
              />
            </div>

            <div class=" col-md-3 col-xs-12">
              <q-btn
                class="q-mt-md"
                label="Archivos"
                color="white"
                outline
                @click="dialog_archivo = true"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="dialog_archivo">
      <q-card class="dialog" style="width:600px">
        <q-card-section align="start">
          <q-btn flat round icon="reply" v-close-popup />
        </q-card-section>
        <q-card-section align="center">
          <img :src="form.file" width="500px" v-if="form.file" />
          <q-avatar
            v-else
            color="grey-8"
            text-color="white"
            icon="insert_drive_file"
            size="200px"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import assetTo64 from "src/utils/assetTo64";
export default {
  data() {
    return {
      form: {},
      loading: false,
      desde_hasta: null,
      dialog_archivo: false
    };
  },
  watch: {
    "form.exonerated_date"(v) {
      this.desde_hasta = v.from + " hasta " + v.to;
    }
  },
  computed: {},
  methods: {
    async getUser(id) {
      this.$q.loading.show();
      await this.$axios2
        .get("usuarios/" + id, {
          filter: {
            role: "user"
          }
        })
        .then(async val => {
          this.form = val;
          if (this.form.photo) {
            this.form.photo = this.$env.fileUrl + this.form.photo;
          }
          if (this.form.file) {
            this.form.file = this.$env.fileUrl + this.form.file;
          }
          this.$q.loading.hide();
        })
        .catch(e => {
          this.$q.loading.hide();
        });
    }
  },
  async mounted() {
    await this.getUser(this.$route.params.id);
  }
};
</script>
