import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { courseAPI, getAuthUser } from '../../utils/api';

const CreateCourse = () => {
  const navigate = useNavigate();
  const { userName } = getAuthUser();
  const [form, setForm] = useState({ title: '', code: '', description: '', capacity: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        code: form.code,
        description: form.description,
        capacity: Number(form.capacity) || 0,
      };
      await courseAPI.create(payload);
      alert('Course created successfully');
      navigate('/teacher/dashboard');
    } catch (err) {
      setError(err?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout userRole="teacher" userName={userName || 'Teacher'}>
      <div className="space-y-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-[#0B1F3A]">Create Course</h1>
          <p className="mt-2 text-sm text-gray-500">Create a new course that will be assigned to you as the teacher.</p>
        </header>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm">
          {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input name="title" value={form.title} onChange={handleChange} required className="mt-1 w-full rounded border px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Code</label>
              <input name="code" value={form.code} onChange={handleChange} required className="mt-1 w-full rounded border px-3 py-2" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={5} className="mt-1 w-full rounded border px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Capacity</label>
              <input name="capacity" type="number" value={form.capacity} onChange={handleChange} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button type="submit" disabled={loading} className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B1F3A]">
              {loading ? 'Creating...' : 'Create Course'}
            </button>
            <button type="button" onClick={() => navigate('/teacher/dashboard')} className="rounded-xl border px-4 py-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateCourse;
