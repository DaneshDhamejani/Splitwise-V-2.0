const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TransactionSchema = new Schema({
splitamount: {
    type: Number,
  },
sender: {
    type: String
  },
receiver: {
    type: String
  }
});
module.exports = User = mongoose.model("transaction", TransactionSchema);