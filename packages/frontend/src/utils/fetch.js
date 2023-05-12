export async function fetchMembers() {
  try {
    const endPoint = import.meta.env.VITE_REACT_APP_REST_API + '/members/getAll';
    const response = await fetch(endPoint);
    if (!response.ok) {
      throw new Error('Error en la solicitud al endpoint');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error al obtener los datos de los estudiantes');
  }
}
export async function fetchReviewers() {
  try {
    const endPoint = import.meta.env.VITE_REACT_APP_REST_API + '/revisions/assignation-of-today';
    const response = await fetch(endPoint);
    if (!response.ok) {
      throw new Error('Error en la solicitud al endpoint');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error al obtener los datos de los miembro');
  }
}

// Función para agregar un nuevo usuario
export async function addMember(newUser) {
  try {
    const endPoint = import.meta.env.VITE_REACT_APP_REST_API + '/members';
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error al agregar al miembro');
  }
}
export async function addReviewer(newUser) {
  try {
    const endPoint = import.meta.env.VITE_REACT_APP_REST_API + '/reviewers';
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error al agregar al reviewer');
  }
}

export async function deleteMember(email) {
  try {
    const path = import.meta.env.VITE_REACT_APP_REST_API + '/members'; //cambiar por member
    const response = await fetch(path, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error al eliminar al member');
  }
}
export async function deleteReviewer(email) {
  try {
    const path = import.meta.env.VITE_REACT_APP_REST_API + '/reviewers'; //cambiar por member
    const response = await fetch(path, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error al eliminar al reviewer');
  }
}
export async function rollMembers() {
  try {
    const endPoint = import.meta.env.VITE_REACT_APP_REST_API + '/revisions/force-assignation-of-today';
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error al forzar la reasignacion');
  }
}
