import mongoose from "mongoose";

const platformConnectionSchema = new mongoose.Schema({
    id: {type:Number, required: true}, // The 'id' field is of type Number and is required. It serves as a unique identifier for each platform connection record.

    platform_name: {type:String, required:true}, // The 'platform_name' field is of type String and is required. It stores the name of the platform to which the user has connected their account.

    platform_username: {type:String, required:true}, // The 'platform_username' field is of type String and is required. It stores the username of the user on the connected platform.

    is_connected: {type:Boolean, default:false}, // The 'is_connected' field is of type Boolean and has a default value of false. It indicates whether the user's account is currently connected to the specified platform or not.

    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // The 'user_id' field is of type ObjectId and is required. It references the '_id' field of the User document, establishing a relationship between the platform connection record and the user.

    synced_at: {type: Date} // The 'synced_at' field is of type Date and is optional. It stores the date and time when the user's account was last synced with the connected platform, allowing for tracking of synchronization activity.
})

export const PlatformConnection = mongoose.model("PlatformConnection", platformConnectionSchema);

//what is use of is_connected and synced_at field in platform connection schema?
// The 'is_connected' field is used to indicate whether the user's account is currently connected to the specified platform or not. It allows us to track the connection status of the user's account with different platforms. The 'synced_at' field is used to store the date and time when the user's account was last synced with the connected platform. This information can be useful for tracking synchronization activity and ensuring that the user's data is up-to-date across different platforms.

//how platform_username is used in platform connection schema and how it is different from username in user schema?
// The 'platform_username' field in the platform connection schema is used to store the username of the user on the connected platform. It is different from the 'username' field in the user schema, which represents the username of the user within our application. The 'platform_username' allows us to identify and manage the user's account on external platforms, while the 'username' in the user schema is specific to our application's user management system. This distinction helps us to maintain separate identities for users across different platforms while still linking them to their corresponding accounts in our application.

//from where it hold value of platform name and platform username and how it is used in our application?
// The values for 'platform_name' and 'platform_username' in the platform connection schema are typically provided by the user when they choose to connect their account to an external platform. This information can be collected through a user interface where users can select the platform they want to connect to and enter their username for that platform. In our application, this information is used to manage and display the user's connected platforms, allowing them to view and interact with their accounts on those platforms directly from our application. It also enables us to synchronize data between our application and the connected platforms, providing a seamless experience for the user.