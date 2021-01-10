const PostType = (type) => {
  if (type === "photo") {
    return "photo";
  } else if (type === "blog") {
    return "blog";
  } else if (type === "audio") {
    return "audio";
  } else if (type === "video") {
    return "video";
  } else {
    return "default";
  }
};
export default PostType;
