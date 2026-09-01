import { Schema, model } from 'mongoose';

const RevisionSchema = Schema({
  date: {
    type: Date,
    required: [true, 'La fecha de creación es obligatoria'],
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: [true, 'Reviewer ID is mandatory'],
  },
  members: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    required: false,
  },
});

//Overwritting the schema to remove __v attribute for tojson() method
RevisionSchema.set('toJSON', {
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default model('Revision', RevisionSchema);
