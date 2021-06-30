import { Request, Response, Router } from "express";
import fetch from 'node-fetch'
import passport from '../helpers/oauthHelper';
import { signInController, signUpController, getInfoFromToken } from '../controllers/authController'
const router = Router();

router.post('/signUp', signUpController)
router.post('/signIn', signInController)
router.post('/getInfoFromToken', getInfoFromToken)

//Google Oauth
router.use(passport.initialize());
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
router.get('/google/callback', passport.authenticate('google'),async function (req:any, res) {
  const domain = process.env.NODE_ENV === 'production' ? 'https://serene-ocean-09276.herokuapp.com' : 'http://localhost:3000'
  res.cookie('accessToken',req.user.generateAuthToken(), {domain: '.herokuapp.com'})
  .redirect(domain)
});

export default router