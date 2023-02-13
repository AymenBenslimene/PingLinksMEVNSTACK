module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      link: String,
      valid: Boolean,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Links = mongoose.model("links", schema);
  return Links;

  };
  /* This Mongoose Model represents webPage collection in MongoDB database. These fields will be generated automatically for each 
  webPage document: id,  link: String, Valid , createdAt, updatedAt.*/