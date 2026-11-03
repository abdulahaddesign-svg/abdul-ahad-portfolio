'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Building2, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  ExternalLink, 
  Upload, 
  X, 
  Check, 
  Search 
} from 'lucide-react';
import { getClientLogos, saveClientLogo, deleteClientLogo } from '@/lib/data';
import { ClientLogo } from '@/lib/types';
import { Button } from '@/components/ui/Button';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ClientLogo>>({
    name: '',
    logoUrl: '',
    websiteUrl: '',
    sortOrder: 1,
    isVisible: true,
  });
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchClients = async () => {
    setLoading(true);
    const data = await getClientLogos(true);
    setClients(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const showNotification = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditForm({
      name: '',
      logoUrl: '',
      websiteUrl: '',
      sortOrder: clients.length + 1,
      isVisible: true,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (client: ClientLogo) => {
    setEditForm({ ...client });
    setIsEditing(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setEditForm((prev) => ({ ...prev, logoUrl: data.url }));
        showNotification('Logo image uploaded successfully');
      } else {
        alert(data.error || 'Failed to upload logo image');
      }
    } catch {
      alert('Upload failed. Please check network connection.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.name || !editForm.logoUrl) {
      alert('Please provide a client name and logo URL / uploaded file.');
      return;
    }

    await saveClientLogo(editForm);
    setIsEditing(false);
    showNotification(editForm.id ? 'Client updated successfully' : 'Client created successfully');
    await fetchClients();
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from clients?`)) {
      await deleteClientLogo(id);
      showNotification('Client deleted');
      await fetchClients();
    }
  };

  const handleToggleVisibility = async (client: ClientLogo) => {
    const updated = { ...client, isVisible: !client.isVisible };
    await saveClientLogo(updated);
    await fetchClients();
  };

  const handleMoveOrder = async (client: ClientLogo, direction: 'up' | 'down') => {
    const sorted = [...clients].sort((a, b) => a.sortOrder - b.sortOrder);
    const currentIndex = sorted.findIndex((c) => c.id === client.id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= sorted.length) return;

    const targetClient = sorted[targetIndex];
    const tempOrder = client.sortOrder;
    client.sortOrder = targetClient.sortOrder;
    targetClient.sortOrder = tempOrder;

    await Promise.all([saveClientLogo(client), saveClientLogo(targetClient)]);
    await fetchClients();
  };

  const filteredClients = clients
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-8 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/10">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-charcoal tracking-tight flex items-center gap-3">
            <Building2 className="w-8 h-8 text-copper" />
            Client Showcase CMS
          </h1>
          <p className="text-sm text-charcoal-500 mt-1">
            Manage client brand logos featured on the homepage scroll showcase.
          </p>
        </div>

        <Button onClick={handleOpenAdd} className="self-start sm:self-auto flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </Button>
      </div>

      {/* Notification Banner */}
      {feedback && (
        <div className="bg-copper/15 border border-copper text-charcoal px-4 py-3 rounded-none flex items-center gap-2 text-sm font-medium">
          <Check className="w-4 h-4 text-copper" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Search & Counter Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-charcoal/20 bg-ivory focus:outline-none focus:border-copper"
          />
        </div>
        <div className="text-xs font-mono text-charcoal-500">
          Total: {clients.length} | Visible: {clients.filter((c) => c.isVisible).length}
        </div>
      </div>

      {/* Client List Table */}
      {loading ? (
        <div className="p-12 text-center text-charcoal-400">Loading clients...</div>
      ) : filteredClients.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-charcoal/20 text-charcoal-500">
          No clients found. Click &quot;Add New Client&quot; above to create one.
        </div>
      ) : (
        <div className="bg-white border border-charcoal/10 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-charcoal/5 border-b border-charcoal/10 text-[11px] uppercase tracking-wider font-bold text-charcoal-600">
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Logo Preview</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Website</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {filteredClients.map((client, idx) => (
                <tr key={client.id} className="hover:bg-ivory/60 transition-colors">
                  {/* Sort Order with arrows */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-xs w-6">{client.sortOrder}</span>
                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => handleMoveOrder(client, 'up')}
                          disabled={idx === 0}
                          className="p-0.5 hover:text-copper disabled:opacity-30"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveOrder(client, 'down')}
                          disabled={idx === filteredClients.length - 1}
                          className="p-0.5 hover:text-copper disabled:opacity-30"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Logo Preview */}
                  <td className="py-3 px-4">
                    <div className="w-24 h-10 relative bg-ivory border border-charcoal/10 flex items-center justify-center p-1.5">
                      <Image
                        src={client.logoUrl}
                        alt={client.name}
                        width={90}
                        height={32}
                        className="max-h-7 w-auto object-contain"
                      />
                    </div>
                  </td>

                  {/* Client Name */}
                  <td className="py-3 px-4 font-semibold text-charcoal">
                    {client.name}
                  </td>

                  {/* Website Link */}
                  <td className="py-3 px-4 text-xs font-mono text-charcoal-500">
                    {client.websiteUrl ? (
                      <a
                        href={client.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-copper hover:underline"
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>

                  {/* Visibility Switch */}
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(client)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                        client.isVisible
                          ? 'bg-sage/20 text-charcoal border border-sage/40'
                          : 'bg-charcoal/10 text-charcoal-400 border border-charcoal/10'
                      }`}
                    >
                      {client.isVisible ? (
                        <>
                          <Eye className="w-3 h-3 text-sage" /> Visible
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" /> Hidden
                        </>
                      )}
                    </button>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(client)}
                        className="p-1.5 hover:bg-copper hover:text-ivory text-charcoal-600 transition-colors"
                        title="Edit Client"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(client.id, client.name)}
                        className="p-1.5 hover:bg-red-600 hover:text-white text-charcoal-600 transition-colors"
                        title="Delete Client"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal / Drawer for Add / Edit Client */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-ivory border border-charcoal/20 w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
              <h3 className="font-display text-xl font-bold text-charcoal">
                {editForm.id ? 'Edit Client' : 'Add New Client'}
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-charcoal-400 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="e.g. Reztro AI, Falcon Studio"
                  className="w-full px-3 py-2 border border-charcoal/20 bg-white focus:outline-none focus:border-copper"
                />
              </div>

              {/* Logo URL / Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Logo Asset *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={editForm.logoUrl || ''}
                    onChange={(e) => setEditForm({ ...editForm, logoUrl: e.target.value })}
                    placeholder="/clients/client-reztro.svg or https://..."
                    className="flex-1 px-3 py-2 border border-charcoal/20 bg-white focus:outline-none focus:border-copper text-xs font-mono"
                  />
                  <label className="px-3 py-2 bg-charcoal text-ivory text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-copper transition-colors flex items-center gap-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*,.svg"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
                {editForm.logoUrl && (
                  <div className="mt-2 p-2 bg-white border border-charcoal/10 inline-flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold text-charcoal-400">Preview:</span>
                    <Image
                      src={editForm.logoUrl}
                      alt="Logo preview"
                      width={80}
                      height={24}
                      className="max-h-6 w-auto object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Website URL (Optional)
                </label>
                <input
                  type="url"
                  value={editForm.websiteUrl || ''}
                  onChange={(e) => setEditForm({ ...editForm, websiteUrl: e.target.value })}
                  placeholder="https://clientwebsite.com"
                  className="w-full px-3 py-2 border border-charcoal/20 bg-white focus:outline-none focus:border-copper text-xs font-mono"
                />
              </div>

              {/* Sort Order & Visibility */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editForm.sortOrder || 1}
                    onChange={(e) =>
                      setEditForm({ ...editForm, sortOrder: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2 border border-charcoal/20 bg-white focus:outline-none focus:border-copper"
                  />
                </div>

                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={editForm.isVisible ?? true}
                      onChange={(e) =>
                        setEditForm({ ...editForm, isVisible: e.target.checked })
                      }
                      className="w-4 h-4 accent-copper"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal">
                      Visible on Site
                    </span>
                  </label>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-charcoal/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editForm.id ? 'Save Changes' : 'Create Client'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}