import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';

const SubmissionReviewPage = () => {
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const location = useLocation();

  const assignmentTitle = location.state?.assignmentTitle || 'Assignment';
  const totalMarks = Number(location.state?.totalMarks || 0);

  const [submissions, setSubmissions] = useState([]);
  const [draftGrades, setDraftGrades] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState('');

  useEffect(() => {
    const loadSubmissions = async () => {
      setLoading(true);
      try {
        const response = await api.getAssignmentSubmissions(assignmentId);
        const records = (response?.data || []).map((submission, index) => ({
          id: submission._id || `${assignmentId}-${index}`,
          studentName: submission.student?.fullName || 'Student',
          studentEmail: submission.student?.email || '',
          submittedDate: submission.submittedAt
            ? new Date(submission.submittedAt).toLocaleString()
            : (submission.createdAt ? new Date(submission.createdAt).toLocaleString() : ''),
          remarks: submission.remarks || '',
          fileUrl: submission.fileUrl || '',
          fileName: submission.fileName || (submission.fileUrl ? String(submission.fileUrl).split('/').pop() : ''),
          grade: submission.grade || '',
        }));

        setSubmissions(records);

        const grades = {};
        records.forEach((item) => {
          grades[item.id] = item.grade;
        });
        setDraftGrades(grades);
      } catch (error) {
        console.error('Failed to load submissions:', error);
        alert(error?.message || 'Failed to load submissions');
      } finally {
        setLoading(false);
      }
    };

    loadSubmissions();
  }, [assignmentId]);

  const handleSaveGrade = async (submissionId) => {
    const value = draftGrades[submissionId];

    if (value === '' || value === undefined || value === null) {
      alert('Please enter a grade');
      return;
    }

    const numericGrade = Number(value);
    if (Number.isNaN(numericGrade) || numericGrade < 0) {
      alert('Grade must be a valid number');
      return;
    }

    if (totalMarks > 0 && numericGrade > totalMarks) {
      alert(`Grade cannot exceed total marks (${totalMarks})`);
      return;
    }

    try {
      setSavingId(submissionId);
      const response = await api.gradeSubmission(submissionId, numericGrade);
      if (!response?.success) {
        throw new Error(response?.message || 'Failed to save grade');
      }

      setSubmissions((prev) =>
        prev.map((item) =>
          item.id === submissionId
            ? { ...item, grade: String(numericGrade) }
            : item
        )
      );
      alert('Grade saved successfully');
    } catch (error) {
      console.error('Failed to save grade:', error);
      alert(error?.message || 'Failed to save grade');
    } finally {
      setSavingId('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A]">Submission Review</h1>
            <p className="text-sm text-gray-600 mt-1">
              {assignmentTitle}
              {totalMarks > 0 ? ` • Total Marks: ${totalMarks}` : ''}
            </p>
          </div>
          <button
            onClick={() => navigate('/teacher')}
            className="px-4 py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-lg font-semibold hover:bg-[#C49B2C] transition"
          >
            Back To Dashboard
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-[#D4AF37]/20 overflow-x-auto">
          {loading ? (
            <p className="p-6 text-gray-500 text-sm">Loading submissions...</p>
          ) : submissions.length === 0 ? (
            <p className="p-6 text-gray-500 text-sm">No submissions yet for this assignment.</p>
          ) : (
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#F8F4EC]">
                <tr>
                  <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Student</th>
                  <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Submitted At</th>
                  <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Answer / Notes</th>
                  <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">File</th>
                  <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Grade</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-t border-gray-100">
                    <td className="p-3 align-top">
                      <p className="text-sm font-medium text-[#0B1F3A]">{submission.studentName}</p>
                      <p className="text-xs text-gray-500 mt-1">{submission.studentEmail}</p>
                    </td>
                    <td className="p-3 text-sm text-gray-600 align-top">{submission.submittedDate || '-'}</td>
                    <td className="p-3 text-sm text-gray-700 align-top">{submission.remarks || '-'}</td>
                    <td className="p-3 align-top">
                      {submission.fileUrl ? (
                        <button
                          onClick={() => api.downloadFile(submission.fileUrl, submission.fileName || 'submission', { type: 'submission', id: submission.id }).catch((error) => alert(error?.message || 'Failed to download submission'))}
                          className="text-xs text-[#D4AF37] font-semibold hover:underline"
                        >
                          Download {submission.fileName || 'file'}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">No file</span>
                      )}
                    </td>
                    <td className="p-3 align-top">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max={totalMarks > 0 ? String(totalMarks) : undefined}
                          value={draftGrades[submission.id] ?? ''}
                          onChange={(e) => {
                            const { value } = e.target;
                            setDraftGrades((prev) => ({ ...prev, [submission.id]: value }));
                          }}
                          className="w-24 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37]"
                        />
                        <button
                          onClick={() => handleSaveGrade(submission.id)}
                          disabled={savingId === submission.id}
                          className="px-3 py-2 bg-[#0B1F3A] text-white text-xs rounded-lg hover:bg-[#1A3A5A] disabled:opacity-60"
                        >
                          {savingId === submission.id ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionReviewPage;
