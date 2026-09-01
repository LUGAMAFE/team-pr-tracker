import { response } from 'express';
import Member from '../models/member.js';

const postMember = async (req, res = response) => {
  try {
    const { name, email } = req.body;
    const member = new Member({ name, email });

    await member.save();
    res.json({
      msg: 'post API user - controller',
      member,
    });
  } catch (e) {
    console.log(e);
  }
};

const putMember = async (req, res = response) => {
  const { _id, email, ...rest } = req.body;

  const member = await Member.findOneAndUpdate({ email }, rest).exec();
  // const member = await Member.findByIdAndUpdate(id, rest).exec();

  res.json({
    msg: 'put API user - controller',
    member,
  });
};

const deleteMember = async (req, res = response) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error('no email sent');
    }
    await Member.findOneAndDelete({ email });
    const members = await Member.find();
    res.json({
      msg: 'delete API user / return all the remaining students - controller',
      members,
    });
  } catch (e) {
    res.status = 400;
    res.send('No email was sent to delete');
    console.log('error in delete reviewer', e);
  }
};

const getAll = async (req, res = response) => {
  const membersResult = await Member.find();
  const members = [...membersResult].map((memb) => {
    const { _id, name, email } = memb;
    const id = _id.toString();
    return { name, email, id };
  });
  res.json({
    msg: 'get all API candidates - controller',
    members,
  });
};
export { getAll, postMember, putMember, deleteMember };
