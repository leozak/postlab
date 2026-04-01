import { useContentStore } from "../../store/context";

const Posts = () => {
  const { posts } = useContentStore();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.map((post, index) => (
        <>
          <div
            key={index}
            className="bg-black mb-2 rounded-lg p-2 border border-neutral-700"
          >
            <div className="flex flex-row font-bold text-white align-middle">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-lrsllp r-1nao33i r-16y2uox r-8kz0gk"
              >
                <g>
                  <path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path>
                </g>
              </svg>
              <span className="ml-2">PostLab {index + 1}</span>
            </div>
            <div>
              <div className="mt-1 p-1 text-white">{post.text}</div>
              <div className="flex flex-wrap mt-2">
                {post.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="mr-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Posts;
