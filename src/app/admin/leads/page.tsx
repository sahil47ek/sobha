'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateLeadStatus, deleteLead, type Lead } from '@/store/features/leadsSlice';
import { toast } from 'react-hot-toast';
import CustomDropdown from '@/components/CustomDropdown';

export default function LeadsManagement() {
  const dispatch = useAppDispatch();
  const leads = useAppSelector((state) => state.leads.leads);
  const [selectedStatus, setSelectedStatus] = useState<Lead['status'] | 'all'>('all');

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    dispatch(updateLeadStatus({ id: leadId, status: newStatus }));
    toast.success('Lead status updated successfully');
  };

  const handleDelete = (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      dispatch(deleteLead(leadId));
      toast.success('Lead deleted successfully');
    }
  };

  const filteredLeads = leads.filter(lead => 
    selectedStatus === 'all' ? true : lead.status === selectedStatus
  );

  const statusOptions = [
    { value: 'all', label: 'All Leads' },
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'converted', label: 'Converted' },
    { value: 'lost', label: 'Lost' }
  ];

  const leadStatusOptions = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'converted', label: 'Converted' },
    { value: 'lost', label: 'Lost' }
  ];

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-green-100 text-green-800',
    converted: 'bg-purple-100 text-purple-800',
    lost: 'bg-red-100 text-red-800'
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and track your leads from the contact form
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 w-48">
        <CustomDropdown
          options={statusOptions}
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value as Lead['status'] | 'all')}
          placeholder="Filter by status"
          variant="filter"
        />
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interest
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
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(lead.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.propertyInterest}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-40">
                        <CustomDropdown
                          options={leadStatusOptions}
                          value={lead.status}
                          onChange={(value) => handleStatusChange(lead.id, value as Lead['status'])}
                          className={statusColors[lead.status]}
                          variant="filter"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No leads found</p>
          </div>
        )}
      </div>
    </div>
  );
} 
