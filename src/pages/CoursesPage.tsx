import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import CourseCard from "../components/CourseCard";
import { categories } from "../data/courses";

interface CoursesPageProps {
  setCurrentPage: (p: string) => void;
  setSelectedCourse: (c: any) => void;
  courses: any[];
}

export default function CoursesPage({ setCurrentPage, setSelectedCourse, courses }: CoursesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");


  const filtered = courses.filter((c) => {
    const matchCat = selectedCategory === "all" || c.category === selectedCategory;
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "popular") return b.students - a.students;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "newest") return b.id - a.id;
    return 0;
  });

  return (
    <div className="min-h-screen bg-navy pt-20">
      {/* Header */}
      <div className="bg-navy-light border-b border-blue-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              All <span className="text-gradient-gold">Courses</span>
            </h1>
            <p className="text-slate-400 text-lg">
              {courses.length}+ premium courses for Class 6 to Inter 2nd Year
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search courses, instructors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-navy-card border border-blue-800/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-hide mb-6">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`flex-shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              selectedCategory === "all"
                ? "gradient-gold text-navy-card"
                : "bg-blue-900/20 text-slate-300 border border-blue-800/30 hover:border-blue-500/50 hover:text-white"
            }`}
          >
            All Classes
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                selectedCategory === cat.id
                  ? "gradient-gold text-navy-card"
                  : "bg-blue-900/20 text-slate-300 border border-blue-800/30 hover:border-blue-500/50 hover:text-white"
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <p className="text-slate-400 text-sm">
            Showing <span className="text-white font-semibold">{sorted.length}</span> courses
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-navy-card border border-blue-800/30 rounded-xl px-3 py-2">
              <SlidersHorizontal size={14} className="text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-300 text-sm focus:outline-none cursor-pointer"
              >
                <option value="popular" className="bg-[#0d1f3c]">Most Popular</option>
                <option value="rating" className="bg-[#0d1f3c]">Highest Rated</option>
                <option value="price-low" className="bg-[#0d1f3c]">Price: Low to High</option>
                <option value="price-high" className="bg-[#0d1f3c]">Price: High to Low</option>
                <option value="newest" className="bg-[#0d1f3c]">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {sorted.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={(c) => { setSelectedCourse(c); setCurrentPage("course-detail"); }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white font-bold text-xl mb-2">No courses found</h3>
            <p className="text-slate-400">Try a different search or category filter.</p>
            <button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} className="btn-primary mt-6">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
