
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'consultant' | 'project_manager' | 'finance_head';
  created_at: string;
}

export interface Consultant {
  id: string;
  user_id: string;
  name: string;
  email: string;
  type: 'in_house' | 'freelancer';
  skills: string[];
  availability: boolean;
  hourly_rate: number;
  daily_rate: number;
  monthly_rate: number;
  phone?: string;
  profile_completed: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  project_code: string;
  name: string;
  description: string;
  required_skills: string[];
  billing_cycle: 'hourly' | 'daily' | 'monthly' | 'project_based';
  start_date: string;
  end_date: string;
  status: 'active' | 'completed' | 'on_hold';
  created_by: string;
}

export interface Assignment {
  id: string;
  consultant_id: string;
  project_id: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'completed';
}

export interface Timesheet {
  id: string;
  consultant_id: string;
  project_id: string;
  date: string;
  hours_worked: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_by?: string;
  reviewed_at?: string;
}

export interface Invoice {
  id: string;
  consultant_id: string;
  project_id: string;
  amount: number;
  billing_period_start: string;
  billing_period_end: string;
  status: 'draft' | 'sent' | 'paid';
  generated_on: string;
}
