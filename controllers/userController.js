import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req,res)=>{
    
    res.render("join",{pageTitle : "Join"});
}

export const postJoin = async (req,res,next)=>{
    const {
        body : {name,email,password,password2 }
    } =req;
    if(password!==password2){
        res.status(400);
        res.render("join",{pageTitle : "Join"});
        
    }else{
        try{
            const user = await User({
                name,
                email
            });
            await User.register(user,password);
            next();
        }
        catch(error){
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

export const getLogin=(req,res)=>{
    res.render("login",{pageTitle : "Login"});
}

export const postLogin=passport.authenticate('local',{
    failureRedirect:routes.login,
    successRedirect:routes.home
});
   
export const gitHubLogin=passport.authenticate("github");



export const gitHubLoginCallback = async(_, __, profile, cb) =>{
    const {
        _json:{id,avatar_url:avatarUrl,name,email}
    }=profile;
    try{
        const user = await User.findOne({email});
        
       if(user){
           user.githubId =id;
            user.save();
            return cb(null,user);
       }
           const newUser = await User.create({
               email,
               name,
               githubId:id,
               avatarUrl
           });
           return cb(null,newUser);
       
    }catch(error){
        return cb(error);
    }
}

export const postGitHubLogin =(req,res)=>{
    res.redirect(routes.home);
};


export const kakaoLogin=passport.authenticate("kakao");

export const kakaoLoginCallback= async(_, __, profile, done)=>{
   const {_json:{id,username}}=profile;

   try{
    const user = await User.findOne({username});
   
   
   if(user){
       user.kakaoId =id;
        user.save();
        return done(null,user);
   }
       const newUser = await User.create({
           name:username,
           id,
           kakaoId:id
       });
       return done(null,newUser);
   
}catch(error){
    return done(error);
}
}

export const postKakao=(req,res)=>{
    res.redirect(routes.home);
}



export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
  };

export const getMe =(req,res)=>{
    res.render("userDetail", { pageTitle: "User Detail", user:req.user});
}

    export const userDetail = async (req, res) => {
        const {
          params: { id }
        } = req;
        try {
          const user = await User.findById(id).populate("videos");
          console.log(user)
          res.render("userDetail", { pageTitle: "User Detail", user });
        } catch (error) { 
          res.redirect(routes.home);
        }
      };
      

  export const getEditProfile = (req, res) =>
    res.render("editProfile", { pageTitle: "Edit Profile" });


export const postEditProfile = async (req, res) => {
    const {
      body: { name, email },
      file
    } = req;
    try {
      await User.findByIdAndUpdate(req.user.id, {
        name,
        email,
        avatarUrl: file ? file.path : req.user.avatarUrl
      });
      res.redirect(routes.me);
    } catch (error) {
      res.render("editProfile", { pageTitle: "Edit Profile" });
    }
  };


  export const getChangePassword = (req, res) =>
  res.render("changePassword", {pageTitle:"Change Password" })
   

 export const postChangePassword =async (req,res) =>{
     const {
         body:{oldPassword,
            newPassword,
            newPassword1}
     }=req;
     try{
        if(newPassword!==newPassword1){
            res.status(400);
            res.redirect(`/users${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword,newPassword);
        res.redirect(routes.me);
     }catch(error){
        res.status(400);
        res.redirect(`/users${routes.changePassword}`);
     }
 }   