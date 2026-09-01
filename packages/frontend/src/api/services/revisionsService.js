import dayjs from 'dayjs';
import 'dayjs/locale/es.js'; // Importa la localización en español
import localizedFormat from 'dayjs/plugin/localizedFormat.js'; // Importa el plugin
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import { fetchData } from '../apiClient.js';

dayjs.extend(localizedFormat); // Extiende Day.js con el plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('es'); // Configura Day.js para usar español
dayjs.tz.setDefault('America/Mexico_City'); // Configura la zona horaria de México por defecto

export const formatRevisions = (revisions) => {
  if (!revisions) return [];

  const reviewers = revisions
    .filter((assignment) => assignment.reviewer !== null)
    .map((assignment) => ({
      id: assignment.reviewer?._id,
      name: assignment.reviewer?.name,
      email: assignment.reviewer?.email,
      members: assignment.members,
    }));

  reviewers.sort((a, b) => a.name?.localeCompare(b.name));
  return reviewers;
};

export const fetchRevisions = async () => {
  const data = await fetchData('/revisions/assignation-of-today');
  return {
    revisions: formatRevisions(data.revisions),
    date: dayjs(data.revisions[0].date).format('LL'), // Usa 'LL' para un formato localizado de la fecha
  };
};

export const rollReviews = async () => {
  return fetchData('/revisions/force-assignation-of-today', 'POST');
};
