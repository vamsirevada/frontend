const PostType = (type) => {
  if (type === 'Picture') {
    return 'Picture';
  } else if (type === 'Audio') {
    return 'Audio';
  } else if (type === 'Video') {
    return 'Video';
  } else {
    return 'default';
  }
};
export default PostType;
