import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
    text: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // FK referencing User
      ref: "User",
      required: true,
    },
  },{
    timestamps:true
  });
  
  const Recommendation = mongoose.model("Recommendation", RecommendationSchema);
  export default Recommendation;
  