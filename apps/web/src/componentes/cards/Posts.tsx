import { useContentStore } from "../../store/context";

const Posts = () => {
  const { posts } = useContentStore();
  return <div>Posts</div>;
};

export default Posts;
