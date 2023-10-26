// Function to calculate the timestamps of opens_at & closes_at
function calculateTimestamps (days, hours, minutes) {
  const now = new Date();
  const opens_at = new Date(now);
  opens_at.setMinutes(now.getMinutes() + minutes);
  opens_at.setHours(now.getHours() + hours);
  opens_at.setDate(now.getDate() + days);

  const closes_at = new Date(opens_at);

  return {
    opens_at,
    closes_at,
  };
}

module.exports = {
  calculateTimestamps,
};
