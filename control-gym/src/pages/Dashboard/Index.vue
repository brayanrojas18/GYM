<template>
  <div class="flex flex-center column ">
    <div
      class="text-weight-bolder text-h2 text-white text-center q-mt-xl q-mb-xl"
    >
      BUSCAR USUARIO
    </div>
    <!-- <div
      id="div"
      class="q-pa-md q-mx-md row justify-center items-start q-gutter-md"
    >
      <q-card id="tarjeta" class="col">
        <q-card-section class="row q-gutter-md">
          <q-avatar
            size="80px"
            font-size="52px"
            color="teal"
            text-color="white"
            icon="house"
          />
          <div>
            <div class="text-weight-bolder text-h6">
              Total Usuarios
            </div>
            <div class="text-subtitle1 text-weight-bolder">
              {{ this.data.total }}
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card id="tarjeta" class="col">
        <q-card-section class="row q-gutter-md">
          <q-avatar
            size="80px"
            font-size="52px"
            color="positive"
            text-color="white"
            icon="attach_money"
          />
          <div>
            <div class="text-weight-bolder text-h6">
              Total Solventes
            </div>
            <div class="text-weight-bolder">
              Mes Actual
            </div>
            <div class="text-subtitle1">
              {{ this.data.total }}
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card id="tarjeta" class="col">
        <q-card-section class="row q-gutter-md">
          <q-avatar
            size="80px"
            font-size="52px"
            color="negative"
            text-color="white"
            icon="money_off"
          />
          <div>
            <div class="text-weight-bolder text-h6">
              Total Deudores
            </div>
            <div class="text-weight-bolder">
              Mes Actual
            </div>
            <div class="text-subtitle1">
              {{ this.data.total }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div> -->
    <!-- <div class="absolute-bottom-right q-mb-md q-mr-md">
      <q-btn
        flat
        round
        icon="search"
        style="background-color: #ea0133;"
        color="white"
        size="xl"
        @click="dialog = true"
      />
    </div> -->
    <!-- <q-dialog v-model="dialog" @hide="search = null">
      <q-card class="dialog" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-weight-bold text-center">Buscar Usuario</div>
        </q-card-section>

        <q-card-section align="center" class="q-pt-none">
          <q-input
            label="Buscar"
            dark
            color="white"
            style="width: 200px"
            v-model="search"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            flat
            label="Buscar"
            color="white"
            @click="buscar"
            :disable="!search ? true : false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
    <q-card class="dialog q-mt-md" style="width: 600px">
      <q-card-section>
        <div class="text-h6 text-weight-bold text-center">
          Ingresar Cédula de Identidad
        </div>
      </q-card-section>

      <q-card-section align="center" class="q-pt-none">
        <q-input
          label="Buscar"
          dark
          color="white"
          style="width: 250px"
          v-model="search"
        />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          flat
          label="Buscar"
          color="white"
          @click="buscar"
          :disable="!search ? true : false"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      rows: [],
      data: {
        total: null
      },
      dialog: false,
      search: null
    };
  },
  computed: {
    ...mapState("example", ["user"])
  },
  methods: {
    async get() {
      this.$q.loading.show();
      await this.$axios2
        .get("usuarios")
        .then(val => {
          if (val.length) {
            this.rows = val.filter(v => v.role == "user");
          }
          this.$q.loading.hide();
        })
        .catch(e => {
          this.$q.loading.hide();
        });
    },
    Dashboard() {
      this.data.total = this.rows.length ? this.rows.length : 0;
    },
    async buscar() {
      let res = await this.$axios2.post("usuarios/get_user", {
        identity_card: this.search
      });
      if (res.result == "active")
        this.$q.notify({
          message: "Usuario Activo",
          color: "positive"
        });
      if (res.result == "inactive")
        this.$q.notify({
          message: "Usuario Inactivo",
          color: "negative"
        });
      if (res.result == "exonerated")
        this.$q.notify({
          message: "Usuario Exonerado",
          color: "primary"
        });
      if (res.result == "not-exist")
        this.$q.notify({
          message: "Usuario no resgitrado",
          color: "negative"
        });
    }
  },
  async mounted() {
    await this.get();
    await this.Dashboard();
  }
};
</script>

<style type="text/css">
#tarjeta {
  background: linear-gradient(
    0.25turn,
    rgba(10, 17, 27, 0.5),
    rgba(46, 47, 52, 0.5)
  );
  color: #ffffff;
  border-radius: 10px;
  width: 300px;
}
#div {
  margin-top: 5px;
  border-radius: 20px;
  background: linear-gradient(0.25turn, #0a111b, #2e2f34);
}
</style>
