<template>
  <div class="row">
    <div class="float-left q-ml-md col-1">
      <q-btn
        icon="keyboard_backspace"
        to="/usuarios"
        round
        flat
        color="white"
      />
    </div>
    <div align="center" class="col">
      <q-card class="card q-ma-md " style="width: 80%">
        <div class="tex-white text-center text-weight-bolder text-h3 q-mt-xs">
          Nuevo Usuario
        </div>
        <q-card-section>
          <div>
            <select-picture class="col-3" @null="clearImg" v-model="picture" />
          </div>
          <div class="row q-gutter-md justify-center">
            <div class="col-md-3 col-xs-12">
              <q-input
                ref="first_name"
                dark
                :rules="[val => !!val || 'campo requerido']"
                color="white"
                v-model="user_creation_form.first_name"
                label="Nombres"
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <q-input
                ref="last_name"
                dark
                :rules="[val => !!val || 'campo requerido']"
                color="white"
                v-model="user_creation_form.last_name"
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
                v-model="user_creation_form.identity_card"
                label="Cedula de identidad"
              />
            </div>
            <div class="row col-md-3 col-xs-12">
              <q-input
                ref="entry_date"
                dark
                :rules="[val => !!val || 'campo requerido']"
                color="white"
                v-model="user_creation_form.entry_date"
                label="Fecha de entrada"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="user_creation_form.entry_date"
                        class="dialog "
                        color="grey-8"
                        minimal
                        mask="YYYY-MM-DD"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Cerrar"
                            color="white"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-md-3 col-xs-12">
              <q-input
                ref="email"
                dark
                :rules="[val => !!val || 'campo requerido']"
                color="white"
                v-model="user_creation_form.email"
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
                v-model="user_creation_form.phone"
                label="Número de telefono"
                mask="(####) ### - ####"
                unmasked-value
              />
            </div>
            <div class="col-md-3 col-xs-12">
              <q-select
                ref="sex"
                :rules="[val => !!val || 'campo requerido']"
                v-model="user_creation_form.sex"
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
            <div class=" col-md-3 col-xs-12">
              <q-btn
                class="q-mt-md"
                label="Cargar archivo"
                @click="dialog_archivo = true"
                color="white"
                outline
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section align="center">
          <q-btn
            id="btn"
            style="width: 200px"
            @click="save()"
            :loading="loading"
          >
            <div class="text-center text-weight-bolder">
              Guardar
            </div>
          </q-btn>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="dialog_archivo">
      <q-card class="dialog" style="width:300px">
        <q-card-section align="center">
          <select-picture class="col-3" @null="clearImg" v-model="file" />
          <div class="q-mt-md">
            <q-btn-group push>
              <q-btn
                outline
                label="cancelar"
                color="white"
                @click="(file = null), (dialog_archivo = false)"
              />
            </q-btn-group>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog de generación de pago -->
    <q-dialog v-model="dialog_payment">
      <generar-pago-card
        :payment-data="payment_form"
        :user-creation-data="user_creation_form"
        :is-new-user="true"
        @close-dialog="dialog_payment = false"
      ></generar-pago-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import SelectPicture from "components/SelectPicture";
import assetTo64 from "src/utils/assetTo64";
import GenerarPagoCard from "../../components/GenerarPagoCard.vue";

