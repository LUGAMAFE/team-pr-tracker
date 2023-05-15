import { Schema, model } from 'mongoose';

const MemberSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
});

// Return the whole object but the  __v attributes
MemberSchema.methods.toJSON = function () {
  const { __v, ...candidateRest } = this.toObject();
  return candidateRest;
};

export default model('Member', MemberSchema);
