var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

var orm = {
  selectAll: function (table, cb) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [table], function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  insertOne: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO ??(??) VALUES(?)";
    console.log(queryString);
    connection.query(queryString, [table, cols, vals], function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  updateOne: function (table, objCol, val, condition, cb) {
    var queryString = "UPDATE ?? SET ?? = ? WHERE id = ?";

    console.log(queryString);
    connection.query(queryString, [table, objCol, val, condition], function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
};
module.exports = orm;
