import { Schema, model, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY || "NDEVAAAAAAAAA"

interface User extends Document {
  username: string;
  email: string;
  avatar?: string;
  password: string;
  //method
  comparePassword: (password: string) => boolean;
  generateAuthToken: () => string;
}
interface UserInstance extends Model<User> {
  signUp: (input: User) => Promise<User>;
  generateHashPassword: (password: string) => string;
  getFromToken: (token: string) => Promise<User>;
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, lowercase: true },
  avatar: String,
  password: { type: String, require: true, select: false }
},
{
  timestamps: true,
});
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
UserSchema.methods.generateAuthToken = function() {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: '7d'})
  return token
}
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
UserSchema.index({username: 1})
const UserModel = model<User,UserInstance>("User",UserSchema,"User");
UserModel.createIndexes((err) => {
  if(err) console.log(err)
})
export default UserModel