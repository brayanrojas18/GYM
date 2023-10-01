<template>
  <div>
    <div class="q-pa-xl">
      <q-table
        v-if="datos.length"
        class="table"
        dark
        title="Generar Pagos"
        color="white"
        :data="datos"
        :columns="columns"
        :filter="filter"
        row-key="name"
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
            <q-td key="nombre" :props="props">
              {{ props.row.nombre }}
            </q-td>
            <q-td key="apellido" :props="props">
              {{ props.row.apellido }}
            </q-td>
            <q-td key="payment_type" :props="props">
              {{ props.row.payment_type }}
            </q-td>
            <q-td key="cedula" :props="props">
              {{ props.row.cedula }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="dialog">
      <generar-pago-card
        :payment-data="table_row_data"
        @close-dialog="dialog = false"
      ></generar-pago-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import GenerarPagoCard from "../../components/GenerarPagoCard.vue";

export default {
  components: {
    GenerarPagoCard
  },
  data() {
    return {
      year: this.$moment().year(),
      month: Number(this.$moment().format("M")),
      table_row_data: {
        amount: "",
        amount_ref: "",
        nombre: "",
        apellido: "",
        email: "",
        cedula: "",
        exonerated: false,
        exonerated_date: null,
        entry_date: "",
        payment_type: "",
        user_id: ""
      },
      dialog: false,
      filter: null,
      aja: false,
      datos: [],
      columns: [
        {
          name: "nombre",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.nombre,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "apellido",
          align: "left",
          label: "Apellido",
          field: "apellido",
          sortable: true
        },
        {
          name: "cedula",
          align: "center",
          label: "Cedula",
          field: "cedula",
          sortable: true
        },
        {
          name: "email",
          align: "center",
          label: "Correo",
          field: "email",
          sortable: true
        }
      ],
      desde_hasta: null
    };
  },
  watch: {
    "table_row_data.exonerated_date"(v) {
      this.desde_hasta = v ? v.from + " hasta " + v.to : null;
      this.table_row_data.hasta = v ? v.to : null;
    }
  },
  computed: {
    years() {
      var anhos = [];

      for (var i = this.$moment().year(); i >= 2010; i--) {
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
        .post("pagos/get_users", {
          month: this.month,
          year: this.year
        })
        .then(res => {
          this.datos = res.result;
          this.$q.loading.hide();
        })
        .catch(e => {
          this.$q.loading.hide();
        });
    },
    // async get_user() {
    //   this.$q.loading.show();
    //   await this.$axios2
    //     .post("pagos/get_users", {
    //       month: this.month,
    //       year: this.year
    //     })
    //     .then(res => {
    //       if (res && res.result.length) {
    //         let find = res.result.find(v => v.user_id == this.table_row_data.user_id);
    //         if (find) {
    //           // Add missing properties to 'find' obj
    //           find.payment_in_parts = false;
    //           find.payment_in_parts_data = [
    //             { payment_method: "", ref_num: "", amount: "" }
    //           ];
    //           this.table_row_data = find;
    //         }
    //       }
    //       this.$q.loading.hide();
    //     })
    //     .catch(e => {
    //       this.$q.loading.hide();
    //     });
    // },
    async open(row) {
      console.log(row, "row");
      this.table_row_data = row;
      this.dialog = true;
    }
    // async Pago_total() {
    //   this.$q.loading.show();
    //   var verific = await this.verific_mensualidad();
    //   if (verific) return;
    //   await this.$axios
    //     .post("pagos/automatico", {
    //       usuarios: this.datos,
    //       year: this.year,
    //       month: this.month,
    //       full_pay: this.full_pay,
    //       condominium: this.condominium
    //     })
    //     .then(async res => {
    //       this.datos = res.result;
    //       this.$q.loading.hide();
    //     })
    //     .catch(e => {
    //       this.$q.loading.hide();
    //       this.$q.notify({
    //         message: "hubo un error",
    //         color: "negative"
    //       });
    //     });
    // },
    // async generar() {
    //   if (
    //     this.table_row_data.payment_in_parts &&
    //     this.table_row_data.payment_in_parts_data.length <= 1
    //   ) {
    //     this.$q.notify({
    //       message:
    //         "Para generar un pago por partes se debe agregar más de un método de pago.",
    //       color: "negative"
    //     });
    //     return;
    //   }

    //   if (!this.verify_payment_amounts()) {
    //     this.$q.notify({
    //       message: "El monto pagado es menor al monto del mes",
    //       color: "negative"
    //     });
    //     return;
    //   }

    //   this.$q.loading.show();
    //   if (
    //     !this.$refs.payment_method.validate() ||
    //     (this.table_row_data.payment_method == "transferencia"
    //       ? !this.$refs.num_ref.validate()
    //       : "")
    //   ) {
    //     this.$q.loading.hide();
    //     return this.$q.notify({
    //       message: "Campo requerido",
    //       color: "negative"
    //     });
    //   }

    //   // verificar mensualidad segun mes y año
    //   // var verific = await this.verific_mensualidad();
    //   // if (verific) return;

    //   // verificar pagos generados segun mes y año
    //   var verific_pay = await this.verific_pagos_generados();
    //   if (verific_pay) return;

    //   var verific_amount = await this.verific_monto();
    //   if (verific_amount) return;

    //   await this.$axios
    //     .post("pagos/generar", {
    //       datos: this.table_row_data,
    //       year: this.year,
    //       month: Number(this.month)
    //     })
    //     .then(async res => {
    //       this.$q.loading.hide();
    //       this.$q.notify({
    //         message: "Pago generado exitosamente!",
    //         color: "positive"
    //       });

    //       this.dialog = false;
    //       await this.get();
    //     })
    //     .catch(e => {
    //       this.$q.loading.hide();
    //       this.$q.notify({
    //         message: "hubo un error",
    //         color: "negative"
    //       });
    //     });
    // },
    // async verific_pagos_generados() {
    //   var pagos = await this.$axios2.get("pagos", {
    //     filter: {
    //       usuario: this.table_row_data.user_id
    //     }
    //   });
    //   let pago = pagos.length ? pagos.sort()[pagos.length - 1] : null;
    //   if (
    //     pago &&
    //     this.$moment(pago.hasta) >
    //       this.$moment(`${this.year}-${this.month}-${this.$moment().day()}`)
    //   ) {
    //     this.$q
    //       .dialog({
    //         title: "Atención",
    //         message:
    //           '<span class="text-weight-bold text-body2">Según el mes y año ya se han generados pagos. Si desa volver a generar por favor elimine el anterior</span>',
    //         html: true,
    //         color: "red",
    //         dark: true
    //       })
    //       .onOk(() => {});
    //     this.$q.loading.hide();
    //     return true;
    //   }
    //   return false;
    // },
    // async verific_mensualidad() {
    //   var mensualidad = await this.$axios2.get("mensualidades", {
    //     filter: {
    //       year: this.year,
    //       month: this.month
    //     }
    //   });
    //   if (!mensualidad.length) {
    //     this.$q
    //       .dialog({
    //         title: "Atención",
    //         message:
    //           '<span class="text-weight-bold text-body2">No hay mensualidad configurada según el mes y año escogido</span>',
    //         html: true,
    //         color: "red",
    //         dark: true
    //       })
    //       .onOk(() => {});
    //     this.verific_mensualidad_ = false;
    //     this.year = this.$moment().year();
    //     this.month = Number(this.$moment().format("M"));
    //     this.$q.loading.hide();
    //     return true;
    //   } else {
    //     await this.get_user();
    //     this.verific_mensualidad_ = true;
    //   }
    //   return false;
    // }
    // async verific_monto() {
    //   var some = this.datos.some(v => v.amount == null);
    //   if (some) {
    //     this.$q.loading.hide();
    //     this.$q.notify({
    //       message:
    //         'Por favor asegurese que los usuarios no tengan el campo "Monto" vacío',
    //       color: "negative"
    //     });
    //     return true;
    //   }
    //   return false;
    // },

    // // Verify if the amounts in parts payments is enough to pay the day/week/month amount
    // verify_payment_amounts() {
    //   if (!this.table_row_data.payment_in_parts) {
    //     const paid_amount = this.table_row_data.paid_amount;
    //     return paid_amount >= this.table_row_data.amount;
    //   }

    //   const paid_amount = this.table_row_data.payment_in_parts_data.reduce(
    //     (prev, current) => {
    //       return prev + current.amount;
    //     },
    //     0
    //   );

    //   return paid_amount >= this.table_row_data.amount;
    // }
  },
  async mounted() {
    await this.get();
  }
};
</script>
