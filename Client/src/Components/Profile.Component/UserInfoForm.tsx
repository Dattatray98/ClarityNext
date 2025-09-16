import React, { useState } from "react";
import axios from "axios";

interface Link {
  linkName: string;
  link: string;
}

interface Skill {
  skill: string;
}

interface Project {
  title: string;
  description: string;
  timeline: string;
  projectLink: string;
}

interface UserInfo {
  links: Link[];
  skills: Skill[];
  projects: Project[];
}

const UserInfoForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    links: [{ linkName: "", link: "" }],
    skills: [{ skill: "" }],
    projects: [{ title: "", description: "", timeline: "", projectLink: "" }],
  });

  // handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: keyof UserInfo,
    field: string
  ) => {
    const values = [...userInfo[type]];
    (values[index] as any)[field] = e.target.value;
    setUserInfo({ ...userInfo, [type]: values });
  };

  // add new field
  const handleAdd = (type: keyof UserInfo) => {
    const newItem =
      type === "links"
        ? { linkName: "", link: "" }
        : type === "skills"
        ? { skill: "" }
        : { title: "", description: "", timeline: "", projectLink: "" };

    setUserInfo({ ...userInfo, [type]: [...userInfo[type], newItem] });
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/user/userinfo",
        userInfo,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Data saved")
      console.log("✅ Data saved:", res.data);
    } catch (error: any) {
      console.error("❌ Error posting user info:", error.response?.data || error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-xl border-gray-300 shadow-sm p-8"
    >
      <h2 className="text-xl font-semibold mb-4">User Info</h2>

      {/* Links */}
      <h3 className="font-medium mt-9 mb-3">Links</h3>
      {userInfo.links.map((link, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            placeholder="Link Name"
            value={link.linkName}
            onChange={(e) => handleChange(e, index, "links", "linkName")}
            className="border border-gray-200 outline-none focus:bg-gray-100 focus:shadow-sm p-2 w-full rounded mb-2"
          />
          <input
            type="text"
            placeholder="Link URL"
            value={link.link}
            onChange={(e) => handleChange(e, index, "links", "link")}
            className="border border-gray-200 outline-none focus:bg-gray-100 focus:shadow-sm p-2 w-full rounded mb-2"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => handleAdd("links")}
        className="mb-4 bg-gray-200 px-3 py-1 rounded"
      >
        + Add Link
      </button>

      {/* Skills */}
      <h3 className="font-medium mt-9 mb-3">Skills</h3>
      {userInfo.skills.map((skill, index) => (
        <input
          key={index}
          type="text"
          placeholder="Skill"
          value={skill.skill}
          onChange={(e) => handleChange(e, index, "skills", "skill")}
          className="border border-gray-200 outline-none focus:bg-gray-100 focus:shadow-sm p-2 w-full rounded mb-2"
        />
      ))}
      <button
        type="button"
        onClick={() => handleAdd("skills")}
        className="border border-gray-200 outline-none focus:bg-gray-100 focus:shadow-sm p-2 w-full rounded mb-2"
      >
        + Add Skill
      </button>

      {/* Projects */}
      <h3 className="font-medium mt-9 mb-3">Projects</h3>
      {userInfo.projects.map((project, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            placeholder="Title"
            value={project.title}
            onChange={(e) => handleChange(e, index, "projects", "title")}
            className="border border-gray-200 outline-none focus:bg-gray-100 focus:shadow-sm p-2 w-full rounded mb-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={project.description}
            onChange={(e) => handleChange(e, index, "projects", "description")}
            className="border border-gray-200 outline-none focus:bg-gray-100 focus:shadow-sm p-2 w-full rounded mb-2"
          />
          <input
            type="text"
            placeholder="Timeline"
            value={project.timeline}
            onChange={(e) => handleChange(e, index, "projects", "timeline")}
            className="border border-gray-200 outline-none focus:bg-gray-100 focus:shadow-sm p-2 w-full rounded mb-2"
          />
          <input
            type="text"
            placeholder="Project Link"
            value={project.projectLink}
            onChange={(e) => handleChange(e, index, "projects", "projectLink")}
            className="border border-gray-200 outline-none focus:bg-gray-100 focus:shadow-sm p-2 w-full rounded mb-2"
          />
        </div>
      ))}

      <div className="flex gap-5 items-center ">

      <button
        type="button"
        onClick={() => handleAdd("projects")}
        className=" bg-gray-200 px-3 py-2 rounded"
      >
        + Add Project
      </button>

      <button
        type="submit"
        className=" bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Info
      </button>

      </div>
    </form>
  );
};

export default UserInfoForm;
