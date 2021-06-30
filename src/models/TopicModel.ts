import { Schema, model, Model, Document } from 'mongoose';

export interface Topic extends Document {
  name: string;
  value: string;
  postCount: number;
  imageUrl: string;
  //method
}
interface TopicInstance extends Model<Topic> {
}

const TopicSchema = new Schema<Topic>({
  name: { type: String, required: true},
  value: { type: String, required: true, lowercase: true },
  postCount: { type: Number, default: 0},
  imageUrl: { type: String, required: true},
},
{
  timestamps: true,
});

TopicSchema.index({name: 1})
const TopicModel = model<Topic, TopicInstance>("Topic",TopicSchema,"Topic");
TopicModel.createIndexes((err) => {
  if(err) console.log(err)
})
export default TopicModel