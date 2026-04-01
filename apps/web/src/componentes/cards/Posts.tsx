import { useContentStore } from "../../store/context";

const Posts = () => {
  const { posts } = useContentStore();
  console.log(posts);
  return (
    <div>
      {posts.map((post, index) => (
        <>
          <div
            key={index}
            className="bg-neutral-950 mt-1 m-2 p-4 rounded-b-2xl"
          >
            {post.text}
          </div>
          <div>
            {post.tags.map((tag, index) => (
              <span className="mr-2" key={index}>
                #{tag}
              </span>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default Posts;
