const bycript = require("bcryptjs");


function getUsers(req, res, next) {
  res.render("users", {
    title: "Users - Chat Application",
  });
}

async function addUser(req,res,next){
    let newuser;
    const hashPassword = await bycript.hash(req.body.password, 10);


    if(req.files && req.files.length > 0){
        newUser = new UserActivation({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashPassword,
        })
        
    }
    else {
            newUser = new USer ({
                ...req.body,
                password: hashPassword,
            })
        }

        try{
            const result = await newUser.save();
            res.status(200).json({
                message: "User added successfully",
            })
        } catch(err){
            console.error("Error adding user:", err);
            res.status(500).json({
                error: "Internal server error",
            }); 
        }
}

module.exports = {
  getUsers,
  addUser,
};