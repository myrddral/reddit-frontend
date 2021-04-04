const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

export { isValidUrl };

const timePassed = (postTimestamp) => {
  const actualTimestamp = new Date().getTime() / 1000;
  const minutesPassed = Math.round((actualTimestamp - postTimestamp) / 60);
  const hoursPassed = Math.round(minutesPassed / 60);
  const daysPassed = Math.round(hoursPassed / 24);
  const weeksPassed = Math.round(daysPassed / 7);
  const monthsPassed = Math.round(weeksPassed / 4);
  const yearsPassed = Math.round(monthsPassed / 12);
  if (minutesPassed < 1) {
    return ` a few seconds ago`;
  } else if (hoursPassed < 1) {
    return `${minutesPassed} minutes ago`;
  } else if (hoursPassed <= 23) {
    return `${hoursPassed} hours ago`;
  } else if (hoursPassed > 23 && hoursPassed < 168) {
    return `${daysPassed} days ago`;
  } else if (hoursPassed >= 168 && hoursPassed < 730) {
    return `${weeksPassed} weeks ago`;
  } else if (hoursPassed >= 730 && hoursPassed < 8765) {
    return `${monthsPassed} months ago`;
  } else if (hoursPassed >= 8765) {
    return `${yearsPassed} years ago`;
  }
};

export { timePassed };