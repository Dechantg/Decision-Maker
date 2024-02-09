

function getGMTOffset(localTimeZone) {
  const now = new Date();
  const gmtTime = new Date(now.toLocaleString('en-US', { timeZone: 'GMT' }));
  const localTime = new Date(now.toLocaleString('en-US', { timeZone: localTimeZone }));

  const gmtOffset = (localTime - gmtTime) / (60 * 60 * 1000);
  return gmtOffset;
};



function convertTimesToPST(items, localTimeZone) {


  return items.map((item) => {
    const opensAt = new Date(item.opens_at);
    const closesAt = new Date(item.closes_at);
    const createdAt = new Date(item.created_at);

    const differential = getGMTOffset(localTimeZone);

    opensAt.setHours(opensAt.getHours() + differential);
    closesAt.setHours(closesAt.getHours() + differential);
    createdAt.setHours(createdAt.getHours() + differential);

    return {
      ...item,
      opens_at: formatDate(opensAt),
      closes_at: formatDate(closesAt),
      created_at: formatDate(createdAt),  // Add this line
    };
  });
};

function formatDate(date) {
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleString('en-US', options);
}

module.exports = convertTimesToPST;
