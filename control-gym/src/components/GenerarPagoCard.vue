<template>
  <q-card class="card q-mx-auto" style="width: 50%">
    <form @submit.prevent.stop="generar">
      <q-card-section class="text-center text-weight-bolder text-white">
        <div class="text-h6">
          {{ form.nombre + " " + form.apellido }}
        </div>
        <div class="text-title">
          {{ form.cedula }}
        </div>
      </q-card-section>
      <q-card-section class="justify-center q-gutter-md">
        <div class="q-pb-xs row justify-center q-gutter-x-md">
          <div>
            <q-select
              style="width: 150px"
              v-model="year"
              label="Año"
              type="number"
              ref="year"
              :options="years"
              :rules="[val => !!val || 'campo requerido']"
              color="white"
              dark
              map-options
              emit-value
              @input="verific_mensualidad"
            />
          </div>
          <div>
            <q-select
              style="width: 150px"
              v-model="month"
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
              @input="verific_mensualidad"
            />
          </div>
          <div>
            <q-select
              style="width: 150px"
              v-model="day"
              label="Día"
              ref="day"
              :options="days"
              :rules="[val => !!val || 'campo requerido']"
              color="white"
              dark
              map-options
              emit-value
            />
          </div>

          <div>
            <q-select
              style="width: 150px"
              v-model="form.payment_type"
              label="Tipo de pago"
              ref="payment_type"
              :options="[
                { label: 'Diario', value: 'dia' },
                { label: 'Semanal', value: 'semana' },
                { label: 'Mensual', value: 'mensual' }
              ]"
              :rules="[val => !!val || 'campo requerido']"
              color="white"
              dark
              map-options
              emit-value
              @input="autoAmount"
            />
          </div>
          <div>
            <q-input
              style="width: 150px"
              v-model="form.amount_ref"
              prefix="$"
              label="Monto segun el més, año y tipo"
              color="white"
              type="number"
              dark
              readonly
              class="col-md-3 col-xs-12"
            />
          </div>

          <div class="row full-width justify-evenly">
            <div class="column">
              <q-checkbox
                v-model="form.exonerated"
                color="grey-8"
                dark
                label="Exonerado"
              />
              <q-input
                style="width: 150px"
                dark
                color="white"
                v-model="desde_hasta"
                v-if="form.exonerated"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="form.exonerated_date"
                        class="dialog"
                        color="grey-8"
                        range
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
          </div>

          <div>
            <div class="row q-gutter-x-sm no-wrap">
              <q-select
                class="col"
                style="width: 150px"
                v-model="form.payment_method"
                label="Método de pago"
                ref="payment_method"
                :options="payment_methods_options"
                :rules="[val => !!val || 'campo requerido']"
                color="white"
                dark
                map-options
                emit-value
                :disable="form.exonerated"
              />

              <q-input
                v-if="form.payment_method == 'transferencia'"
                class="col"
                ref="num_ref"
                :rules="[val => !!val || 'campo requerido']"
                v-model="form.num_ref"
                label="Nº Referencia"
                color="white"
                dark
                :disable="form.exonerated"
              />

              <q-input
                class="col"
                :rules="[val => !!val || 'campo requerido']"
                v-model.number="form.amount"
                label="Monto"
                color="white"
                dark
                ref="payment_amount"
                type="number"
                :disable="form.exonerated"
              />
            </div>
          </div>
        </div>
        <q-card-actions align="center">
          <q-btn
            label="generar"
            outline
            color="white"
            style="width: 150px"
            type="submit"
            :disable="!verific_mensualidad_"
          />
          <!-- @click="generar" -->
        </q-card-actions>
      </q-card-section>
    </form>
  </q-card>
</template>

