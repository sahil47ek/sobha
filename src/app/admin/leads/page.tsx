'use client';

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { deleteLead, type Lead } from '@/store/features/leadsSlice';
import { toast } from 'react-hot-toast';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { setLeads } from '@/store/features/leadsSlice';

export default function LeadsManagement() {
  const dispatch = useAppDispatch();
  const leads = useAppSelector((state) => state.leads.leads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
      const data = await response.json();
      dispatch(setLeads(data));
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (lead: Lead) => {
    setSelectedLead(lead);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (lead: Lead) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        // Show loading state
        toast.loading('Deleting lead...');
        
        const response = await fetch('/api/leads/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lead),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to delete lead');
        }

        // Dismiss loading toast
        toast.dismiss();
        
        // Update local state
        dispatch(deleteLead(lead.id));
        toast.success('Lead deleted successfully');
        
        // Refresh leads list
        await fetchLeads();
      } catch (error) {
        // Dismiss loading toast
        toast.dismiss();
        
        console.error('Error deleting lead:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete lead';
        
        if (errorMessage.includes('Server configuration') || errorMessage.includes('Failed to delete lead from database')) {
          toast.error('Unable to delete lead at this time. Our team has been notified.');
          // Here you could also send an error report to your error tracking service
        } else {
          toast.error(errorMessage);
        }
      }
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading leads...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and track your leads from the contact form
        </p>
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleView(lead)}
                          className="text-black hover:text-black/80 transition-colors duration-300"
                          title="View Details"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(lead)}
                          className="text-black hover:text-black/80 transition-colors duration-300"
                          title="Delete Lead"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {leads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No leads found</p>
          </div>
        )}
      </div>

      {/* View Lead Modal */}
      {isViewModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Lead Details</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedLead.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedLead.phone}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Property Interest</label>
                <p className="mt-1 text-sm text-gray-900">{selectedLead.propertyInterest}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <p className="mt-1 text-sm text-gray-900">{selectedLead.message}</p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
