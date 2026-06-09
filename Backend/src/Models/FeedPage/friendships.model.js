import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
    id: {type:Number, required: true}, // The 'id' field is of type Number and is required. It serves as a unique identifier for each friendship record.

    status: {type:String, required:true}, // The 'status' field is of type String and is required. It indicates the status of the friendship, such as "pending", "accepted", or "rejected".

    created_at: {type: Date, default: Date.now}, // The 'created_at' field is of type Date and has a default value of the current date and time when a new friendship record is created. This field can be used to track when each friendship was established.

    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // The 'user_id' field is of type ObjectId and is required. It references the '_id' field of the User document, establishing a relationship between the friendship record and the user.

    friend_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} // The 'friend_id' field is of type ObjectId and is required. It references the '_id' field of the User document, establishing a relationship between the friendship record and the friend.
})

export const Friendship = mongoose.model("Friendship", friendshipSchema);

//what is the use of status and created_at field in friendship schema?
// The 'status' field is used to indicate the status of the friendship, such as "pending", "accepted", or "rejected". This allows us to track the current state of the friendship between users. The 'created_at' field is used to store the date and time when a new friendship record is created. This helps us to keep track of when each friendship was established, allowing us to analyze the duration and history of friendships between users over time.

//what is use of user_id and friend_id in friendship schema and how it work here and how it is imported from other model [user.model]?
// The 'user_id' and 'friend_id' fields are required in the friendship schema to establish relationships between the friendship record and the user documents. The 'user_id' field references the '_id' field of the User document, representing the user who initiated the friendship, while the 'friend_id' field references the '_id' field of the User document, representing the friend in the friendship. These fields allow us to link the friendship records to the corresponding users in the database, enabling us to retrieve and manage friendships based on user information. The User model is imported from the 'user.model.js' file to establish these references and ensure that we can access user data when working with friendship records.