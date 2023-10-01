<template>
  <div>
    <div class="q-pa-xl">
      <div class="q-pb-md">
        <q-btn
          label="Nueva Mensualidad"
          @click="crear = true"
          outline
          color="white"
          icon="add"
          :disable="user.role !== 'admin-general'"
        />
      </div>
      <q-table
        class="table"
        title="Mensualidades"
        :data="data"
        :columns="columns"
        :filter="filter"
        row-key="name"
        color="white"
        dark
      >
        <template v-slot:top-right>
          <q-input
            dark
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <q-icon slot="append" name="search" />
          </q-input>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="amount" :props="props"> {{ props.row.amount }}$ </q-td>
            <q-td key="month" :props="props">
              {{ props.row.month }}
            </q-td>
            <q-td key="year" :props="props">
              {{ props.row.year }}
            </q-td>
            <q-td key="type" :props="props">
              {{ types.find(v => v.value == props.row.type).label }}
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn
                color="white"
                outline
                label="Editar"
                size="sm"
                :disable="user.role !== 'admin-general'"
                @click="editar(props.row)"
              >
                <q-tooltip content-class="color-orange">Editar</q-tooltip>
              </q-btn>
              <q-btn
                color="white"
                outline
                label="Ver"
                size="sm"
                :disable="user.role !== 'admin-general'"
                @click="ver(props.row)"
              >
                <q-tooltip content-class="color-orange">Ver</q-tooltip>
              </q-btn>
              <q-btn
                color="white"
                outline
                label="Eliminar"
                size="sm"
                :disable="user.role !== 'admin-general'"
                @click="eliminar(props.row)"
              >
                <q-tooltip content-class="color-orange">Eliminar</q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="crear" persistent>
      <q-card class="dialog" style="width: 20%">
        <q-btn
          flat
          round
          icon="reply"
          color="white"
          @click="(form = {}), (show = false)"
          v-close-popup
          class="q-ml-xs q-mt-xs"
        />
        <q-card-section class="items-center">
          <q-select
            :readonly="show"
            v-model="form.year"
            label="Año"
            type="number"
            ref="year"
            :options="years"
            :rules="[val => !!val || 'campo requerido']"
            color="white"
            dark
            map-options
            emit-value
          />
          <q-select
            :readonly="show"
            v-model="form.month"
            label="Mes"
            ref="month"
            :options="[
              { label: 'Enero', value: 1 },
              { label: 'Febrero', value: 2 },
              { label: 'Marzo', value: 3 },
              { label: 'Abril', value: 4 },
              { label: 'Mayo', value: 5 },
              { label: 'Junio', value: 6 },
              { label: 'Julio', value: 7 },
              { label: 'Agosto', value: 8 },
              { label: 'Septiembre', value: 9 },
              { label: 'Octubre', value: 10 },
              { label: 'Noviembre', value: 11 },
              { label: 'Diciembre', value: 12 }
            ]"
            :rules="[val => !!val || 'campo requerido']"
            color="white"
            dark
            map-options
            emit-value
          />
          <q-input
            :readonly="show"
            v-model="form.amount"
            prefix="$"
            label="Mensualidad del mes"
            ref="amount"
            :rules="[val => !!val || 'campo requerido']"
            color="white"
            type="number"
            dark
          />
          <q-select
            :readonly="show"
            v-model="form.type"
            label="Tipo"
            ref="type"
            :options="types"
            :rules="[val => !!val || 'campo requerido']"
            color="white"
            dark
            map-options
            emit-value
          />
        </q-card-section>

        <q-card-actions v-if="!show">
          <q-btn
            outline
            label="Guardar"
            color="white"
            class="full-width"
            @click="create"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      crear: false,
      show: false,
      filter: null,
      form: {
        year: this.$moment().year(),
        month: Number(this.$moment().format("MM"))
      },
      data: [],
      types: [
        { label: "Diario", value: "dia" },
        { label: "Semanal", value: "semana" },
        { label: "Mensual", value: "mensual" }
      ],
      columns: [
        {
          name: "amount",
          required: true,
          label: "Monto",
          align: "left",
          field: row => row.amount,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "month",
          align: "center",
          label: "Mes",
          field: "month",
          sortable: true
        },
        {
          name: "year",
          align: "center",
          label: "Año",
          field: "year",
          sortable: true
        },
        {
          name: "type",
          align: "right",
          label: "Tipo",
          field: "type",
          sortable: true
        },
        { name: "actions", align: "right", label: "Acciones", sortable: true }
      ]
    };
  },
  watch: {},
  computed: {
    ...mapState("example", ["user"]),
    years() {
      var anhos = [];

      for (var i = this.$moment().year(); i >= 2000; i--) {
        anhos.push({
          label: i,
          value: i
        });
      }

      return anhos;
    }
  },
  methods: {
    async get() {
      this.$q.loading.show();
      await this.$axios2
        .get("mensualidades")
        .then(val => {
          this.data = val;
          this.data.sort(function(a, b) {
            return a.year - b.year;
          });
          this.$q.loading.hide();
        })
        .catch(e => {
          this.$q.loading.hide();
        });
    },
    async create() {
      this.$q.loading.show();
      if (
        !this.$refs.year.validate() ||
        !this.$refs.month.validate() ||
        !this.$refs.amount.validate() ||
        !this.$refs.type.validate()
      ) {
        this.$q.loading.hide();
        return this.$q.notify({
          message: "Campo requerido",
          color: "negative"
        });
      }

      var mensualidad = this.data.find(
        v =>
          v.year == this.form.year &&
          v.month == this.form.month &&
          v.type == this.form.type
      );
      if (!this.form.id && mensualidad) {
        this.$q.loading.hide();
        return this.$q.notify({
          message:
            'Ya se ha guardado una mensualidad segun el "Año", "Mes" y "Tipo" ',
          color: "orange"
        });
      }

      var axios;
      if (this.form.id)
        axios = this.$axios2.put("mensualidades/" + this.form.id, this.form);
      else axios = this.$axios2.post("mensualidades", this.form);
      await axios
        .then(async val => {
          await this.get();
          this.crear = false;
          this.form = {};
          this.$q.notify({
            message: `Mensualidad ${this.form.id ? "Modificada" : "Guardada"}`,
            color: "positive"
          });
          this.$q.loading.hide();
        })
        .catch(e => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "Ups hubo un error",
            color: "negative"
          });
        });
    },
    async editar(row) {
      var pago = await this.pagos_generados(row);
      if (pago) return;

      await this.$axios2.get("mensualidades/" + row.id).then(val => {
        this.form = val;
        this.crear = true;
      });
    },
    async ver(row) {
      this.form = row;
      this.crear = true;
      this.show = true;
    },
    async eliminar(row) {
      var pago = await this.pagos_generados(row);
      if (pago) return;

      this.$q
        .dialog({
          title: "Eliminar",
          message: "¿Segúro que quiere eliminar esta mensualidad?",
          cancel: "Cancelar",
          persistent: true
        })
        .onOk(async () => {
          await this.$axios2
            .delete("mensualidades/" + row.id)
            .then(async val => {
              this.$q.notify({
                message: "Mensualidad Eliminada",
                color: "positive"
              });
              await this.get();
            })
            .catch(e => {
              this.loading = false;
              this.$q.notify("Ups hubo un error");
            });
        })
        .onCancel(() => {});
    },
    async pagos_generados(row) {
      var pagos = await this.$axios2.get("pagos", {
        filter: {
          year: row.year,
          month: row.month
        }
      });
      if (pagos.length) {
        this.$q
          .dialog({
            title: "Atención",
            message:
              '<span class="text-weight-bold text-body2">Según el mes y año ya se han generados pagos, por lo tanto no se puede editar ni eliminar esta mensualidad. Si desea editar o eliminar elimine el pago realizado</span>',
            html: true
          })
          .onOk(() => {});
        return true;
      }
      return false;
    }
  },
  async mounted() {
    await this.get();
  }
};
</script>

<style type="text/css"></style>
