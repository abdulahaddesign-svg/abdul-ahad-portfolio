'use client';

import React, { useEffect, useState } from 'react';
import { 
  MessageSquare, 
  Trash2, 
  Mail, 
  Phone, 
  Building, 
  Clock, 
  CheckCircle, 
  Archive,
  RefreshCw 
} from 'lucide-react';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '@/lib/data';
import { Inquiry } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await getInquiries();
      setInquiries(data || []);
      if (data && data.length > 0) {
        setSelectedInquiry(prev => prev ? (data.find(d => d.id === prev.id) || data[0]) : data[0]);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();

    const supabase = createClient();
    if (!supabase) return;

    const channel = supabase
      .channel('realtime:admin_inquiries')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inquiries' },
        () => {
          fetchInquiries();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleStatusChange = async (id: string, status: 'new' | 'contacted' | 'archived') => {
    await updateInquiryStatus(id, status);
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this client inquiry?')) {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-1">
            Lead Management
          </span>
          <h1 className="font-display font-bold text-3xl text-charcoal">
            Client Inquiries & Briefs
          </h1>
        </div>

        <button
          onClick={fetchInquiries}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-charcoal/20 text-xs font-sans font-semibold text-charcoal hover:border-copper"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Main 2-Column Split: Inquiries List & Detail Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inquiries List */}
        <div className="lg:col-span-5 bg-white border border-charcoal/15 overflow-hidden shadow-sm">
          <div className="p-4 bg-ivory-100 border-b border-charcoal/10 flex items-center justify-between">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              All Inquiries ({inquiries.length})
            </span>
            <span className="text-[10px] text-charcoal-400">
              Sorted newest first
            </span>
          </div>

          <div className="divide-y divide-charcoal/10 max-h-[700px] overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-xs font-sans text-charcoal-400">
                Loading client inquiries...
              </div>
            ) : inquiries.length === 0 ? (
              <div className="p-8 text-center text-xs font-sans text-charcoal-400">
                No inquiries received yet.
              </div>
            ) : (
              inquiries.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                return (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-4 cursor-pointer transition-colors text-xs font-sans ${
                      isSelected
                        ? 'bg-ivory-200 border-l-4 border-l-copper'
                        : 'hover:bg-ivory-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-charcoal text-sm truncate max-w-[200px]">
                        {inq.name}
                      </span>
                      <Badge variant={inq.status === 'new' ? 'copper' : 'outline'}>
                        {inq.status}
                      </Badge>
                    </div>

                    {inq.company && (
                      <div className="text-[11px] text-copper font-medium mb-1">
                        {inq.company}
                      </div>
                    )}

                    <p className="text-charcoal-600 line-clamp-2 my-1">
                      {inq.details}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-charcoal-400 pt-2 border-t border-charcoal/5">
                      <span>{inq.serviceRequired}</span>
                      <span>{formatDate(inq.createdAt)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Full Inquiry Details */}
        <div className="lg:col-span-7 bg-white border border-charcoal/15 p-6 sm:p-8 space-y-6 shadow-sm">
          {selectedInquiry ? (
            <div className="space-y-6">
              {/* Header with Status Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-charcoal/10">
                <div>
                  <h2 className="font-display font-bold text-2xl text-charcoal">
                    {selectedInquiry.name}
                  </h2>
                  <span className="text-xs text-charcoal-400 font-sans">
                    Received on {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedInquiry.id, 'contacted')}
                    className="px-3 py-1.5 bg-sage-50 text-sage-800 border border-sage/40 text-xs font-sans font-semibold hover:bg-sage/20 transition-colors"
                  >
                    Mark Contacted
                  </button>

                  <button
                    onClick={() => handleStatusChange(selectedInquiry.id, 'archived')}
                    className="px-3 py-1.5 bg-ivory-100 text-charcoal-600 border border-charcoal/20 text-xs font-sans font-semibold hover:bg-ivory-200 transition-colors"
                  >
                    Archive
                  </button>

                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="p-1.5 text-charcoal-400 hover:text-red-600 transition-colors"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Client Contact Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-ivory-100 text-xs font-sans">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-copper" />
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="font-semibold text-charcoal hover:text-copper underline"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>

                {selectedInquiry.company && (
                  <div className="flex items-center gap-2.5">
                    <Building className="w-4 h-4 text-copper" />
                    <span className="text-charcoal font-medium">
                      Company: {selectedInquiry.company}
                    </span>
                  </div>
                )}

                <div>
                  <span className="text-charcoal-400 block text-[10px] uppercase font-bold">
                    Service Required
                  </span>
                  <span className="font-semibold text-charcoal">
                    {selectedInquiry.serviceRequired}
                  </span>
                </div>

                <div>
                  <span className="text-charcoal-400 block text-[10px] uppercase font-bold">
                    Budget Target
                  </span>
                  <span className="font-semibold text-copper">
                    {selectedInquiry.budgetRange}
                  </span>
                </div>
              </div>

              {/* Inquiry Brief Details */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-lg text-charcoal">
                  Client Project Scope & Description
                </h3>
                <div className="p-6 bg-ivory-50 border border-charcoal/10 text-sm font-sans text-charcoal-800 whitespace-pre-line leading-relaxed">
                  {selectedInquiry.details}
                </div>
              </div>

              {/* Direct Reply Email Trigger */}
              <div className="pt-4 border-t border-charcoal/10 flex items-center justify-between">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re:%20${encodeURIComponent(
                    selectedInquiry.serviceRequired
                  )}%20Inquiry%20-%20Abdul%20Ahad%20J`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-copper text-ivory text-xs font-sans font-bold uppercase tracking-wider hover:bg-copper-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email Client</span>
                </a>
                <span className="text-xs font-sans text-charcoal-400">
                  Status: <strong className="uppercase">{selectedInquiry.status}</strong>
                </span>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-xs font-sans text-charcoal-400">
              Select an inquiry on the left to view complete details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
