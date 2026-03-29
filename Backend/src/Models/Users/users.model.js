import mongoose from "mongoose";  // Importing the mongoose library to define the schema and model for the User collection in MongoDB.

const userSchema = new mongoose.Schema({  // Defining the schema for the User collection.
    id: {type: Number , required: true},  // The 'id' field is of type Number and is required.

    username: {type: String, required:true}, // The 'username' field is of type String and is required.

    email: {type: String, required:true}, // The 'email' field is of type String and is required.

    password: {type: String, required:true}, // The 'password' field is of type String and is required.

    email_Verified: {type: Boolean, default:false}, // The 'email_verified' field is of type Boolean and has a default value of false, indicating whether the user's email has been verified or not.

    // created_At: {type: Date, default: Date.now} // The 'created_at' field is of type Date and has a default value of the current date and time when a new user document is created. This field can be used to track when each user was registered in the system.

},{
    timestamps:true // This option adds two fields to the schema: 'createdAt' and 'updatedAt'. These fields will automatically be managed by Mongoose, where 'createdAt' will store the date and time when a document is created, and 'updatedAt' will store the date and time when a document is last updated. This is useful for tracking the creation and modification times of user documents in the database.
})

export const User = mongoose.model("User",    userSchema) // Creating a model named "User" using the defined schema and exporting it for use in other parts of the application.

//why const user , not directly export UserSchema ?
// We define the userSchema first to create a structured representation of the User data. Then, we create a model named "User" using mongoose.model() which takes the name of the collection ("User") and the schema (userSchema) as arguments. This model provides an interface to interact with the User collection in MongoDB, allowing us to perform operations like creating, reading, updating, and deleting user documents. By exporting the User model, we can use it in other parts of our application to manage user data effectively.

//what is model in mongoose ?
// In Mongoose, a model is a constructor function that represents a specific collection in the MongoDB database. It is created using the mongoose.model() method, which takes two arguments: the name of the collection (as a string) and the schema that defines the structure of the documents in that collection. The model provides an interface for interacting with the database, allowing you to perform operations such as creating, reading, updating, and deleting documents in the collection. It also includes built-in methods for querying the database and validating data based on the defined schema.