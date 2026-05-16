import React, { useState } from "react";
import { 
  BarChart3, Users, BookOpen, Settings, 
  TrendingUp, Trash2, Edit, Plus, CheckCircle, XCircle 
} from "lucide-react";
import { collection, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { courses as initialCoursesData } from "../data/courses";
interface AdminPageProps {
  setCurrentPage: (p: string) => void;
  courses: any[];
}

export default function AdminPage({ setCurrentPage, courses }: AdminPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAdding, setIsAdding] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [newCourse, setNewCourse] = useState({
    id: Date.now(), title: "", instructor: "", price: 0, students: 0, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3", category: "class-10", categoryLabel: "Class 10", originalPrice: 0, rating: 5.0, reviews: 0, duration: "10h", lessons: 20, modules: 5, level: "Beginner", badge: "New", tags: ["Science"], description: "", progress: 0, enrolled: false
  });

  const handleDelete = async (firebaseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteDoc(doc(db, "courses", firebaseId));
      } catch (err) {
        console.error(err);
        alert("Failed to delete course.");
      }
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newDocRef = doc(collection(db, "courses"));
      await setDoc(newDocRef, { ...newCourse, id: Date.now(), modulesList: [] });
      setIsAdding(false);
      setNewCourse({ ...newCourse, title: "", instructor: "", price: 0 });
    } catch (err) {
      console.error(err);
      alert("Failed to add course.");
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateDoc(doc(db, "courses", editingCourse.firebaseId), editingCourse);
      setEditingCourse(null);
      alert("Course updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update course.");
    }
  };

  const handleAddModule = () => {
    const newModules = [...(editingCourse.modulesList || [])];
    newModules.push({ id: Date.now(), title: "New Module", items: [] });
    setEditingCourse({ ...editingCourse, modulesList: newModules });
  };

  const handleRemoveModule = (mIndex: number) => {
    const newModules = [...editingCourse.modulesList];
    newModules.splice(mIndex, 1);
    setEditingCourse({ ...editingCourse, modulesList: newModules });
  };

  const handleUpdateModuleTitle = (mIndex: number, val: string) => {
    const newModules = [...editingCourse.modulesList];
    newModules[mIndex].title = val;
    setEditingCourse({ ...editingCourse, modulesList: newModules });
  };

  const handleAddVideo = (mIndex: number) => {
    const newModules = [...editingCourse.modulesList];
    newModules[mIndex].items.push({ title: "New Video", type: "video", duration: "10:00", free: false, done: false });
    setEditingCourse({ ...editingCourse, modulesList: newModules });
  };

  const handleRemoveVideo = (mIndex: number, vIndex: number) => {
    const newModules = [...editingCourse.modulesList];
    newModules[mIndex].items.splice(vIndex, 1);
    setEditingCourse({ ...editingCourse, modulesList: newModules });
  };

  const handleUpdateVideo = (mIndex: number, vIndex: number, field: string, val: any) => {
    const newModules = [...editingCourse.modulesList];
    newModules[mIndex].items[vIndex][field] = val;
    setEditingCourse({ ...editingCourse, modulesList: newModules });
  };

  const handleSeedDatabase = async () => {
    if (confirm("This will upload initial courses to Firebase. Proceed?")) {
      try {
        for (const course of initialCoursesData) {
          await setDoc(doc(collection(db, "courses")), course);
        }
        alert("Database seeded successfully!");
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Dummy data for users
  const [users] = useState([
    { id: 1, name: "Rakibul Islam", email: "rakib@example.com", role: "Instructor", status: "Active" },
    { id: 2, name: "Sumaiya Akhter", email: "sumaiya@example.com", role: "Student", status: "Active" },
    { id: 3, name: "Tanvir Hossain", email: "tanvir@example.com", role: "Student", status: "Suspended" },
    { id: 4, name: "Dr. Kamrul", email: "kamrul@example.com", role: "Instructor", status: "Active" },
    { id: 5, name: "Nusrat Jahan", email: "nusrat@example.com", role: "Student", status: "Active" },
  ]);

  return (
    <div className="min-h-screen bg-navy pt-20 flex">
      {/* Sidebar */}
      <div className="w-64 bg-navy-light border-r border-blue-900/30 flex-shrink-0 min-h-[calc(100vh-80px)]">
        <div className="p-6">
          <h2 className="text-white font-black text-xl mb-6 flex items-center gap-2">
            <span className="text-gradient-gold">Admin</span> Panel
          </h2>
          <div className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "courses", label: "Manage Courses", icon: BookOpen },
              { id: "users", label: "Manage Users", icon: Users },
              { id: "settings", label: "Settings", icon: Settings },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                  activeTab === tab.id
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Platform Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Total Revenue", value: "৳2.4M", trend: "+12.5%", color: "#f59e0b" },
                  { title: "Active Users", value: "12,450", trend: "+5.2%", color: "#3b82f6" },
                  { title: "Total Courses", value: courses.length.toString(), trend: "+2", color: "#10b981" },
                ].map(stat => (
                  <div key={stat.title} className="glass-card rounded-2xl p-6">
                    <p className="text-slate-400 text-sm mb-2">{stat.title}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-black text-white">{stat.value}</p>
                      <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                        <TrendingUp size={14} /> {stat.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-2xl p-6 mt-8">
                <h3 className="text-white font-bold mb-4">Recent Sales Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400">
                          ৳
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">New Enrollment: SSC Math</p>
                          <p className="text-slate-400 text-xs">by user_{Math.floor(Math.random() * 1000)}</p>
                        </div>
                      </div>
                      <span className="text-slate-500 text-xs">{i * 2} hours ago</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Manage Courses Tab */}
          {activeTab === "courses" && (
            <div>
              {editingCourse ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Edit Course</h2>
                    <button onClick={() => setEditingCourse(null)} className="btn-secondary text-sm px-4 py-2">
                      <XCircle size={16} /> Cancel
                    </button>
                  </div>
                  
                  {/* Basic Details */}
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-4">Course Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-slate-400 text-xs mb-1 block">Course Title</label>
                        <input type="text" value={editingCourse.title} onChange={e => setEditingCourse({...editingCourse, title: e.target.value})} className="w-full bg-navy border border-blue-900/30 rounded-lg px-4 py-2 text-white text-sm" />
                      </div>
                      <div>
                        <label className="text-slate-400 text-xs mb-1 block">Instructor Name</label>
                        <input type="text" value={editingCourse.instructor} onChange={e => setEditingCourse({...editingCourse, instructor: e.target.value})} className="w-full bg-navy border border-blue-900/30 rounded-lg px-4 py-2 text-white text-sm" />
                      </div>
                      <div>
                        <label className="text-slate-400 text-xs mb-1 block">Price (৳)</label>
                        <input type="number" value={editingCourse.price} onChange={e => setEditingCourse({...editingCourse, price: Number(e.target.value)})} className="w-full bg-navy border border-blue-900/30 rounded-lg px-4 py-2 text-white text-sm" />
                      </div>
                      <div>
                        <label className="text-slate-400 text-xs mb-1 block">Image URL</label>
                        <input type="text" value={editingCourse.image} onChange={e => setEditingCourse({...editingCourse, image: e.target.value})} className="w-full bg-navy border border-blue-900/30 rounded-lg px-4 py-2 text-white text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Curriculum Builder */}
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white font-bold">Curriculum (Modules & Videos)</h3>
                      <button onClick={handleAddModule} className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                        <Plus size={14} /> Add Module
                      </button>
                    </div>
                    
                    {(editingCourse.modulesList || []).map((mod: any, mIndex: number) => (
                      <div key={mIndex} className="bg-navy border border-blue-900/30 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-3 mb-4">
                          <input type="text" value={mod.title} onChange={e => handleUpdateModuleTitle(mIndex, e.target.value)} className="flex-1 bg-white/5 border border-blue-800/30 rounded px-3 py-1.5 text-white text-sm font-semibold" placeholder="Module Title" />
                          <button onClick={() => handleRemoveModule(mIndex)} className="text-red-400 hover:bg-red-500/20 p-1.5 rounded"><Trash2 size={16} /></button>
                        </div>
                        
                        <div className="space-y-2 pl-4 border-l-2 border-blue-900/30 ml-2">
                          {(mod.items || []).map((item: any, vIndex: number) => (
                            <div key={vIndex} className="flex gap-2 items-center">
                              <select value={item.type} onChange={e => handleUpdateVideo(mIndex, vIndex, 'type', e.target.value)} className="bg-navy-light border border-blue-900/30 rounded px-2 py-1.5 text-slate-300 text-xs">
                                <option value="video">Video</option>
                                <option value="pdf">PDF</option>
                                <option value="quiz">Quiz</option>
                              </select>
                              <input type="text" value={item.title} onChange={e => handleUpdateVideo(mIndex, vIndex, 'title', e.target.value)} className="flex-1 bg-navy-light border border-blue-900/30 rounded px-3 py-1.5 text-white text-xs" placeholder="Lesson Title" />
                              <input type="text" value={item.duration} onChange={e => handleUpdateVideo(mIndex, vIndex, 'duration', e.target.value)} className="w-20 bg-navy-light border border-blue-900/30 rounded px-3 py-1.5 text-slate-400 text-xs" placeholder="Duration" />
                              <button onClick={() => handleRemoveVideo(mIndex, vIndex)} className="text-red-400/70 hover:text-red-400 p-1"><XCircle size={14} /></button>
                            </div>
                          ))}
                          <button onClick={() => handleAddVideo(mIndex)} className="text-blue-400 text-xs mt-2 hover:underline flex items-center gap-1">
                            <Plus size={12} /> Add Lesson
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button onClick={handleSaveEdit} className="btn-primary w-full py-3">Save All Changes</button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Manage Courses</h2>
                <button onClick={() => setIsAdding(!isAdding)} className="btn-primary text-sm px-4 py-2">
                  <Plus size={16} /> {isAdding ? "Cancel" : "Add New Course"}
                </button>
              </div>

              {isAdding && (
                <div className="glass-card rounded-2xl p-6 mb-6">
                  <h3 className="text-white font-bold mb-4">Add New Course</h3>
                  <form onSubmit={handleAddCourse} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-slate-400 text-xs mb-1 block">Course Title</label>
                        <input type="text" required value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} className="w-full bg-navy border border-blue-900/30 rounded-lg px-4 py-2 text-white text-sm" />
                      </div>
                      <div>
                        <label className="text-slate-400 text-xs mb-1 block">Instructor Name</label>
                        <input type="text" required value={newCourse.instructor} onChange={e => setNewCourse({...newCourse, instructor: e.target.value})} className="w-full bg-navy border border-blue-900/30 rounded-lg px-4 py-2 text-white text-sm" />
                      </div>
                      <div>
                        <label className="text-slate-400 text-xs mb-1 block">Price (৳)</label>
                        <input type="number" required value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: Number(e.target.value)})} className="w-full bg-navy border border-blue-900/30 rounded-lg px-4 py-2 text-white text-sm" />
                      </div>
                      <div>
                        <label className="text-slate-400 text-xs mb-1 block">Image URL</label>
                        <input type="text" required value={newCourse.image} onChange={e => setNewCourse({...newCourse, image: e.target.value})} className="w-full bg-navy border border-blue-900/30 rounded-lg px-4 py-2 text-white text-sm" />
                      </div>
                    </div>
                    <button type="submit" className="btn-primary py-2 px-6">Save Course</button>
                  </form>
                </div>
              )}

              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-blue-900/30">
                        <th className="p-4 text-slate-400 text-sm font-semibold">Course Title</th>
                        <th className="p-4 text-slate-400 text-sm font-semibold">Instructor</th>
                        <th className="p-4 text-slate-400 text-sm font-semibold">Price</th>
                        <th className="p-4 text-slate-400 text-sm font-semibold">Students</th>
                        <th className="p-4 text-slate-400 text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-900/20">
                      {courses.map(course => (
                        <tr key={course.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img src={course.image} alt="" className="w-10 h-10 rounded object-cover" />
                              <span className="text-white text-sm font-semibold line-clamp-1">{course.title}</span>
                            </div>
                          </td>
                          <td className="p-4 text-slate-300 text-sm">{course.instructor}</td>
                          <td className="p-4 text-slate-300 text-sm">৳{course.price}</td>
                          <td className="p-4 text-slate-300 text-sm">{course.students}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => setEditingCourse(course)} className="p-2 bg-blue-900/30 text-blue-400 rounded hover:bg-blue-600/30 transition">
                                <Edit size={14} />
                              </button>
                              <button onClick={() => handleDelete(course.firebaseId)} className="p-2 bg-red-900/30 text-red-400 rounded hover:bg-red-600/30 transition">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
                </div>
              )}
            </div>
          )}

          {/* Manage Users Tab */}
          {activeTab === "users" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Manage Users</h2>
              
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-blue-900/30">
                        <th className="p-4 text-slate-400 text-sm font-semibold">Name</th>
                        <th className="p-4 text-slate-400 text-sm font-semibold">Email</th>
                        <th className="p-4 text-slate-400 text-sm font-semibold">Role</th>
                        <th className="p-4 text-slate-400 text-sm font-semibold">Status</th>
                        <th className="p-4 text-slate-400 text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-900/20">
                      {users.map(user => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 text-white text-sm font-semibold">{user.name}</td>
                          <td className="p-4 text-slate-300 text-sm">{user.email}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs ${user.role === 'Instructor' ? 'bg-amber-900/30 text-amber-400' : 'bg-blue-900/30 text-blue-400'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4">
                            {user.status === "Active" ? (
                              <span className="flex items-center gap-1 text-green-400 text-sm"><CheckCircle size={14} /> Active</span>
                            ) : (
                              <span className="flex items-center gap-1 text-red-400 text-sm"><XCircle size={14} /> Suspended</span>
                            )}
                          </td>
                          <td className="p-4">
                            <button onClick={() => alert("Edit user status...")} className="p-2 bg-blue-900/30 text-blue-400 rounded hover:bg-blue-600/30 transition">
                              <Edit size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Site Settings</h2>
              <div className="glass-card rounded-2xl p-6 max-w-2xl">
                <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert("Settings saved!"); }}>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Site Name</label>
                    <input type="text" defaultValue="Infinity LMS" className="w-full bg-navy border border-blue-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Contact Email</label>
                    <input type="email" defaultValue="support@infinitylms.com" className="w-full bg-navy border border-blue-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Maintenance Mode</label>
                    <select className="w-full bg-navy border border-blue-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                      <option>Off</option>
                      <option>On</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-primary py-2 px-6 mt-4">Save Settings</button>
                </form>
                <hr className="border-blue-900/30 my-6" />
                <h3 className="text-white font-bold mb-2">Database Management</h3>
                <p className="text-slate-400 text-xs mb-4">If your Firebase database is empty, click this button to seed the initial default courses. Run this ONLY ONCE.</p>
                <button onClick={handleSeedDatabase} className="w-max px-4 py-2 rounded-lg bg-amber-900/30 text-amber-400 border border-amber-700/30 text-sm font-semibold hover:bg-amber-600/30">
                  Seed Database (Upload Dummy Courses)
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