<script>
export default {
  props: {
    paymentData: { type: Object },
    userCreationData: Object,
    isNewUser: { type: Boolean, default: false }
  },
  data() {
    return {
      year: this.$moment().year(),
      month: Number(this.$moment().format("M")),
      day: Number(this.$moment().format("DD")),
      form: {
        payment_data: { payment_method: "", ref_num: "", amount: "" },
        /* Data that could be replaced by 'paymentData' prop */
        amount: 0,
        amount_ref: 0,
        nombre: "",
        apellido: "",
        email: "",
        cedula: "",
        exonerated: false,
        exonerated_date: null,
        entry_date: "",
        payment_type: "",
        user_id: "",

        ...this.paymentData
      },
      payment_methods_options: [
        { label: "Divisas", value: "divisa" },
        { label: "Transferencia/Pago Móvil", value: "transferencia" },
        { label: "Punto de venta", value: "punto" },
        { label: "BsF Efectivo", value: "bolivares" }
      ],
      verific_mensualidad_: true,
      desde_hasta: null
    };
  },
  watch: {
    "form.exonerated_date"(v) {
      this.desde_hasta = v ? v.from + " hasta " + v.to : null;
      this.form.hasta = v ? v.to : null;
    }
  },
  methods: {
    async generar() {
      if (this.validate_payment_inputs()) {
        this.$q.notify({
          message: "Por favor llene todos los campos para generar el pago",
          color: "negative"
        });
        return;
      }

      this.$q.loading.show();
      if (this.isNewUser) this.createNewUser();

      /* verificar mensualidad segun mes y año */
      var verific = await this.verific_mensualidad();
      if (verific) return;

      /* verificar pagos generados segun mes y año */
      var verific_pay = await this.verific_pagos_generados();
      if (verific_pay) return;

      console.log(this.form, "form");
      await this.$axios
        .post("pagos/generar", {
          datos: this.form,
          year: this.year,
          month: Number(this.month),
          day: Number(this.day)
        })
        .then(async res => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "Pago generado exitosamente!",
            color: "positive"
          });

          this.$emit("close-dialog");

          if (this.isNewUser) this.$router.push("/usuarios");
        })
        .catch(e => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "hubo un error",
            color: "negative"
          });
        });
    },
    async get_user() {
      this.$q.loading.show();
      await this.$axios2
        .post("pagos/get_users", {
          month: this.month,
          year: this.year
        })
        .then(res => {
          if (res && res.result.length) {
            let find = res.result.find(v => v.user_id == this.form.user_id);
            if (find) {
              this.form = find;
            }
          }
          this.$q.loading.hide();
        })
        .catch(e => {
          this.$q.loading.hide();
        });
    },
    async verific_mensualidad() {
      var mensualidad = await this.$axios2.get("mensualidades", {
        filter: {
          year: this.year,
          month: this.month,
          type: this.form.payment_type
        }
      });
      if (!mensualidad.length) {
        this.$q
          .dialog({
            title: "Atención",
            message:
              '<span class="text-weight-bold text-body2">No hay mensualidad configurada según el mes, año y tipo escogido</span>',
            html: true,
            color: "red",
            dark: true
          })
          .onOk(() => {});
        this.verific_mensualidad_ = false;
        this.year = this.$moment().year();
        this.month = Number(this.$moment().format("M"));
        this.form.payment_type = null;
        this.$q.loading.hide();
        return true;
      } else {
        this.verific_mensualidad_ = true;
      }
      return false;
    },
    async verific_pagos_generados() {
      var pagos = await this.$axios2.get("pagos", {
        filter: {
          usuario: this.form.user_id,
          fecha_pago: this.$moment(
            `${this.year}-${this.month}-${this.day}`
          ).format("YYYY-MM-DD")
        }
      });
      let pago = pagos.length ? true : false;
      if (pago) {
        this.$q
          .dialog({
            title: "Atención",
            message:
              '<span class="text-weight-bold text-body2">Según el mes, año y día ya se han generados pagos. Si desa volver a generar por favor elimine el anterior</span>',
            html: true,
            color: "red",
            dark: true
          })
          .onOk(() => {});
        this.$q.loading.hide();
        return true;
      }
      return false;
    },
    async createNewUser() {
      this.$q.loading.show();
      const { id } = await this.$axios2
        .post("usuarios", { ...this.userCreationData })
        .then(val => {
          this.$q.notify({
            message: "Usuario guardado",
            color: "positive"
          });
          this.$q.loading.hide();
          return val;
          // this.$router.push("/usuarios");
        });
      this.form.user_id = id;
    },
    validate_payment_inputs() {
      if (!this.form.payment_in_parts) {
        let paymentInputs = [
          this.$refs.payment_method.validate(),
          this.$refs.payment_amount.validate()
        ];

        if (this.$refs.num_ref !== undefined) {
          paymentInputs.push(this.$refs.num_ref.validate());
        }

        return paymentInputs.includes(false);
      }

      const amountInputs = this.$refs.payment_amount_in_parts_payment.map(el =>
        el.validate()
      );
      const paymentMethodInputs = this.$refs.payment_method_in_parts_payment.map(
        el => el.validate()
      );

      let refNumInputs = [];
      if (this.$refs.num_ref_in_parts_payment !== undefined) {
        refNumInputs = this.$refs.num_ref_in_parts_payment.map(el =>
          el.validate()
        );
      }

      return [
        ...amountInputs,
        ...paymentMethodInputs,
        ...refNumInputs
      ].includes(false);
    },
    async autoAmount() {
      this.$q.loading.show();

      await this.verific_mensualidad();
      await this.$axios2
        .post("pagos/montoAuto", {
          month: this.month,
          year: this.year,
          type: this.form.payment_type
        })
        .then(res => {
          if (res.result && res.result.amount) {
            this.form.amount_ref = res.result.amount;
          } else {
            this.form.amount_ref = null;
          }
          this.$q.loading.hide();
        })
        .catch(e => {
          this.$q.loading.hide();
        });
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
    },
    days() {
      var dias = [];
      var dias_month = this.$moment().daysInMonth();

      for (var i = 1; i <= dias_month; i++) {
        dias.push({
          label: i,
          value: i
        });
      }

      return dias;
    }
  },
  async mounted() {
    await this.get_user();
  }
};
</script>
