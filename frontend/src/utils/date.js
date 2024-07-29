export const formatDate = d => {  
  if (!(d instanceof Date)) {
    throw new Error('Invalid "date" argument. You must pass a date instance')
  }

  return [d.getFullYear(),
               String(d.getMonth() + 1).padStart(2, '0'),
               String(d.getDate()).padStart(2, '0')].join('-') +' ' +
    d.toLocaleDateString('en-US', {
        timeZoneName: 'short',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    }).slice(10)
}
