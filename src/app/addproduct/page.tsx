"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { list, remove, create } from "../Functions/project";
import { useAuth } from "../Contexts/authContext";
import type { CreateProjectType, Project} from "../Types/type";
import { getUserIdByUsername } from "../Functions/auth";



function AddProductPage() {
  const auth = useAuth();
  const [form, setForm] = useState<CreateProjectType>({
    project_name: "",
    price: 200, // แก้เป็น number
    description: "",
    start_date: "2024-09-02",
    end_date: "2025-09-02",
    project_type_id: 1, // แก้เป็น number
    created_by: 1, // เพิ่ม created_by (หาค่าที่เหมาะสม)
    certification_name: "ISO 9001", // เพิ่มฟิลด์ certification_name
    issuing_organization: "ISO Organization", // เพิ่มฟิลด์ issuing_organization
    issued_date: "2024-09-02", // เพิ่มฟิลด์ issued_date
    expiry_date: "2025-09-02", // เพิ่มฟิลด์ expiry_date
    credit_amount: 300, // เพิ่มฟิลด์ credit_amount
  });

  const [listProjects, setListProjects] = useState<Project[]>([]);

  const handleListProjectList = async () => {
    try {
      const response = await list();
      if (response != null && response.ok) {
        const result = await response.json();
        setListProjects(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id: number) => {
    try {
      const res = await remove(id);
      if (res != null && res.ok) {
        const result = await res.json();
        console.log(result);
        handleListProjectList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "price" ||
        name === "project_type_id" ||
        name === "credit_amount"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth || !auth.user) {
      console.error("User is not authnticatd.");
      return;
    }
    try {
      const user_id_response = await getUserIdByUsername(auth.user)
      const user_id_json = await user_id_response.json();
      const user_id = user_id_json[0].user_id;
      const response = await create({...form, created_by: user_id});

      if (response && response.ok) {
        const result = await response.json();
        console.log("Project created succesfully: ",result)
      } else {
        console.error("Failed to create project: ",response)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="ml-10 text-2xl ">Form Product</h2>
      <form className="ml-10" onSubmit={handleSubmit}>
        <label htmlFor="">Project_name</label>
        <input
          type="text"
          name="project_name"
          className="ring-1 ring-gray-500"
          placeholder="Project Name"
          onChange={handleChange}
          value={form.project_name}
        />{" "}
        <br />
        <label htmlFor="">Price</label>
        <input
          type="number"
          name="price"
          className="ring-1 ring-gray-500"
          placeholder="Price"
          onChange={handleChange}
          value={form.price}
        />{" "}
        <br />
        <label htmlFor="">Description</label>
        <input
          type="text"
          name="description"
          className="ring-1 ring-gray-500"
          placeholder="Issued Date"
          onChange={handleChange}
          value={form.description}
        />{" "}
        <br />
        <label htmlFor="">Start_date</label>
        <input
          type="date"
          name="start_date"
          className="ring-1 ring-gray-500"
          placeholder="Start Date"
          onChange={handleChange}
          value={form.start_date}
        />{" "}
        <br />
        <label htmlFor="">End_date</label>
        <input
          type="date"
          name="end_date"
          className="ring-1 ring-gray-500"
          placeholder="End Date"
          onChange={handleChange}
          value={form.end_date}
        />{" "}
        <br />
        <label htmlFor="">project_type_id</label>
        <input
          type="number"
          name="project_type_id"
          className="ring-1 ring-gray-500"
          placeholder="project_type_id"
          onChange={handleChange}
          value={form.project_type_id}
        />{" "}
        <br />
        <label htmlFor="">created_by</label>
        <input
          type="number"
          name="created_by"
          className="ring-1 ring-gray-500"
          placeholder="created_by"
          onChange={handleChange}
          value={form.created_by}
        />{" "}
        <br />
        <label htmlFor="">Certification_name</label>
        <input
          type="text"
          name="certification_name"
          className="ring-1 ring-gray-500"
          placeholder="Certification Name"
          onChange={handleChange}
          value={form.certification_name}
        />{" "}
        <br />
        <label htmlFor="">issuing_organization</label>
        <input
          type="text"
          name="issuing_organization"
          className="ring-1 ring-gray-500"
          placeholder="issuing_organization"
          onChange={handleChange}
          value={form.issuing_organization}
        />{" "}
        <br />
        <label htmlFor="">issuded_date</label>
        <input
          type="date"
          name="issued_date"
          className="ring-1 ring-gray-500"
          placeholder="issued_date"
          onChange={handleChange}
          value={form.issued_date}
        />{" "}
        <br />
        <label htmlFor="">expiry_date</label>
        <input
          type="date"
          name="expiry_date"
          className="ring-1 ring-gray-500"
          placeholder="expiry_date"
          onChange={handleChange}
          value={form.expiry_date}
        />{" "}
        <br />
        <label htmlFor="">credit_amount</label>
        <input
          type="number"
          name="credit_amount"
          className="ring-1 ring-gray-500"
          placeholder="credit_amount"
          onChange={handleChange}
          value={form.credit_amount}
        />{" "}
        <br />
        <br />
        <br />
        <button type="submit" className="ring-1 ring-black p-4 mt-2">
          Submit
        </button>
      </form>

      <br />

      <button
        className="ring-1 ring-black p-4 m-4"
        onClick={handleListProjectList}
      >
        Get All ListProject
      </button>

      {listProjects && (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="text-lg font-semibold tracking-wide border-r-2 w-1/3">
                Project Name
              </th>
              <th className="text-lg font-semibold tracking-wide border-r-2 w-1/3">
                Project Description
              </th>
              <th className="text-lg font-semibold tracking-wide border-r-2 w-1/3">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {listProjects.map((listProject, index) => (
              <tr
                key={index}
                className={`border-b-2 border-gray-200 ${
                  index % 2 == 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="text-center border-r-2">
                  {listProject.project_name}
                </td>
                <td className="text-center border-r-2">
                  {listProject.description}
                </td>
                <td className="flex flex-row justify-between px-16">
                  <Link href={`/editProject/${listProject.project_id}`}>
                    edit
                  </Link>
                  <button onClick={() => handleRemove(listProject.project_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default AddProductPage;
