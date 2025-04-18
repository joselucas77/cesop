import { Departments } from "@prisma/client";

export const getDepartments = async () => {
  try {
    const response = await fetch("/api/departments", {
      cache: "no-cache",
    });
    if (!response.ok) throw new Error("Erro ao buscar os dados");

    const departments = await response.json();
    return departments;
  } catch (error) {
    console.error("Erro ao buscar os departamentos:", error);
    return [];
  }
};

export const getDepartmentByName = async (name: string) => {
  try {
    const response = await fetch(`/api/departments`, {
      cache: "no-cache",
    });
    if (!response.ok) throw new Error("Erro ao buscar os dados");

    const department = await response.json();
    const departmentFound: Departments = department.find(
      (dept: Departments) => dept.name === name
    );
    if (!departmentFound) throw new Error("Departamento não encontrado");
    return departmentFound;
  } catch (error) {
    console.error("Erro ao buscar o departamento:", error);
    return null;
  }
};
