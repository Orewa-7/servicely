import Buttons from "@/components/skills/Buttons";
import React from "react";

const page = () => {
  const api: string = process.env.API_END_POINT as string;

  const apiCalls = [
    {
      path: "/api/skills",
      name: "Get all skills",
      method: "GET",
    },
    {
      path: "/api/skills",
      name: "Create a Skill",
      method: "POST",
      fields: ["idCategory", "name", "description"],
    },
    {
      path: "/api/skills",
      name: "Get one skill",
      method: "GET",
      fields: ["idSkill"],
    },
    {
      path: "/api/skills",
      name: "Update one skill",
      method: "PUT",
      fields: ["idSkill", "idCategory", "name", "description"],
    },
    {
      path: "/api/skills",
      name: "Delete one skill",
      method: "DELETE",
      fields: ["idSkill"],
    },
  ];

  return (
    <section className="h-screen w-full px-16 ">
      <h1 className="h1-bold">Skills</h1>
      <Buttons apiCalls={apiCalls} api={api} />
    </section>
  );
};

export default page;
