import Member from '../models/member.js';
import Reviewer from '../models/reviewer.js';

const existCandidateEmail = async (email = '') => {
  const existEmail = await Member.findOne({ email }).exec();
  if (existEmail) throw new Error(`el correo ${email} ya está registrado`);
};
const existReviewerEmail = async (email = '') => {
  const existEmail = await Reviewer.findOne({ email }).exec();
  if (existEmail) throw new Error(`el correo ${email} ya está registrado`);
};

export { existCandidateEmail, existReviewerEmail };
