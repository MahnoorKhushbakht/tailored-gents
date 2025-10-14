import  { Schema, model, models } from 'mongoose';

const cartSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Sign', 
    required: true,
  },
}, {
  timestamps: true, 
  versionKey: false,
});


const fieldSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Sign', 
    required: true,
  },
}, {
  timestamps: true, 
  versionKey: false,
});

const signSchema = new Schema({
 fields: [{ type: Schema.Types.ObjectId,
  ref: 'Field', 
  required: true, }],
  quantities: [{
    type: Schema.Types.ObjectId,
    ref: 'Cart', 
    required: true,
  }],
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true, // Ensure emails are unique for user identification
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  
}, {
  timestamps: true, 
  versionKey: false,
});


const commentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, 
  versionKey: false,
});


const Cart = models.Cart || model('Cart',cartSchema)
const Field = models.Field || model('Field', fieldSchema);
const Sign = models.Sign || model('Sign', signSchema);
const Comment = models.Comment || model('Comment', commentSchema);

export { Field, Sign, Comment,Cart };
