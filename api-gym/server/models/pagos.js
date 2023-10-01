"use strict";
var ObjectID = require("mongodb").ObjectID;
const moment = require("moment");

module.exports = function (Pagos) {
  // OBTENER USUARIOS
  const get_usuarios = async (month, year) => {
    var users = Pagos.app.models.usuarios;
    users = await users.find({
      where: {
        role: "user",
      },
    });
    users = users.length ? users : [];

    var mensualidad = Pagos.app.models.mensualidades;
    mensualidad = await mensualidad.find({
      where: {
        month: month,
        year: year,
      },
    });
    mensualidad = mensualidad.length ? mensualidad : [];

    var array = [];
    if (users.length) {
      for (let i in users) {
        var user = users[i];

        array.push({
          nombre: user.first_name,
          apellido: user.last_name,
          cedula: user.identity_card,
          user_id: user.id,
          payment_type: "",
          email: user.email,
          entry_date: user.entry_date,
          exonerated: false,
          exonerated_date: null,
          amount: null,
          amount_ref: null,
        });
      }
    }
    return array;
  };

  Pagos.get_users = async function (month, year) {
    var result = await get_usuarios(month, year);
    return result;
  };

  // GUARDAR ADELANTOS
  const generate_adelanto = async (data) => {
    var adelantos = Pagos.app.models.adelantos;

    await adelantos.create({ ...data });
  };
  // GUARDAR DEUDAS
  const generate_deuda = async (data) => {
    var deudas = Pagos.app.models.deudas;

    await deudas.create({ ...data });
  };
  // VALIDAR Y DESCONTAR ADELANTOS
  const validate_adelantos = async (data) => {
    var adelantos = Pagos.app.models.adelantos;
  };
  // GENERAR PAGO
  const generate_pago = async (datos, year, month, day, access) => {
    var company = {};
    var usuarios = Pagos.app.models.usuarios;
    var users = await usuarios.find({
      where: {
        id: ObjectID(access.userId),
      },
    });
    if (users[0].condominium && users[0].role == "admin") {
      company.condominium = users[0].condominium;
      company.byUser = access.userId;
    }

    var pagar = Pagos.app.models.pagos;

    var mensualidad = Pagos.app.models.mensualidades;
    mensualidad = await mensualidad.find({
      where: {
        year: year,
        month: Number(month),
        type: datos.payment_type,
      },
    });
    mensualidad = mensualidad.length ? mensualidad : [];

    var array_pagos = [];
    var dato = datos;
    let hasta;
    if (dato.payment_type == "mensual")
      hasta = moment(`${year}-${month}-${moment().format("DD")}`).add(
        1,
        "month"
      );
    if (dato.payment_type == "semana")
      hasta = moment(`${year}-${month}-${moment().format("DD")}`).add(
        7,
        "days"
      );
    if (dato.payment_type == "dia")
      hasta = moment(`${year}-${month}-${moment().format("DD")}`).add(
        1,
        "days"
      );

    let amount = 0;
    amount = dato.payment_data.amount;

    array_pagos.push({
      usuario: dato.user_id,
      year: year,
      month: Number(month),
      day: Number(day),
      nombre: dato.nombre,
      apellido: dato.apellido,
      cedula: dato.cedula,
      amount: dato.exonerated ? 0 : amount,
      mensualidad_config: {
        amount: mensualidad[0].amount,
        year: mensualidad[0].year,
        month: mensualidad[0].month,
        type: mensualidad[0].type,
      },
      exonerated: dato.exonerated,
      hasta: dato.exonerated ? dato.hasta : hasta.format("YYYY-MM-DD"),
      exonerated_date: dato.exonerated ? dato.exonerated_date : null,
      payment_type: dato.payment_type,
      payment_method: dato.payment_method,
      num_ref: dato.num_ref,
      entry_date: dato.entry_date,
      fecha_pago: moment(`${year}-${month}-${day}`).format("YYYY-MM-DD"),
      payment_data: dato.payment_data,
    });

    // VALIDAR ADELANTOS
    if (amount > mensualidad[0].amount)
      await generate_adelanto({
        usuario: dato.user_id,
        year: year,
        month: Number(month),
        day: Number(day),
        nombre: dato.nombre,
        apellido: dato.apellido,
        cedula: dato.cedula,
        amount: Number(amount) - Number(mensualidad[0].amount),
        mensualidad_config: {
          amount: mensualidad[0].amount,
          year: mensualidad[0].year,
          month: mensualidad[0].month,
          type: mensualidad[0].type,
        },
        fecha_adelanto: moment(`${year}-${month}-${day}`).format("YYYY-MM-DD"),
      });

    // VALIDAR DEUDA
    if (mensualidad[0].amount > amount)
      await generate_deuda({
        usuario: dato.user_id,
        year: year,
        month: Number(month),
        day: Number(day),
        nombre: dato.nombre,
        apellido: dato.apellido,
        cedula: dato.cedula,
        amount: Number(mensualidad[0].amount) - Number(amount),
        mensualidad_config: {
          amount: mensualidad[0].amount,
          year: mensualidad[0].year,
          month: mensualidad[0].month,
          type: mensualidad[0].type,
        },
        fecha_deuda: moment(`${year}-${month}-${day}`).format("YYYY-MM-DD"),
      });

    await pagar.create(array_pagos);
    return true;
  };

  Pagos.generar = async function (datos, year, month, day, token) {
    var access = token.accessToken;
    var result = await generate_pago(datos, year, month, day, access);
    return result;
  };

  // Monto automatico
  const montoAuto = async (month, year, type) => {
    var mensualidad = Pagos.app.models.mensualidades;
    mensualidad = await mensualidad.find({
      where: {
        month: month,
        year: year,
        type: type,
      },
    });
    mensualidad = mensualidad.length ? mensualidad[0] : {};
    return mensualidad;
  };
  Pagos.montoAuto = async function (month, year, type) {
    var result = await montoAuto(month, year, type);
    return result;
  };

  Pagos.remoteMethod("get_users", {
    accepts: [
      {
        arg: "month",
        type: "number",
      },
      {
        arg: "year",
        type: "number",
      },
    ],
    returns: { arg: "result", type: "any" },
  });

  Pagos.remoteMethod("generar", {
    accepts: [
      {
        arg: "datos",
        type: "object",
      },
      {
        arg: "year",
        type: "number",
      },
      {
        arg: "month",
        type: "number",
      },
      {
        arg: "day",
        type: "number",
      },
      { arg: "token", type: "object", http: { source: "req" } },
    ],
    returns: { arg: "result", type: "boolean" },
  });

  Pagos.remoteMethod("montoAuto", {
    accepts: [
      {
        arg: "month",
        type: "number",
      },
      {
        arg: "year",
        type: "number",
      },
      {
        arg: "type",
        type: "string",
      },
    ],
    returns: { arg: "result", type: "object" },
  });
};
