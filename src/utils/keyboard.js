export const handleEnterSubmit = (e, callback) => {
  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
    e.preventDefault();
    callback();
  }
};
