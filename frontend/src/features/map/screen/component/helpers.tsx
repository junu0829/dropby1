export const returnMarkerStyle = (points) => {
  if (points >= 50) {
    return {
      width: 84,
      height: 84,
      size: 64,
      fontSize: 20,
      emojiSize: 30,
    };
  }

  if (points >= 25) {
    return {
      width: 78,
      height: 78,
      size: 58,
      fontSize: 19,
      emojiSize: 30,
    };
  }

  if (points >= 15) {
    return {
      width: 72,
      height: 72,
      size: 54,
      fontSize: 18,
      emojiSize: 30,
    };
  }

  if (points >= 2) {
    return {
      width: 50,
      height: 50,
      size: 50,
      fontSize: 17,
      emojiSize: 30,
    };
  }
};
