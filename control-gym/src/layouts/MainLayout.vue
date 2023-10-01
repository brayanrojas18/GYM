<template>
  <q-layout view="lHh Lpr lFf" id="fondo">
    <q-header class="transparent">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bolder">
          Jay Cutler GYM
        </q-toolbar-title>

        <div>
          <q-btn color="white" flat round icon="fas fa-ellipsis-v">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="logout()">
                  <q-item-section>Cerrar Sesión</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :breakpoint="500"
      :mini="mini"
      content-class="drawer"
      class="text-white"
    >
      <q-scroll-area class="fit">
        <div class="text-right">
          <q-btn
            color="white"
            flat
            :icon="
              !mini ? 'fas fa-angle-double-left' : 'fas fa-angle-double-right'
            "
            @click="mini = !mini"
          />
        </div>

        <div
          :class="{
            'q-px-md': !mini,
            'q-pb-md': !mini,
            'q-mx-xl': !mini,
            'q-pa-xs': mini,
            'q-mx-sm': mini
          }"
          class="q-pt-none q-mt-none"
          :style="{ borderRadius: mini ? '3px' : '10px' }"
        >
          <q-img src="/logo-text.png" ratio="1" contain />
        </div>
        <q-separator size="2px" style="background: #0a111b; " />

        <q-list class="q-mt-md">
          <q-item
            clickable
            v-ripple
            active-class="bg-white building"
            exact
            to="/dashboard"
          >
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section class="q-pl-sm">
              Inicio
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            active-class="bg-white building"
            exact
            to="/usuarios"
          >
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section class="q-pl-sm">
              Usuarios
            </q-item-section>
          </q-item>
          <q-expansion-item
            expand-separator
            icon="fas fa-cog"
            label="Configuración"
            expand-icon-class="text-white"
          >
            <q-list>
              <!-- <q-item
                clickable
                v-ripple
                active-class="bg-white building"
                exact
                to="/configuracion/cargas-masivas"
              >
                <q-item-section avatar>
                  <q-icon name="backup" />
                </q-item-section>
                <q-item-section class="q-pl-sm">
                  Cargas Masivas
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                active-class="bg-white building"
                exact
                to="/configuracion/condominio"
              >
                <q-item-section avatar>
                  <q-icon name="apartment" />
                </q-item-section>
                <q-item-section class="q-pl-sm">
                  Condominio
                </q-item-section>
              </q-item> -->
              <q-item
                clickable
                v-ripple
                active-class="bg-white building"
                exact
                to="/configuracion/mensualidades"
              >
                <q-item-section avatar>
                  <q-icon name="payments" />
                </q-item-section>
                <q-item-section class="q-pl-sm">
                  Mensualidades
                </q-item-section>
              </q-item>
              <q-separator inset dark />
            </q-list>
          </q-expansion-item>
          <q-expansion-item
            expand-separator
            icon="paid"
            label="Pagos"
            expand-icon-class="text-white"
          >
            <q-list>
              <q-item
                clickable
                v-ripple
                active-class="bg-white building"
                exact
                to="/pagos/generar"
              >
                <q-item-section avatar>
                  <q-icon name="attach_money" />
                </q-item-section>
                <q-item-section class="q-pl-sm">
                  Generar pagos
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                active-class="bg-white building"
                exact
                to="/pagos/listado"
              >
                <q-item-section avatar>
                  <q-icon name="assignment" />
                </q-item-section>
                <q-item-section class="q-pl-sm">
                  Pagos generados
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                active-class="bg-white building"
                exact
                to="/pagos/adelantos"
              >
                <q-item-section avatar>
                  <q-icon name="request_quote" />
                </q-item-section>
                <q-item-section class="q-pl-sm">
                  Adelantos
                </q-item-section>
              </q-item>
              <!-- <q-item
                clickable
                v-ripple
                active-class="bg-white building"
                exact
                to="/pagos/Deudas"
              >
                <q-item-section avatar>
                  <q-icon name="money_off" />
                </q-item-section>
                <q-item-section class="q-pl-sm">
                  Deudas
                </q-item-section>
              </q-item> -->
              <q-separator inset dark />
            </q-list>
          </q-expansion-item>
          <q-item
            clickable
            v-ripple
            active-class="bg-white building"
            exact
            to="/reportes"
          >
            <q-item-section avatar>
              <q-icon name="file_download" />
            </q-item-section>
            <q-item-section class="q-pl-sm">
              Reportes
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "MainLayout",
  data(close = false) {
    return {
      drawer: true,
      mini: false
    };
  },
  computed: {
    ...mapState("example", ["user"])
  },
  methods: {
    async logout() {
      this.$q.sessionStorage.remove("userData");
      this.$q.sessionStorage.remove("user");
      this.$router.push("/login");
      if (!close) window.location.reload(false);
    }
  }
};
</script>

<style type="text/css">
#fondo {
  background-image: url("/background.jpg");
  background-size: 100% 100%;
  background-position: center;
}
.drawer {
  border: 1px solid #ea0133;
  background: linear-gradient(0.25turn, #0a111b, #2e2f34);
}
</style>
