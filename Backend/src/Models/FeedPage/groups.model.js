import mongoose from "mongoose";

const groupsSchema = new mongoose.Schema({
    id: {type:Number, required: true}, // The 'id' field is of type Number and is required. It serves as a unique identifier for each group record.

    group_name: {type:String, required:true}, // The 'group_name' field is of type String and is required. It stores the name of the group.

    member_count: {type:Number, default: 0}, // The 'member_count' field is of type Number and has a default value of 0. It keeps track of the number of members in the group.

    current_challenge: {type:String}, // The 'current_challenge' field is of type String and is optional. It can be used to store the name or identifier of the current challenge that the group is working on.

    created_at: {type: Date, default: Date.now}, // The 'created_at' field is of type Date and has a default value of the current date and time when a new group record is created. This field can be used to track when each group was established.

    created_by: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} // The 'created_by' field is of type ObjectId and is required. It references the '_id' field of the User document, establishing a relationship between the group record and the user who created it.
})

export const Group = mongoose.model("Group", groupsSchema);

//what is use of member_count and current_challenge field in groups schema?
// The 'member_count' field is used to keep track of the number of members in the group. It allows us to easily retrieve and display the size of the group, which can be useful for managing group dynamics and providing insights into group activity. The 'current_challenge' field is used to store the name or identifier of the current challenge that the group is working on. This information can be helpful for tracking the group's progress and providing context for their activities, allowing members to stay informed about their current focus and goals within the group.

//how cuurrent_challenge is updated in groups schema and how it is used in our application?
// The 'current_challenge' field in the groups schema can be updated whenever the group decides to take on a new challenge. This can be done through an API endpoint or a user interface where group members can select or input the new challenge they want to work on. In our application, this field can be used to display the current challenge that the group is working on, allowing members to stay informed about their focus and goals. It can also be used to filter or sort groups based on their current challenges, helping users find groups that are working on similar challenges or topics of interest.

//how a question is assigned to a group and how it is tracked in our application?
// A question can be assigned to a group through an API endpoint or a user interface where group members can select a question from a list of available questions and assign it to the group. Once a question is assigned to the group, it can be tracked in our application by updating the group's current challenge field with the identifier of the assigned question. This allows us to keep track of which question the group is currently working on and provide relevant information and resources related to that question for the group members. Additionally, we can implement features to track the progress of the group on the assigned question, such as marking it as completed or providing updates on their progress towards solving it.