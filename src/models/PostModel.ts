import { Schema, model, Model, Document, Date } from 'mongoose';
import { Topic } from './TopicModel';
import { User } from './UserModel';
interface Post extends Document {
  title: string;
  intro: string;
  contentUrl: string;
  thumbnailUrl: string;
  topic: Schema.Types.ObjectId | Topic;
  createdAt: Date;
  createBy: Schema.Types.ObjectId | User;
  //method
}
interface PostInstance extends Model<Post> {
}

const PostSchema = new Schema<Post>({
  title: { type: String, required: true},
  intro: { type: String, required: true, lowercase: true },
  contentUrl: { type: String },
  thumbnailUrl: { type: String, required: true},
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  createBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
},
{
  timestamps: true,
});

PostSchema.index({title: 1})
const PostModel = model<Post, PostInstance>("Post",PostSchema,"Post");
PostModel.createIndexes((err) => {
  if(err) console.log(err)
})
export default PostModel