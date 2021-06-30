
import { Request } from 'express';
import passport from 'passport'
import GoogleAuth, { GoogleCallbackParameters, Profile, VerifyCallback } from 'passport-google-oauth20'
import UserModel from '../models/UserModel';
const GoogleStrategy = GoogleAuth.Strategy
passport.serializeUser((user:any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id)
    .then(user => {
      done(null, user);
    })
});
passport.use(new GoogleStrategy({
  clientID: "178105242301-b5dt5bvmrorgkju3m5ch16mrrau009ks.apps.googleusercontent.com",
  clientSecret: "cEKJqxhkHhDNcttPoX6D7em9",
  callbackURL: '/auth/google/callback'
}, (accessToken: string,refreshToken: string, profile: Profile,done: VerifyCallback) => {
  if (profile.id) {
    UserModel.findOne({googleId: profile.id})
      .then((user) => {
        if (user) {
          done(null, user);
        } else {
          UserModel.create({
            displayName: profile.displayName,
            email: profile.emails[0].value,
            oauthImage: profile.photos[0].value,
            oauth: 'google',
            googleId: profile.id
          }).then(user => done(null, user))
        }
      })
  }
}));
export default passport