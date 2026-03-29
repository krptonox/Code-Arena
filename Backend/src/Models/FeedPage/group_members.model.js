import mongoose from "mongoose";

const groupMemberSchema = new mongoose.Schema({
    id: {type: Number, required: true },// The 'id' field is of type Number and is required. It serves as a unique identifier for each group member record.

    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // The 'user_id' field is of type ObjectId and is required. It references the '_id' field of the User document, establishing a relationship between the group member record and the user.

    group_id: {type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true}, // The 'group_id' field is of type ObjectId and is required. It references the '_id' field of the Group document, establishing a relationship between the group member record and the group.

    role: {type: String, required: true}, // The 'role' field is of type String and is required. It indicates the role of the user within the group, such as "admin", "member", or "moderator".

    joined_at: {type: Date, default: Date.now} // The 'joined_at' field is of type Date and has a default value of the current date and time when a new group member record is created. This field can be used to track when each user joined the group.
})

export const GroupMember = mongoose.model("GroupMember", groupMemberSchema);
