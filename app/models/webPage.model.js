module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      url: String,
      date: Date,
      
      //This replace Links Models and will be used in the Application
      itsLink: String,
      valid: Boolean,
      /////////////////// userId
      userid: String, 
 

      //////////// NOT USED 
      links: 
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "links"
          }
      
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const WebPage = mongoose.model("webPage", schema);
  return WebPage;


  };



  /* This Mongoose Model represents webPage collection in MongoDB database. These fields will be generated automatically for each 
  webPage document: id,  url: String, date: Date , createdAt, updatedAt.*/