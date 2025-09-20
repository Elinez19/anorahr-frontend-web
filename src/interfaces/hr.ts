export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hireDate: string;
  status: "active" | "inactive" | "on_leave";
  salary?: number;
  manager?: string;
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  employeeCount: number;
  manager: string;
  budget?: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: "annual" | "sick" | "maternity" | "paternity" | "emergency";
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  reason: string;
}

export interface HRStats {
  totalEmployees: number;
  totalDepartments: number;
  activeLeaves: number;
  pendingRequests: number;
  newHiresThisMonth: number;
  employeesOnLeave: number;
  averageTenure: number;
  turnoverRate: number;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewPeriod: string;
  rating: number;
  goals: string[];
  achievements: string[];
  nextSteps: string[];
  reviewer: string;
  reviewDate: string;
}
