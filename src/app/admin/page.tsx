'use client';

import Link from 'next/link';
import { 
  BuildingOfficeIcon, 
  UserGroupIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';
import { useAppSelector } from '@/store/store';

export default function AdminDashboard() {
  const projects = useAppSelector((state) => state.projects.projects);
  const leads = useAppSelector((state) => state.leads.leads);
  
  const stats = [
    {
      name: 'Total Projects',
      value: projects.length,
      icon: BuildingOfficeIcon,
      href: '/admin/projects',
      color: 'bg-blue-500'
    },
    {
      name: 'Total Leads',
      value: leads.length,
      icon: UserGroupIcon,
      href: '/admin/leads',
      color: 'bg-green-500'
    },
    {
      name: 'New Leads',
      value: leads.filter(lead => lead.status === 'new').length,
      icon: UserGroupIcon,
      href: '/admin/leads',
      color: 'bg-yellow-500'
    },
    {
      name: 'Ready to Move',
      value: projects.filter(p => p.badges.includes('Ready to Move')).length,
      icon: CurrencyRupeeIcon,
      href: '/admin/projects',
      color: 'bg-purple-500'
    }
  ];

  // Sort projects by most recently added
  const recentProjects = [...projects]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your admin dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
          <Link 
            href="/admin/projects"
            className="text-sm text-primary hover:text-primary-dark"
          >
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={project.image}
                          alt={project.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {project.title}
                        </div>
                        <div className="text-sm text-gray-500">{project.specs}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{project.location}</div>
                    <div className="text-sm text-gray-500">{project.city}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-2">
                      {project.badges.map((badge, index) => (
                        <span
                          key={index}
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 