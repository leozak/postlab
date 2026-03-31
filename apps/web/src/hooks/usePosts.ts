import axios from "axios";
import { useState } from "react";

import { API_URL } from "../config";

export function usePosts() {
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(API_URL + "/posts");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    fetchPosts,
  };
}
