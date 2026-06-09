import mongoose from "mongoose";
const emailVerificationSchema = new mongoose.Schema({
    id: {type: Number, required: true}, // The 'id' field is of type Number and is required. It serves as a unique identifier for each email verification record.

    token: {type: String, required: true}, // The 'token' field is of type String and is required. It stores the unique token generated for email verification purposes.

    expiresAt: {type: Date}, // The 'expiresAt' field is of type Date and is optional. It indicates the date and time when the email verification token will expire, after which it will no longer be valid for verifying the user's email address.

    verifiedAt: {type: Date}, // The 'verifiedAt' field is of type Date and is optional. It stores the date and time when the email verification was successfully completed, indicating that the user's email address has been verified.

    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} // The 'user_id' field is of type ObjectId and is required. It references the '_id' field of the User document, establishing a relationship between the email verification record and the user.


},{
    timestamps:true // This option adds two fields to the schema: 'createdAt' and 'updatedAt'. These fields will automatically be managed by Mongoose, where 'createdAt' will store the date and time when a document is created, and 'updatedAt' will store the date and time when a document is last updated. This is useful for tracking the creation and modification times of email verification records in the database.
})

export const EmailVerification = mongoose.model("EmailVerification", emailVerificationSchema);

//what is use of id?
// The 'id' field serves as a unique identifier for each email verification record. It allows us to distinguish between different email verification entries in the database and can be used to reference specific records when needed, such as when retrieving or updating email verification information for a particular user.

//what is use of token?
// The 'token' field is used to store a unique token generated for email verification purposes. This token is typically sent to the user's email address as part of the verification process. When the user clicks on the verification link containing the token, the server can validate the token against the stored value in the database to confirm that the email address belongs to the user and complete the verification process successfully.

//what are token and how are they generated?
// Tokens are unique strings that are generated to serve as identifiers or authentication credentials in various applications. In the context of email verification, a token is typically generated using a secure random string generator or a hashing algorithm. The token is designed to be difficult to guess or reproduce, ensuring that only the intended recipient can use it for verification purposes. When a user registers or requests email verification, the server generates a token and associates it with the user's email address. This token is then sent to the user's email, and when the user clicks on the verification link containing the token, the server can validate it against the stored value in the database to confirm the user's identity and complete the verification process.

//what is use of expiresAt and verifiedAt?
// The 'expiresAt' field is used to store the date and time when the email verification token will expire, after which it will no longer be valid for verifying the user's email address. The 'verifiedAt' field is used to store the date and time when the email verification was successfully completed, indicating that the user's email address has been verified.

//why user_id is required in email verification schema and how it work here and how it is imported from other model [user.model]?
// The 'user_id' field is required in the email verification schema to establish a relationship between the email verification record and the user document. It ensures that each email verification record is associated with a specific user, allowing for proper tracking and management of email verification status for each user. The 'user_id' field references the '_id' field of the User document, which is imported from the 'user.model.js' file.

//do timestamp and expiresAt & verifiedAt serve the same purpose?
// No, the 'timestamps' option and the 'expiresAt' & 'verifiedAt' fields serve different purposes. The 'timestamps' option automatically adds 'createdAt' and 'updatedAt' fields to the schema, which track when a document is created and last updated. On the other hand, the 'expiresAt' field is used to specify when the email verification token will expire, while the 'verifiedAt' field indicates when the email verification was successfully completed. These fields are specific to the email verification process and are not automatically managed like the timestamps.


//how much time it will take to expire the token?
// The expiration time for the token can be set based on the application's requirements. It is common to set the token to expire after a certain period, such as 24 hours or 48 hours, to ensure that users have a reasonable amount of time to complete the email verification process while also maintaining security. The specific expiration time can be determined by the developer and implemented in the application logic when generating the token and storing it in the database.

//how to generate token and how to set expiresAt field in database?
// To generate a token, you can use a secure random string generator or a hashing algorithm. For example, you can use the 'crypto' module in Node.js to generate a random token. Here's an example of how to generate a token and set the 'expiresAt' field in the database: