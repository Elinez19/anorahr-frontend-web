import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Filter, UserPlus } from "lucide-react";
import { ReusableTable } from "./reusable-table";
import {
  getEmployeeColumns,
  sampleEmployeeData,
} from "./employee-table-columns";
import type { Employee } from "@/interfaces/hr";

export function HREmployeesTable() {
  const [employees, setEmployees] = useState<Employee[]>(sampleEmployeeData);

  const handleEditEmployee = (employee: Employee) => {
    console.log("Edit employee:", employee);
    // Implement edit functionality
  };

  const handleDeleteEmployee = (employee: Employee) => {
    console.log("Delete employee:", employee);
    // Implement delete functionality
  };

  const handleViewEmployee = (employee: Employee) => {
    console.log("View employee:", employee);
    // Implement view functionality
  };

  const handleDataChange = (newData: Employee[]) => {
    setEmployees(newData);
  };

  const handleDeleteRows = (rows: Employee[]) => {
    const updatedData = employees.filter(
      (employee) => !rows.some((row) => row.id === employee.id)
    );
    setEmployees(updatedData);
  };

  const columns = getEmployeeColumns(
    handleEditEmployee,
    handleDeleteEmployee,
    handleViewEmployee
  );

  const customActions = (
    <>
      <Button variant="outline" size="sm">
        <Filter className="w-4 h-4 mr-2" />
        Filter
      </Button>
      <Button variant="outline" size="sm">
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>
      <Button size="sm" asChild>
        <a href="/dashboard/employees/add">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Employee
        </a>
      </Button>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Employees</h2>
      </div>

      <ReusableTable
        data={employees}
        columns={columns}
        searchPlaceholder="Search employees..."
        searchColumn="firstName"
        filterColumns={[
          {
            columnId: "status",
            label: "Status",
            options: [
              {
                value: "active",
                label: "Active",
                count: employees.filter((e) => e.status === "active").length,
              },
              {
                value: "inactive",
                label: "Inactive",
                count: employees.filter((e) => e.status === "inactive").length,
              },
              {
                value: "on_leave",
                label: "On Leave",
                count: employees.filter((e) => e.status === "on_leave").length,
              },
            ],
          },
          {
            columnId: "department",
            label: "Department",
            options: [
              {
                value: "Engineering",
                label: "Engineering",
                count: employees.filter((e) => e.department === "Engineering")
                  .length,
              },
              {
                value: "HR",
                label: "HR",
                count: employees.filter((e) => e.department === "HR").length,
              },
              {
                value: "Marketing",
                label: "Marketing",
                count: employees.filter((e) => e.department === "Marketing")
                  .length,
              },
              {
                value: "Finance",
                label: "Finance",
                count: employees.filter((e) => e.department === "Finance")
                  .length,
              },
            ],
          },
        ]}
        onDataChange={handleDataChange}
        onDeleteRows={handleDeleteRows}
        emptyMessage="No employees found."
        customActions={customActions}
      />
    </div>
  );
}
