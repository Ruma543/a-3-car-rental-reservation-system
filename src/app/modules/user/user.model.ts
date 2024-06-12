import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { USER_Role } from './user.const';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: Object.keys(USER_Role),
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0,
    },
    phone: {
      type: String,
      required: [true, 'Phone No is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
  },
  {
    timestamps: true,
    //for password remove from output
    toJSON: {
      transform: function (doc, res) {
        delete res.password;
        return res;
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  console.log(this, 'pre hook:we will save data');

  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.post('save', function (doc, next) {
  // doc.password = '';
  next();
});
export const User = model<TUser>('User', userSchema);
