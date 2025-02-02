export const formatPostDate = (date) => {
  const currentDate = new Date()
  const createdDate = new Date(date)

  const timeDifferenceInSeconds = Math.floor((currentDate - createdDate) / 100)
  const timeDifferentInMinutes = Math.floor(timeDifferenceInSeconds / 60)
  const timeDifferenceInHours = Math.floor(timeDifferentInMinutes / 60)
  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24)

  if (timeDifferenceInDays > 1) {
    return createdDate.toLocaleDateString(undefined, {month: 'short', day: 'numeric'})
  } else if (timeDifferenceInDays === 1) {
    return '1d'
  } else if (timeDifferenceInHours >= 1) {
    return `${timeDifferenceInHours}h`
  } else if (timeDifferentInMinutes >= 1) {
    return `${timeDifferentInMinutes}m`
  } else {
    return 'Justo ahora'
  }
}