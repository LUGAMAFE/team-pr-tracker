import moment from 'moment/moment.js';
import { existsSync } from 'node:fs';
import Member from '../models/member.js';
import Reviewer from '../models/reviewer.js';
import Revision from '../models/revision.js';

const getAllMembers = async () => {
  const membersResult = await Member.find();
  const members = [...membersResult].map((member) => {
    const { _id, name, email } = member;
    const id = _id.toString();
    return { name, email, id };
  });
  return {
    members,
  };
};

const getAllReviewers = async () => {
  const allReviewers = await Reviewer.find();
  const reviewers = [...allReviewers].map((reviewer) => {
    const { email, name, _id } = reviewer;
    const id = _id.toString();
    return { email, name, id };
  });

  return {
    reviewers,
  };
};

const getAssingationRule = async () => {
  const NUMBER_REVIEWERS = 3;
  const lastAssignmentsDetailed = [];

  for (let i = 0; i < NUMBER_REVIEWERS; i++) {
    const dayOfInterest = moment()
      .subtract(i + 1, 'days')
      .startOf('day')
      .toDate();
    const assignmentInfo = await Revision.find({ date: dayOfInterest });

    const assignments = assignmentInfo.map((assign) => ({
      reviewer: assign.reviewer.name,
      members: assign.members.length,
    }));
    if (assignments.length > 0) {
      lastAssignmentsDetailed.push({
        date: dayOfInterest,
        assignments: assignmentInfo.map((assign) => ({
          reviewer: assign.reviewer.name,
          members: assign.members.length,
        })),
      });
    }
  }
  SaveJsonFile();
};

const SaveJsonFile = () => {
  const ASSIGN_FILE_PATH = 'files/assigns.json';
  if (existsSync(ASSIGN_FILE_PATH)) {
    console.log('exists');
  } else {
    console.log(ASSIGN_FILE_PATH + ' it doesnt exist');
  }
};

export { getAllMembers, getAllReviewers, getAssingationRule };
