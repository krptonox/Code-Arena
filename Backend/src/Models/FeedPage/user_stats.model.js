import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema({
    id: {type:Number, required: true}, // The 'id' field is of type Number and is required. It serves as a unique identifier for each user statistics record.

    total_solved: {type:Number, default: 0}, // The 'total_solved' field is of type Number and has a default value of 0. It keeps track of the total number of problems solved by the user.

    easy_solved: {type:Number, default: 0}, // The 'easy_solved' field is of type Number and has a default value of 0. It keeps track of the number of easy problems solved by the user.

    medium_solved: {type:Number, default: 0}, // The 'medium_solved' field is of type Number and has a default value of 0. It keeps track of the number of medium problems solved by the user.

    hard_solved: {type:Number, default: 0}, // The 'hard_solved' field is of type Number and has a default value of 0. It keeps track of the number of hard problems solved by the user.

    current_streak: {type:Number, default: 0}, // The 'current_streak' field is of type Number and has a default value of 0. It keeps track of the user's current streak of consecutive days with problem-solving activity.

    longest_streak: {type:Number, default: 0}, // The 'longest_streak' field is of type Number and has a default value of 0. It keeps track of the user's longest streak of consecutive days with problem-solving activity.

    current_rating: {type:Number, default: 0}, // The 'current_rating' field is of type Number and has a default value of 0. It represents the user's current rating based on their problem-solving performance.

    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} // The 'user_id' field is of type ObjectId and is required. It references the '_id' field of the User document, establishing a relationship between the user statistics record and the user.
},{
    timestamps:true // This option adds two fields to the schema: 'createdAt' and 'updatedAt'. These fields will automatically be managed by Mongoose, where 'createdAt' will store the date and time when a document is created, and 'updatedAt' will store the date and time when a document is last updated. This is useful for tracking the creation and modification times of user statistics records in the database.
})

export const UserStats = mongoose.model("UserStats", userStatsSchema);

//what is use of user_id in user stats schema and how it work here and how it is imported from other model [user.model]?
// The 'user_id' field is required in the user statistics schema to establish a relationship between the user statistics record and the user document. It ensures that each user statistics record is associated with a specific user, allowing for proper tracking and management of problem-solving activity and performance metrics for each user. The 'user_id' field references the '_id' field of the User document, which is imported from the 'user.model.js' file. This allows us to link the user statistics to the corresponding user in the database, enabling us to retrieve and update statistics based on the user's information.

//