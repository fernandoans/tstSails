/**
 * ContaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

nomeMes = ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

module.exports = {

  graphBase: function (req, res) {
    var myQuery = "select month(dtEntrada) as mes, sum(valor) as valor from conta " +
                  "group by month(dtEntrada)";
    var meses = [];
    var valor = [];
    Conta.getDatastore().sendNativeQuery(myQuery, function (err, contas) {
      if (err) {
        return res.json({"status": 0, "error": err});
      } else {
        // sails.log(contas);
        for (var i of contas.rows) {
          meses.push(nomeMes[i.mes]);
          valor.push(i.valor);
        }
        return res.json({"mes": meses, "valor": valor});
      }
    });
  }
};
