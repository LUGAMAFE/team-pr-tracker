import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

const RevisionSchema = Schema({
  date: {
    type: Date,
    required: [true, 'La fecha de creación es obligatoria'],
  },
  reviewerID: {
    type: ObjectId,
  },
  reviewer: {
    type: {
      id: { type: ObjectId },
      name: { type: String },
      email: { type: String },
    },
    required: [true, 'El ID del reclutador es obligatorio'],
  },
  members: {
    type: [
      {
        id: { type: ObjectId },
        name: { type: String },
        email: { type: String },
      },
    ],
    required: false,
  },
});

export default model('Revision', RevisionSchema);
