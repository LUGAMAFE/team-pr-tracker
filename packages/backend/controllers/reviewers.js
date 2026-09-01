import { response } from 'express';
import Reviewer from '../models/reviewer.js';
import Revision from '../models/revision.js';

const postReviewer = async (req, res = response) => {
  try {
    const { name, email } = req.body;
    const reviewer = new Reviewer({ name, email });

    await reviewer.save();
    res.json({
      msg: 'post API user - controller',
      reviewer,
    });
  } catch (e) {
    console.log(e);
  }
};

const putReviewer = async (req, res = response) => {
  const { id } = req.params;
  const { _id, email, ...rest } = req.body;

  const reviewer = await Reviewer.findByIdAndUpdate(id, rest).exec();

  res.json({
    msg: 'put API user - controller',
    reviewer,
  });
};

const deleteReviewer = async (req, res = response) => {
  try {
    const { email } = req.body;
    await Reviewer.findOneAndDelete({ email });
    const reviewers = await Reviewer.find();
    res.json({
      msg: 'delete API user - controller',
      reviewers,
    });
  } catch (e) {
    console.log('error in delete reviewer', e);
  }
};

const getAll = async (req, res = response) => {
  const allReviewers = await Reviewer.find();
  const reviewers = [...allReviewers].map((reviewer) => {
    const { email, name, _id } = reviewer;
    const id = _id.toString();
    return { email, name, id };
  });

  res.json({
    msg: 'get all reviewes API - controller',
    reviewers,
  });
};

const getCandidates = async (req, res = response) => {
  const { id: reviewerID } = req.params;

  // const reviewer = await Reviewer.findById(reviewerID).exec();
  const allRevisions = await Revision.find(); // findall no funciona
  const candidates = [...allRevisions].find((revision) => {
    const { reviewer, candidates } = revision;
    if (reviewer.toString() === reviewerID) return candidates;
    return false;
  });

  res.json({
    msg: 'get all reviewes API - controller',
    candidates,
  });
};

const getAllAsigns = async (req, res = response) => {
  const allReviewers = await Reviewer.find();
  const reviewers = [...allReviewers].map((reviewer) => {
    const { email, name, _id } = reviewer;
    const id = _id.toString();
    return { email, name, id };
  });

  res.json({
    msg: 'get all reviewes API - controller',
    reviewers,
  });
};

export { getCandidates, getAllAsigns, getAll, postReviewer, putReviewer, deleteReviewer };
