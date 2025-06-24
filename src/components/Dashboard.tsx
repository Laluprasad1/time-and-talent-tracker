
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { User, Calendar, Clock, FileText, LogOut } from 'lucide-react';
import { User as UserType } from '@/types';

interface DashboardProps {
  user: UserType;
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'project_manager': return 'bg-blue-100 text-blue-800';
      case 'consultant': return 'bg-green-100 text-green-800';
      case 'finance_head': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNavItems = () => {
    const baseItems = [
      { id: 'overview', label: 'Overview', icon: User },
    ];

    switch (user.role) {
      case 'admin':
        return [
          ...baseItems,
          { id: 'consultants', label: 'Consultants', icon: User },
          { id: 'projects', label: 'Projects', icon: FileText },
          { id: 'reports', label: 'Reports', icon: FileText },
        ];
      case 'project_manager':
        return [
          ...baseItems,
          { id: 'projects', label: 'My Projects', icon: FileText },
          { id: 'timesheets', label: 'Timesheet Approval', icon: Clock },
        ];
      case 'consultant':
        return [
          ...baseItems,
          { id: 'profile', label: 'My Profile', icon: User },
          { id: 'timesheets', label: 'Timesheets', icon: Clock },
          { id: 'projects', label: 'My Projects', icon: FileText },
        ];
      case 'finance_head':
        return [
          ...baseItems,
          { id: 'billing', label: 'Billing', icon: FileText },
          { id: 'reports', label: 'Financial Reports', icon: FileText },
        ];
      default:
        return baseItems;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent user={user} />;
      case 'consultants':
        return user.role === 'admin' ? <ConsultantsContent /> : <div>Access denied</div>;
      case 'projects':
        return <ProjectsContent user={user} />;
      case 'timesheets':
        return <TimesheetsContent user={user} />;
      case 'profile':
        return user.role === 'consultant' ? <ProfileContent user={user} /> : <div>Access denied</div>;
      case 'billing':
        return user.role === 'finance_head' ? <BillingContent /> : <div>Access denied</div>;
      case 'reports':
        return <ReportsContent user={user} />;
      default:
        return <OverviewContent user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Consultancy Management System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">{user.name}</span>
                <Badge className={getRoleBadgeColor(user.role)}>
                  {user.role.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <nav className="w-64 space-y-2 mr-8">
            {getNavItems().map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const OverviewContent = ({ user }: { user: UserType }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Welcome back, {user.name}!
      </h2>
      <p className="text-gray-600">
        Here's an overview of your consultancy management system.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Active Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-green-600">+2 from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Consultants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">48</div>
          <p className="text-xs text-blue-600">6 freelancers, 42 in-house</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Pending Timesheets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">23</div>
          <p className="text-xs text-orange-600">Requires approval</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Monthly Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,200</div>
          <p className="text-xs text-green-600">+8.2% from last month</p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest updates from your consultancy system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">New project "Mobile App Development" created</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Timesheet approved for John Doe</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">New consultant Sarah Wilson onboarded</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ConsultantsContent = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">Consultants</h2>
      <Button>Add New Consultant</Button>
    </div>
    
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">John Doe</div>
                  <div className="text-sm text-gray-500">john@company.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="secondary">In-house</Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">React</Badge>
                    <Badge variant="outline" className="text-xs">TypeScript</Badge>
                    <Badge variant="outline" className="text-xs">Node.js</Badge>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className="bg-green-100 text-green-800">Available</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="outline" size="sm">View Details</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ProjectsContent = ({ user }: { user: UserType }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">
        {user.role === 'admin' ? 'All Projects' : 'My Projects'}
      </h2>
      {user.role === 'admin' && <Button>Create New Project</Button>}
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">E-commerce Platform</CardTitle>
              <CardDescription>PRJ-001</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Building a modern e-commerce platform with React and Node.js
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Consultants:</span>
              <span>5</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Billing:</span>
              <span>Hourly</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">End Date:</span>
              <span>Dec 31, 2024</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const TimesheetsContent = ({ user }: { user: UserType }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">
        {user.role === 'project_manager' ? 'Timesheet Approvals' : 'My Timesheets'}
      </h2>
      {user.role === 'consultant' && <Button>Submit New Timesheet</Button>}
    </div>
    
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2024-06-24
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  E-commerce Platform
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  8.0
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.role === 'project_manager' ? (
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" className="text-green-600">
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm">View</Button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ProfileContent = ({ user }: { user: UserType }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-500">Name</Label>
            <p className="text-sm text-gray-900">{user.name}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">Email</Label>
            <p className="text-sm text-gray-900">{user.email}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">Role</Label>
            <p className="text-sm text-gray-900 capitalize">{user.role.replace('_', ' ')}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-500">Skills</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Node.js</Badge>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">Hourly Rate</Label>
            <p className="text-sm text-gray-900">$75/hour</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">Availability</Label>
            <Badge className="bg-green-100 text-green-800">Available</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const BillingContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Billing & Invoices</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Billable Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,248</div>
          <p className="text-xs text-blue-600">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Outstanding Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$23,450</div>
          <p className="text-xs text-orange-600">12 invoices pending</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Paid This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$89,200</div>
          <p className="text-xs text-green-600">45 invoices paid</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

const ReportsContent = ({ user }: { user: UserType }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Consultant Utilization</CardTitle>
          <CardDescription>
            Hours worked vs available hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">John Doe</span>
              <span className="text-sm text-gray-500">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Cost Overview</CardTitle>
          <CardDescription>
            Cost breakdown by project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">E-commerce Platform</span>
              <span className="text-sm font-medium">$45,200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Mobile App</span>
              <span className="text-sm font-medium">$32,800</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Web Portal</span>
              <span className="text-sm font-medium">$28,500</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Dashboard;
