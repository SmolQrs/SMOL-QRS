export const logInfo = (message) => {
  console.log(message);
};

export const logWarning = (message) => {
  console.warn(message);
};

export const logError = (errorMessage) => {
  if (errorMessage instanceof Error) {
    console.error(errorMessage.message, errorMessage.stack);
  } else {
    console.error("ERROR: ", errorMessage);
  }
};
