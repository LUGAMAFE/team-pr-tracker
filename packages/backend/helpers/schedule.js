import moment from 'moment';
import cron from 'node-cron';
import Revision from '../models/revision.js';
import { assignNewRevisions } from './revisions.js';

//Apparently America/Mexico_City is working with 1 offset hour
export const scheduleAssignation = async () => {
  cron.schedule(
    '1 0 1 * * *',
    async () => {
      const date = moment().startOf('day').toDate();
      const assignations = await assignNewRevisions();
      const revision = await Revision.create([...assignations.map((a) => ({ date, ...a }))]);
      revision.save();
      // new Revision({ date: today, reviewerID: reviewer, members, reviewer: reviewerObject });
    },
    {
      scheduled: true,
      timezone: 'America/Mexico_City', // Change this to your local timezone
    }
  );
};
