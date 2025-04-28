const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const User = require("..//models/user");
const { newToken } = require("..//utils/token");
const generatePassword = require("..//utils/token");  
const GitHubStrategy=require("passport-github2").Strategy
require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.URL}/auth/google/callback`
  },
  async function (accessToken, refreshToken, profile, cb) {
    try {
      let user = await User.findOne({ $or: [{ email: profile._json.email }, { username: profile._json.name }] }).lean().exec();

      if (!user) {
        user = await User.create({
          username: profile._json.name,
          email: profile._json.email,
          password: generatePassword(),  
          isVerified: profile._json.email_verified,
          isActive: true // Or any other default values you want to set for OAuth users
        });
      }

      const token = newToken(user);

      return cb(null, { user, token });

    } catch (err) {
      return cb(err, null);
    }
  }
));


passport.use(new GitHubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.URL}/auth/github/callback`
  },
  async function(accessToken, refreshToken, profile, done) {
    let user=await User.findOne({$or:[{email:profile._json.email},{username:profile._json.login}]}).lean().exec()
   if(!user){
    user=await User.create({username:profile._json.login,email:profile._json.email||"a@a.gmail.com",password:"Vishal@1307",isVerifya:true})
   }
   const token=newToken(user)
   done(null,{user,token})
  }
));


module.exports = passport;
