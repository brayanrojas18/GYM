<template>
  <q-layout id="fondo-login" class="flex flex-start row" view="lHh Lpr lFf">
    <div class="items-center column col-6 q-mt-lg  q-ml-xl">
      <div>
        <img src="/logo-text.png" style="width: 18vw" />
      </div>
      <q-card class="column q-mt-md  card-loig" style="width: 400px">
        <q-card-section class="column  q-gutter-md q-mt-xs">
          <div>
            <q-input
              @keyup.enter="Login()"
              borderless
              dark
              type="email"
              color="white"
              style="border: 1px solid #ea0133"
              v-model="email"
              label="Email"
            >
              <template v-slot:prepend>
                <q-icon name="person" size="md" color="white" class="q-ml-xs" />
              </template>
            </q-input>
          </div>
          <div>
            <q-input
              @keyup.enter="Login()"
              borderless
              dark
              :type="isPwd ? 'password' : 'text'"
              color="white"
              style="border: 1px solid #ea0133"
              v-model="password"
              label="Contraseña"
            >
              <template v-slot:prepend>
                <q-icon
                  name="vpn_key"
                  size="md"
                  color="white"
                  class="q-ml-xs"
                />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-mb-md q-mt-lg ">
          <q-btn id="btn" @click="Login" :loading="loading" style="width: 40%">
            <div class="text-center text-weight-bolder">
              ENTRAR
            </div>
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      email: null,
      password: null,
      isPwd: true
    };
  },
  computed: {
    ...mapState("example", ["user"])
  },
  methods: {
    ...mapMutations("example", ["token", "setUser"]),
    ...mapActions("example", ["getUser"]),
    async Login() {
      this.loading = true;

      const credentials = {
        email: this.email,
        password: this.password
      };

      const promise = this.$axios.post("usuarios/login?", credentials);
      promise.catch(e => {
        this.loading = false;
        this.$q.notify({
          message: "Esta cuenta no existe, o verifica tu conexión",
          type: "negative"
        });
      });
      promise.then(response => {
        this.token(response);
        this.getUser(response.userId).then(async res => {
          this.$q.sessionStorage.set("userData", res);
          this.$q.sessionStorage.set("user", response);
          this.setUser(res);

          // if (res.role == "admin-general") {
          //   this.$router.push("/admin");
          //   this.loading = false;
          // }
          // if (res.role == "admin") {
          //   this.$router.push("/dashboard");
          // }

          this.$router.push("/dashboard");

          this.saludo(res);
        });
      });
    },
    saludo(user) {
      var fecha = new Date();
      var hora = fecha.getHours();
      var texto = "";
      var icon;

      if (hora >= 0 && hora < 12) {
        texto = "Buenos Días";
        icon = "wb_sunny";
      }

      if (hora >= 12 && hora < 18) {
        texto = "Buenas Tardes";
        icon = "brightness_4";
      }

      if (hora >= 18 && hora < 24) {
        texto = "Buenas Noches";
        icon = "nightlight";
      }

      this.$q.notify({
        message: texto + " " + user.first_name + " " + user.last_name,
        color: "positive",
        icon: icon,
        position: "bottom-left"
      });
    },
    async New() {
      this.$q
        .dialog({
          title: "Enviar contraseña por correo",
          message: "Por favor escriba su email",
          prompt: {
            model: "",
            type: "email",
            isValid: val => val.length > 0
          },
          cancel: true,
          persistent: true
        })
        .onOk(async data => {
          var filter = {
            where: {
              role: "user",
              email: data
            }
          };
          var validarEmail = await this.$axios.get(
            "usuarios?filter=" + JSON.stringify(filter)
          );
          if (!validarEmail.length) {
            this.$q.dialog({
              title: "ERROR ENCONTRADO :(",
              message:
                '<span class="text-weight-bold text-grey-8">Según el email ingresado no se encuentra usuario con el mismo. Por favor ingrese la dirección de correo que le haya sido creada o cargada. En caso de no saberla comuniquese con su</span> <strong>ADMINISTRADOR</strong>',
              html: true
            });
          } else {
            this.$axios
              .post("request-password-reset?email=" + data, {
                email: data
              })
              .then(res => {
                this.$q.dialog({
                  title: "Clave enviada",
                  message: "Revise su email y siga las instrucciones"
                });
              });
          }
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
  },
  mounted() {
    if (
      this.$route.path == "/login" &&
      this.$q.sessionStorage.has("userData")
    ) {
      this.$q.sessionStorage.remove("userData");
      this.$q.sessionStorage.remove("user");
      if (!close) window.location.reload(false);
    }
  }
};
</script>

<style type="text/css">
#fondo-login {
  background-image: url("/background-login.jpg");
  background-size: 100% 100%;
  background-position: center;
}
#btn {
  border-radius: 10px;
  background: #ea0133;
  color: #ffffff;
}
.card-loig {
  border: 1px solid #ea0133;
  background: linear-gradient(
    100deg,
    rgba(10, 17, 27, 0.8),
    rgba(46, 47, 52, 0.8)
  );
}
</style>
