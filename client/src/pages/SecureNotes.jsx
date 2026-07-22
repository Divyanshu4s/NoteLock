import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getNotes, addNote, updateNote, deleteNote } from '../services/api';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const SecureNotes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    content: '',
    category: 'Others'
  });

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
      toast.error('Failed to fetch secure notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        fetchNotes();
        toast.success('Note deleted successfully');
      } catch (err) {
        toast.error('Failed to delete note');
      }
    }
  };

  const openModal = (note = null) => {
    if (note) {
      setFormData({
        id: note._id,
        title: note.title,
        content: note.content,
        category: note.category
      });
    } else {
      setFormData({ id: null, title: '', content: '', category: 'Others' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateNote(formData.id, formData);
        toast.success('Note updated successfully');
      } else {
        await addNote(formData);
        toast.success('Note added successfully');
      }
      setIsModalOpen(false);
      fetchNotes();
    } catch (err) {
      toast.error('Failed to save note');
    }
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Sidebar>
      <div className="p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Secure Notes</h1>
            <p className="text-gray-500 mt-1">Keep your private text safe</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Note
          </button>
        </header>

        <div className="mb-8 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search notes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredNotes.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-500 bg-white border border-gray-200 rounded-xl dashed">
                No notes found. Create your first secure note!
              </div>
            ) : filteredNotes.map(note => (
              <div key={note._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-64 group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{note.title}</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-md mt-2 inline-block">
                      {note.category}
                    </span>
                  </div>
                  <div className="flex gap-2 text-gray-400">
                    <button onClick={() => openModal(note)} className="hover:text-indigo-600 transition-colors" title="Edit Note"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(note._id)} className="hover:text-red-600 transition-colors" title="Delete Note"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden relative">
                  <p className="text-gray-600 text-sm whitespace-pre-wrap blur-sm group-hover:blur-none transition-all duration-300 cursor-pointer select-none h-full overflow-y-auto custom-scrollbar">
                    {note.content}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center flex items-center justify-center gap-1 group-hover:opacity-0 transition-opacity">
                  <EyeOff className="w-3 h-3" /> Hover to reveal content
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h3 className="text-xl font-bold">{formData.id ? 'Edit Note' : 'Add Note'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option>Work</option>
                    <option>Personal</option>
                    <option>Finance</option>
                    <option>Keys</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="flex-1 flex flex-col min-h-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secure Content</label>
                  <textarea 
                    required 
                    value={formData.content} 
                    onChange={e => setFormData({...formData, content: e.target.value})} 
                    className="w-full flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 outline-none custom-scrollbar"
                  ></textarea>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-gray-50">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Save Note</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Sidebar>
  );
};

export default SecureNotes;
