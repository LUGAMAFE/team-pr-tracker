import { response } from 'express';
import moment from 'moment/moment.js';
import mongoose from 'mongoose';
import { getAllMembers, getAllReviewers } from '../helpers/getters.js';
import Reviewer from '../models/reviewer.js';
import Revision from '../models/revision.js';

// FIXME: esto de que sirve?
const getReviewer = (req, res = response) => {
  const query = req.query;
  res.json({
    msg: 'get API - controller',
    query,
  });
};

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

const saveAssignments = async (members, reviewerID, reviewerObject) => {
  try {
    if (!members || !reviewerID) return;
    const today = moment().startOf('day').toDate();
    const reviewer = new mongoose.Types.ObjectId(reviewerID);
    const existAssignment = await Revision.findOne({ reviewerID: reviewer, date: today }).exec();

    if (existAssignment) return false;

    const revision = new Revision({ date: today, reviewerID: reviewer, members, reviewer: reviewerObject });

    await revision.save();
    return true;
  } catch (e) {
    console.log('error', e);
  }
};

const getTodayRevision = async (req, res = response) => {
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  const { members } = await getAllMembers();
  const { reviewers } = await getAllReviewers();
  if (members === undefined || members === null || members.length === 0) {
    return res.json({
      msg: 'Get random assignments API - No members to assign - controller',
      assignments: {},
    });
  }
  if (reviewers === undefined || reviewers === null || reviewers.length === 0) {
    return res.json({
      msg: 'Get random assignments API - No reviewers to assign - controller',
      assignments: {},
    });
  }
  const candidatesPerReviewer = members.length / reviewers.length;
  const candidatesOffset = members.length % reviewers.length;

  shuffle(members);
  // shuffle(reviewers);

  // getAssingationRule();

  let candidatesFrom = 0;
  let candidatesTo = candidatesPerReviewer;
  const assignments = await Promise.all(
    reviewers.map(async (reviewer) => {
      if (candidatesOffset > 0) {
        const candidatesToAssign = members.slice(candidatesFrom, candidatesTo + 1);
        candidatesFrom += candidatesPerReviewer + 1;
        candidatesTo += candidatesPerReviewer + 1;
        const isSaved = await saveAssignments(candidatesToAssign, reviewer.id, reviewer);
        if (isSaved) {
          return {
            reviewer: {
              ...reviewer,
              assigned_students: candidatesToAssign,
            },
          };
        }
      }
      const candidatesToAssign = members.slice(candidatesFrom, candidatesTo);
      candidatesFrom += candidatesPerReviewer;
      candidatesTo += candidatesPerReviewer;
      const isSaved = await saveAssignments(candidatesToAssign, reviewer.id, reviewer);
      if (isSaved) {
        return {
          reviewer: {
            ...reviewer,
            assigned_students: candidatesToAssign,
          },
        };
      }
      const today = moment().startOf('day').toDate();
      const { members: cands } = await Revision.findOne({
        reviewerID: new mongoose.Types.ObjectId(reviewer.id),
        date: today,
      }).exec();
      const assignedCandidates = cands.map((cand) => ({ id: cand.id, name: cand.name, email: cand.email }));
      return {
        reviewer: {
          ...reviewer,
          assigned_students: assignedCandidates,
        },
      };
    })
  );

  res.json({
    msg: 'Get random assignments API - controller',
    assignments,
  });
};
export { getReviewer, getCandidates, getAllAsigns, getTodayRevision, getAll, postReviewer, putReviewer, deleteReviewer };
