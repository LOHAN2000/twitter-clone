export const formatPostDate = (date) => {
  const currentDate = new Date();
  const createdDate = new Date(date);

  const timeDifferenceInSeconds = Math.floor((currentDate - createdDate) / 1000);
  const timeDifferentInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  const timeDifferenceInHours = Math.floor(timeDifferentInMinutes / 60);
  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

  if (timeDifferenceInDays > 1) {
    return createdDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } else if (timeDifferenceInDays === 1) {
    return '1d';
  } else if (timeDifferenceInHours >= 1) {
    return `${timeDifferenceInHours}h`;
  } else if (timeDifferentInMinutes >= 1) {
    return `${timeDifferentInMinutes}m`;
  } else {
    return 'Justo ahora';
  }
}

export const formatMemberSinceDate = (createdAt) => {
  const date = new Date(createdAt);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `Se unió ${month} ${year}`;
}
