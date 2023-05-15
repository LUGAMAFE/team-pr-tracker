import moment from 'moment';
import 'moment-timezone'; // Import the Moment.js timezone data

const formattedMoment = () => moment().tz('America/Mexico_City');

export { formattedMoment };
