import { TbFidgetSpinner } from "react-icons/tb";

const Loading = () => {
  return (
    <div className="flex mt-10 justify-center">
      <TbFidgetSpinner className="animate-spin text-neutral-400" size={44} />
    </div>
  );
};

export default Loading;