export default {
  components: {
    SelectPicture,
    GenerarPagoCard
  },
  data() {
    return {
      user_creation_form: {
        email: "",
        entry_date: "",
        first_name: "",
        identity_card: "",
        last_name: "",
        payment_type: "",
        phone: "",
        sex: ""
      },
      payment_form: {
        amount: "",
        nombre: "",
        apellido: "",
        email: "",
        cedula: "",
        payment_type: ""
      },
      loading: false,
      isPwd: true,
      picture: null,
      picture_aux: null,
      file: null,
      file_: null,
      dialog_archivo: false,
      dialog_payment: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    async save() {
      if (!this.user_creation_form.id) {
        if (
          !this.$refs.first_name.validate() ||
          !this.$refs.last_name.validate() ||
          !this.$refs.identity_card.validate() ||
          !this.$refs.entry_date.validate() ||
          !this.$refs.email.validate() ||
          !this.$refs.sex.validate() ||
          !this.$refs.phone.validate()
        ) {
          this.loading = false;
          return this.$q.notify({
            message: "Campo requerido",
            color: "negative"
          });
        }

        if (
          !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            this.user_creation_form.email
          )
        ) {
          this.loading = false;
          return this.$q.notify({
            message: "La dirección de correo no es valida",
            color: "negative"
          });
        }

        var filter = {
          where: {
            role: "user",
            email: this.user_creation_form.email
          }
        };
        var validarEmail = await this.$axios.get(
          "usuarios?filter=" + JSON.stringify(filter)
        );
        if (validarEmail.length) {
          this.$q.dialog({
            title: "ALERTA!",
            message:
              '<span class="text-weight-bold text-grey-8">Se a encontrado en el sistema un usuario con la misma dirección de correo que intenta ingresar</span>',
            html: true
          });
          return;
        }

        // COMING SOON
        // var validar = false;
        // if (this.user_creation_form.password && this.user_creation_form.password.length >= 8) {
        //   var mayuscula = false;
        //   var minuscula = false;
        //   var numero = false;
        //   var caracter_raro = false;

        //   for (var i = 0; i < this.user_creation_form.password.length; i++) {
        //     if (
        //       this.user_creation_form.password.charCodeAt(i) >= 65 &&
        //       this.user_creation_form.password.charCodeAt(i) <= 90
        //     ) {
        //       mayuscula = true;
        //     } else if (
        //       this.user_creation_form.password.charCodeAt(i) >= 97 &&
        //       this.user_creation_form.password.charCodeAt(i) <= 122
        //     ) {
        //       minuscula = true;
        //     } else if (
        //       this.user_creation_form.password.charCodeAt(i) >= 48 &&
        //       this.user_creation_form.password.charCodeAt(i) <= 57
        //     ) {
        //       numero = true;
        //     } else {
        //       caracter_raro = true;
        //     }
        //   }
        //   if (
        //     mayuscula == true &&
        //     minuscula == true &&
        //     caracter_raro == true &&
        //     numero == true
        //   ) {
        //     validar = true;
        //   }
        // }
        // if (this.user_creation_form.password && !validar) {
        //   this.loading = false;
        //   return this.$q.notify({
        //     message:
        //       "La Contraseña debe de tener: Mayusculas, Minusculas, caracter especial y numeros",
        //     color: "negative"
        //   });
        // }

        try {
          // GENERATE PASSWORD
          this.user_creation_form.password = this.generateP();

          if (this.picture) await this.savePhoto();
          if (this.file) await this.saveFile();

          this.user_creation_form.role = "user";
          // const {
          //   id: userID,
          //   first_name: userName,
          //   last_name: userLastName,
          //   identity_card,
          //   payment_type
          // } = await this.$axios2
          //   .post("usuarios", { ...this.user_creation_form })
          //   .then(val => {
          //     this.loading = false;
          //     this.$q.notify({
          //       message: "Usuario guardado",
          //       color: "positive"
          //     });

          //     return val;
          //     // this.$router.push("/usuarios");
          //   });
          const payment_obj = {
            nombre: this.user_creation_form.first_name,
            apellido: this.user_creation_form.last_name,
            email: this.user_creation_form.email,
            cedula: this.user_creation_form.identity_card,
            payment_type: this.user_creation_form.payment_type
          };
          this.payment_form = payment_obj;

          this.dialog_payment = true;
        } catch (error) {
          this.loading = false;
          this.$q.notify({
            message: "Ups hubo un error",
            color: "negative"
          });
          console.error(error);
        }
      } else {
        if (
          !this.$refs.first_name.validate() ||
          !this.$refs.last_name.validate() ||
          !this.$refs.identity_card.validate() ||
          !this.$refs.entry_date.validate() ||
          !this.$refs.email.validate() ||
          !this.$refs.sex.validate() ||
          !this.$refs.payment_type.validate() ||
          !this.$refs.phone.validate()
        ) {
          this.loading = false;
          return this.$q.notify({
            message: "Campo requerido",
            color: "negative"
          });
        }

        if (
          !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            this.user_creation_form.email
          )
        ) {
          this.loading = false;
          return this.$q.notify({
            message: "La dirección de correo no es valida",
            color: "negative"
          });
        }

        // COMING SOON
        // var validar = false;
        // if (this.user_creation_form.password && this.user_creation_form.password.length >= 8) {
        //   var mayuscula = false;
        //   var minuscula = false;
        //   var numero = false;
        //   var caracter_raro = false;

        //   for (var i = 0; i < this.user_creation_form.password.length; i++) {
        //     if (
        //       this.user_creation_form.password.charCodeAt(i) >= 65 &&
        //       this.user_creation_form.password.charCodeAt(i) <= 90
        //     ) {
        //       mayuscula = true;
        //     } else if (
        //       this.user_creation_form.password.charCodeAt(i) >= 97 &&
        //       this.user_creation_form.password.charCodeAt(i) <= 122
        //     ) {
        //       minuscula = true;
        //     } else if (
        //       this.user_creation_form.password.charCodeAt(i) >= 48 &&
        //       this.user_creation_form.password.charCodeAt(i) <= 57
        //     ) {
        //       numero = true;
        //     } else {
        //       caracter_raro = true;
        //     }
        //   }
        //   if (
        //     mayuscula == true &&
        //     minuscula == true &&
        //     caracter_raro == true &&
        //     numero == true
        //   ) {
        //     validar = true;
        //   }
        // }
        // if (this.user_creation_form.password && !validar) {
        //   this.loading = false;
        //   return this.$q.notify({
        //     message:
        //       "La Contraseña debe de tener: Mayusculas, Minusculas, caracter especial y numeros",
        //     color: "negative"
        //   });
        // }
        try {
          if (this.picture_aux !== this.user_creation_form.photo)
            await this.savePhoto();
          if (this.file_ !== this.user_creation_form.file)
            await this.saveFile();

          this.user_creation_form.role = "user";
          await this.$axios2
            .patch("usuarios/" + this.user_creation_form.id, {
              ...this.user_creation_form
            })
            .then(val => {
              this.loading = false;
              this.$q.notify({
                message: "Usuario editado",
                color: "positive"
              });
              this.$router.push("/usuarios");
            });
        } catch (error) {
          this.loading = false;
          this.$q.notify({
            message: "Ups hubo un error",
            color: "negative"
          });
        }
      }
    },
    async getUser(id) {
      this.$q.loading.show();
      await this.$axios
        .get("usuarios/" + id, {
          filter: {
            role: "user"
          }
        })
        .then(async val => {
          this.user_creation_form = val;
          if (this.user_creation_form.photo) {
            const logo64 = await assetTo64(
              this.$env.fileUrl + this.user_creation_form.photo
            );
            this.picture = logo64;
            this.picture_aux = logo64;
          }
          if (this.user_creation_form.file) {
            const logo64 = await assetTo64(
              this.$env.fileUrl + this.user_creation_form.file
            );
            this.file = logo64;
            this.file_ = logo64;
          }
          this.$q.loading.hide();
        })
        .catch(e => {
          this.$q.loading.hide();
        });
    },
    clearImg() {
      this.picture = null;
    },
    async getRuta(ruta) {
      this.file_ = ruta;
      this.file = true;
    },
    async uploadFile() {
      this.$q.loading.show();
      await this.$files("files/" + this.file_[0].name)
        .put(this.file_[0])
        .then(async () => {
          await this.$axios
            .post("usuarios/upload_file", {
              file: this.file_[0].name
            })
            .then(res => {})
            .catch(e => {
              this.$q.loading.hide();
              this.$q.notify({
                message: "hubo un error",
                color: "negative"
              });
            });
        })
        .catch(e => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "hubo un error",
            color: "negative"
          });
        });

      this.file = false;
      this.file_ = null;
      this.$q.loading.hide();
    },
    async savePhoto() {
      var ext = this.picture.split("data:image/")[1].split(";")[0];

      var filename =
        "photo" + "-" + this.user_creation_form.identity_card + "." + ext;
      var url = `files/${filename}`;

      var file = this.$base642file(this.picture, filename);
      await this.$files(url).put(file);
      this.user_creation_form.photo = url;

      return true;
    },
    async saveFile() {
      var ext = this.picture.split("data:image/")[1].split(";")[0];

      var filename =
        "documentacion" +
        "-" +
        this.user_creation_form.identity_card +
        "." +
        ext;
      var url = `files/${filename}`;

      var file = this.$base642file(this.file, filename);
      await this.$files(url).put(file);
      this.user_creation_form.file = url;

      return true;
    },
    generateP() {
      var pass = "";
      var str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz0123456789@#$";

      for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);

        pass += str.charAt(char);
      }

      return pass;
    }
  },
  async mounted() {
    if (this.$route.params.id) {
      await this.getUser(this.$route.params.id);
    }
  }
};
</script>
