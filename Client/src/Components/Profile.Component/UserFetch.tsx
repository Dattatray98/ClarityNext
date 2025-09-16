import { api } from "../../Hooks/api";

export const fetchUserInfo = async () => {
  try {
    const response = await api.get("/api/user/getuserinfo", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(response.data);
    return response.data
    
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Failed to fetch user info");  
}}
