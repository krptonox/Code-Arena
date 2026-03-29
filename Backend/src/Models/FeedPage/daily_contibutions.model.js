import mongoose from "mongoose";

const dailtyContributionsSchema = new mongoose.Schem({
    id: {type:Number, required: true}, // The 'id' field is of type Number and is required. It serves as a unique identifier for each daily contributions record.

    status: {type:String, required:true}, // The 'status' field is of type String and is required. It indicates the status of the user's contribution for the day, such as "solved", "attempted", or "not attempted".

    created_at: {type: Date, default: Date.now}, // The 'created_at' field is of type Date and has a default value of the current date and time when a new daily contributions record is created. This field can be used to track when each contribution was made by the user.

    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} // The 'user_id' field is of type ObjectId and is required. It references the '_id' field of the User document, establishing a relationship between the daily contributions record and the user.
})

export const DailyContributions = mongoose.model("DailyContributions", dailtyContributionsSchema);

//what is the use of status and created_at field in daily contributions schema?
// The 'status' field is used to indicate the status of the user's contribution for the day, such as "solved", "attempted", or "not attempted". This allows us to track the user's activity and progress on a daily basis. The 'created_at' field is used to store the date and time when a new daily contributions record is created. This helps us to keep track of when each contribution was made by the user, allowing us to analyze their activity patterns and provide insights into their problem-solving habits over time.

