<template>
  <div>
    <div class="q-pa-xl">
      <q-table
        class="table"
        dark
        color="white"
        :data="datos"
        :columns="columns"
        :filter="filter"
        row-key="name"
        title="Pagos Generados"
        :pagination="{ rowsPerPage: 25 }"
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
          <q-tr @click="open(props.row)" :props="props" class="cursor-pointer">
            <q-td key="year" :props="props">
              {{ props.row.year }}
            </q-td>
            <q-td key="month" :props="props">
              {{ props.row.month }}
            </q-td>
            <q-td key="nombre" :props="props">
              {{ props.row.nombre + " " + props.row.apellido }}
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ $moment(props.row.createdAt).format("YYYY-MM-DD") }}
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn
                color="white"
                outline
                label="Ver"
                size="sm"
                @click="open(props.row)"
              >
                <q-tooltip content-class="color-orange">Ver</q-tooltip>
              </q-btn>
              <q-btn
                color="white"
                outline
                label="Eliminar"
                size="sm"
                @click="remove(props.row.id)"
              >
                <q-tooltip content-class="color-orange">Eliminar</q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="dialog">
      <q-card class="card" style="width: 50%">
        <q-card-section class="text-center text-weight-bolder text-white">
          <div class="text-h6">
            {{ form.nombre + " " + form.apellido }}
          </div>
          <div class="text-title">
            {{ form.cedula }}
          </div>
        </q-card-section>
        <q-card-section class="justify-center q-gutter-md">
          <div class="q-pb-xs row justify-center q-gutter-md">
            <div>
              <q-input
                style="width: 200px"
                v-model="form.year"
                label="Año"
                type="number"
                color="white"
                dark
                readonly
              />
            </div>
            <div>
              <q-select
                style="width: 200px"
                v-model="form.month"
                label="Mes"
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
                color="white"
                dark
                map-options
                emit-value
                readonly
              />
            </div>
            <div>
              <q-input
                style="width: 200px"
                v-model="form.amount"
                prefix="$"
                label="Monto del mes"
                color="white"
                type="number"
                dark
                class="col-md-3 col-xs-12"
                readonly
              />
            </div>
            <div>
              <q-input
                style="width: 200px"
                v-model="form.payment_type"
                label="Tipo de pago"
                color="white"
                dark
                class="col-md-3 col-xs-12"
                readonly
              />
            </div>
            <div>
              <q-select
                style="width: 200px"
                v-model="form.payment_method"
                label="Metodo de pago"
                ref="payment_method"
                :options="[
                  { label: 'Divisas', value: 'divisa' },
                  { label: 'Transferencia/Pago Móvil', value: 'transferencia' },
                  { label: 'Punto de venta', value: 'Punto' },
                  { label: 'BsF Efectivo', value: 'bolivares' }
                ]"
                :rules="[val => !!val || 'campo requerido']"
                color="white"
                dark
                map-options
                emit-value
                readonly
              />
            </div>
            <div v-if="form.payment_method == 'transferencia'">
              <q-input
                style="width: 200px"
                ref="num_ref"
                :rules="[val => !!val || 'campo requerido']"
                v-model="form.num_ref"
                label="Nº Referencia"
                color="white"
                dark
                readonly
              />
            </div>
            <div class="column">
              <q-checkbox
                v-model="form.exonerated"
                dark
                label="Exonerado"
                color="grey-8"
                disable
              />
              <q-input
                style="width: 200px"
                dark
                color="white"
                v-model="desde_hasta"
                v-if="form.exonerated"
                readonly
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      filter: null,
      datos: [],
      columns: [
        {
          name: "year",
          required: true,
          label: "Año",
          align: "left",
          field: row => row.year,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "month",
          required: true,
          label: "Mes",
          align: "center",
          field: "month",
          sortable: true
        },
        {
          name: "nombre",
          required: true,
          label: "Cliente",
          align: "center",
          field: "nombre",
          sortable: true
        },
        {
          name: "createdAt",
          required: true,
          label: "Fecha de creación",
          align: "center",
          field: "createdAt",
          sortable: true
        },
        {
          name: "actions",
          align: "right",
          label: "Acciones",
          field: "actions",
          sortable: true
        }
      ],
      dialog: false,
      form: {},
      desde_hasta: null
    };
  },
  watch: {
    "form.exonerated_date"(v) {
      this.desde_hasta = v.from + " hasta " + v.to;
    }
  },
  methods: {
    async get() {
      this.$q.loading.show();
      await this.$axios2
        .get("pagos")
        .then(res => {
          this.datos = res;
          this.$q.loading.hide();
        })
        .catch(e => {
          this.$q.loading.hide();
        });
    },
    async remove(id) {
      this.$q
        .dialog({
          title: "Eliminar",
          message: "¿Segúro que quiere eliminar este pago?",
          cancel: "Cancelar",
          persistent: true,
          dark: true,
          color: "red"
        })
        .onOk(async () => {
          this.$q.loading.show();
          await this.$axios2
            .delete("pagos/" + id)
            .then(async res => {
              await this.get();
              this.$q.loading.hide();
            })
            .catch(e => {
              this.$q.loading.hide();
            });
        })
        .onCancel(() => {});
    },
    open(row) {
      this.dialog = true;
      this.form = row;
    }
  },
  async mounted() {
    await this.get();
  }
};
</script>
