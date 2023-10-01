var config = require("../../server/config.json");
var path = require("path");
const multer = require("multer");
const fs = require("fs");
const moment = require("moment");

//Replace this address with your actual address
var senderAddress = "brayanmontilla26@gmail.com";
var ObjectID = require("mongodb").ObjectID;

module.exports = function (usuarios) {
  //send password reset link when requested
  usuarios.on("resetPasswordRequest", function (info) {
    var url =
      "http://" + config.host_public + ":" + config.port + "/reset-password";
    var html =
      'Click <a href="' +
      url +
      "?access_token=" +
      info.accessToken.id +
      '">aquí</a> para restaurar su contraseña';

    usuarios.app.models.Email.send(
      {
        to: info.email,
        from: senderAddress,
        subject: "Restaurar clave",
        html: html,
      },
      function (err) {
        if (err)
          return console.log("> error sending password reset email", err);
        console.log("> sending password reset email to:", info.email);
      }
    );
  });

  const saveFile = async (ruta, file) => {
    usuarios.app.models.usuarios.create({
      photo: file,
    });
    return true;
  };

  usuarios.upload_file = async function (file, answer, cb) {
    var answer = await saveFile(uploadedFileName, file);
    return answer;
  };

  var uploadedFileName = "";
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var dirPath = "server/models/files/files";
      if (!fs.existsSync(dirPath)) {
        var dir = fs.mkdirSync(dirPath);
      }
      cb(null, dirPath + "/");
    },
    filename: async function (req, file, cb) {
      var fileName = file.originalname;
      uploadedFileName = fileName;
      cb(null, fileName);
    },
  });

  usuarios.upload = function (req, res, cb) {
    var upload = multer({
      storage: storage,
    }).array("file", 12);
    upload(req, res, function (err) {
      if (err) {
        res.json(err);
      } else {
        res.json(uploadedFileName);
      }
    });
  };

  const get_usuarios = async (identity_card) => {
    var pagos = usuarios.app.models.pagos;
    var users = usuarios.app.models.usuarios;
    users = await users.find({
      where: {
        role: "user",
        identity_card: identity_card,
      },
    });
    user = users.length ? users[0] : null;
    if (user) {
      let pago = await pagos.find({
        where: {
          usuario: user.id,
        },
      });
      pago = pago.length ? pago.sort()[pago.length - 1] : null;
      if (pago) {
        let exonerated = false;
        if (pago.exonerated && moment(pago.hasta) > moment()) exonerated = true;
        if (!exonerated) {
          if (moment() > moment(pago.hasta)) return "inactive";
          else return "active";
        } else {
          return "exonerated";
        }
      } else return "inactive";
    }
    return "not-exist";
  };

  usuarios.get_user = async function (identity_card) {
    var result = await get_usuarios(identity_card);
    return result;
  };

  usuarios.remoteMethod("upload", {
    accepts: [
      {
        arg: "req",
        type: "object",
        http: {
          source: "req",
        },
      },
      {
        arg: "res",
        type: "object",
        http: {
          source: "res",
        },
      },
    ],
    returns: {
      arg: "result",
      type: "string",
    },
  });

  usuarios.remoteMethod("upload_file", {
    accepts: [
      {
        arg: "file",
        type: "string",
      },
      {
        arg: "answer",
        type: "array",
      },
    ],
    returns: { arg: "result", type: "any" },
  });

  usuarios.remoteMethod("get_user", {
    accepts: [
      {
        arg: "identity_card",
        type: "string",
      },
    ],
    returns: { arg: "result", type: "any" },
  });
};
