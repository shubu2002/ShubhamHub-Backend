const User = require("../models/user-model")


const home = async (req, res) => {
    try {
        res
            .status(200)
            .send("welcome to home page using controller")

    } catch (error) {
        console.log(error);

    }

};

//  user registration logic 

const register = async (req, res) => {
    try {
        // console.log(req.body);

        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.json({ message: "email already exist" });
        }


        // hash the password 
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password , saltRound)

        const userCreated = await User.create({
            username,
            email,
            phone,
            password
            /*:hash_password */
});

        res
            .status(201)
            .json({ msg: "registration successful", 
                token: await userCreated.generateToken() ,
            userId : userCreated._id.toString() })

    } catch (error) {
        console.error(error);
        res.json("internal server error")

    }
}

// -----------------------



// user login logic 

const login = async (req,res) => {
    try {
        const {email,password} = req.body ;

     const userExist = await User.findOne({email});

     if (!userExist) {
        return res. status(400).json ({ message : "invalid credential"})
     }

    //  const isPassValid = await bcrypt.compare(password , userExist.password);

     const isPassValid = await userExist.comparePassword(password);

     if(isPassValid) {
        res.status(200)
        .json({
            msg : "login successful",
            token : await userExist.generateToken(),
            userId : userExist._id.toString(),
        })
     }else{
        res.status(401).json({
            message: "invalid email or password"
        })
     }


    } catch (error) {
        console.log(error);
        
        res.status(500).json("internal server error")
    }

}


// ------------------------

// to send user data --user logic 

const user = async(req,res) => {
    try {
        const userData = req.user;

        res.status(200).json({userData});
        
    } catch (error) {
        console.log("error from user logic" , error);
        
    }
}


module.exports = { home, register, login ,user }