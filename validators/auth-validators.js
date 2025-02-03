const {z} = require("zod");


// creating an object scherma 

const signupSchema = z.object({
    username : z
    .string ({required_error :"Name is required"})
    .trim()
    .min(3,{message : "Name must be at least of 3 characters"})
    .max(255, {message :"Name cannot be more than 255 characters" }),

    email : z
    .string ({required_error :"Email is required"})
    .trim()
    .email({message : "Invalid email address"})
    .min(3,{message : "Email must be at least of 3 characters"})
    .max(255, {message :"Email cannot be more than 255 characters" }),

    phone : z
    .string ({required_error :"Phone is required"})
    .trim()
    .min(10,{message : "Phone must be at least of 10 characters"})
    .max(20, {message :"Phone cannot be more than 20 characters" }),

    password : z
    .string ({required_error :"Password is required"})
    .min(8,{message : "Password must be at least of 8 characters"})
    .max(255, {message :"Password cannot be more than 255 characters" })

});

const loginSchema = z.object({

    email : z
    .string ({required_error :"Email is required"})
    .trim()
    .email({message : "Invalid email address"})
    .min(3,{message : "Email must be at least of 3 characters"})
    .max(255, {message :"Email cannot be more than 255 characters" }),


    password : z
    .string ({required_error :"Password is required"})
    .min(8,{message : "Password must be at least of 8 characters"})
    .max(255, {message :"Password cannot be more than 255 characters" })
})


module.exports = { signupSchema, loginSchema} ;