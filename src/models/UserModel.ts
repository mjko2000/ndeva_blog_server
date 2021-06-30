import { Schema, model, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY || "NDEVAAAAAAAAA"
export interface UserAuthData {
  id: string;
}
export interface User extends Document {
  displayName: string;
  email: string;
  avatar?: string;
  password: string;
  oauth: 'local' | 'google' | 'facebook';
  googleId?: string;
  facebookId?: string;
  oauthImage?: string;
  //method
  comparePassword: (password: string) => boolean;
  generateAuthToken: () => string;
}
interface UserInstance extends Model<User> {
  signUp: (input: {
    displayName: string;
    password: string;
    email: string;
  }) => Promise<User>;
  generateHashPassword: (password: string) => string;
  getFromToken: (token: string) => Promise<User>;
}

const UserSchema = new Schema<User>({
  displayName: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, lowercase: true },
  avatar: String,
  password: { type: String, require: true, select: false },
  oauth: { type: String, enum: ['local', 'google', 'facebook'], default: 'none' },
  googleId: { type: String },
  facebookId: { type: String },
  oauthImage: { type: String },
},
{
  timestamps: true,
});

// Method
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
UserSchema.methods.generateAuthToken = function() {
  // Generate an auth token for the user
  const user = this
  const authGen:UserAuthData = {
    id: user.id
  }
  const token = jwt.sign(authGen, SECRET_KEY, {expiresIn: '7d'})
  return token
}

// Static
UserSchema.statics.generateHashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};
UserSchema.statics.getFromToken = async function(token) {
  try{
    const data: any = jwt.verify(token,SECRET_KEY)
    return UserModel.findById(data.id)
  }
  catch(err){
    return null
  }
};
UserSchema.statics.signUp = function(input: User) {
  return UserModel.create({
    ...input,
    password: UserModel.generateHashPassword(input.password)
  })
}
UserSchema.index({email: 1})
const UserModel = model<User,UserInstance>("User",UserSchema,"User");
UserModel.createIndexes((err) => {
  if(err) console.log(err)
})
export default UserModel