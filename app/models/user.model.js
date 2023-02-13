const mongoose = require("mongoose");



module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      username: String,
      firstname: String,
      lastname: String,
      email: String,
      password: String,
  
      webPages: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "webPage"
          }
        ],
  
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
      
    },
    { timestamps: true }
  );

  //schema.method("toJSON", function() {
  //  const { __v, _id, ...object } = this.toObject();
  //  object.id = _id;
  //  return object;
  //});

  const User = mongoose.model("user", schema);
  return User;


  };

