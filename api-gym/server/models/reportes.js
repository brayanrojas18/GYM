"use strict";

var _ = require("lodash");
var ObjectID = require("mongodb").ObjectID;
var moment = require("moment");

module.exports = function (Reportes) {
  const saveExcel = ({ workbook, path }) => {
    var mkdirp = require("mkdirp");

    return new Promise((resolve) => {
      var dir = path.split("/");
      dir.pop();
      dir = dir.join("/");

      mkdirp(__dirname + "/files/" + dir, async function () {
        await workbook.xlsx.writeFile(__dirname + "/files/" + path);

        resolve(path);
      });
    });
  };

  const saveReporte = ({ data, columns, name }) => {
    return new Promise((resolve) => {
      var Excel = require("exceljs");

      var workbook = new Excel.Workbook();

      workbook.creator = "Cambios";
      workbook.lastModifiedBy = "Cambios";
      workbook.created = new Date();
      workbook.modified = new Date();
      workbook.lastPrinted = new Date();
      workbook.properties.date1904 = true;

      var worksheet = workbook.addWorksheet("Reporte");

      worksheet.columns = columns.map((val) => {
        var width = val.label.length + 5;

        data.forEach((v, k) => {
          if (("" + v[val.field]).length > width)
            width = ("" + v[val.field]).length;
        });

        return {
          header: val.label,
          key: val.field,
          width: width + 5,
        };
      });

      data.forEach((val, key) => {
        columns.forEach((v, k) => {
          var value =
            v.type == "number"
              ? Number(Number(val[v.field]).toFixed(2)) + "" + "$"
              : val[v.field];
          worksheet.getRow(key + 2).getCell(k + 1).value = value;
        });
      });

      saveExcel({
        workbook,
        path: "reportes/" + moment().valueOf() + "/" + name + ".xlsx",
      }).then((res) => resolve(res));
    });
  };

  const getData = async function (type, month, year) {
    var Pagos = Reportes.app.models.pagos;

    var data = [];

    switch (type) {
      case "pagos":
        var Pagos = await Pagos.find({
          where: {
            month: Number(month),
            year: Number(year),
          },
        });

        data = Pagos;
        break;
    }

    return data;
  };

  Reportes.get = getData;

  Reportes.generar = async function (type, month, year) {
    switch (type) {
      case "pagos":
        var data = await getData(type, month, year);
        if (!data.length) return "vacio";
        var url = await saveReporte({
          data: data,
          columns: [
            {
              label: "Nombre",
              field: "nombre",
            },
            {
              label: "Apellido",
              field: "apellido",
            },
            {
              label: "Cédula",
              field: "cedula",
            },
            {
              label: "Fecha de Entrada",
              field: "entry_date",
            },
            {
              label: "Mes",
              field: "month",
            },
            {
              label: "Año",
              field: "year",
            },
            {
              label: "Monto",
              field: "amount",
              type: "number",
            },
            {
              label: "Mensualidad Configurada",
              field: "mensualidad_config",
              type: "number",
            },
          ],
          name: "Reporte de Pagos Generados",
        });

        break;
    }
    return url;
  };

  Reportes.remoteMethod("generar", {
    accepts: [
      {
        arg: "type",
        type: "string",
      },
      {
        arg: "month",
        type: "number",
      },
      {
        arg: "year",
        type: "number",
      },
    ],
    returns: { arg: "result", type: "string" },
  });

  Reportes.remoteMethod("get", {
    accepts: [
      {
        arg: "type",
        type: "string",
      },
      {
        arg: "month",
        type: "number",
      },
      {
        arg: "year",
        type: "number",
      },
    ],
    returns: { arg: "result", type: "array" },
  });
};
