import { Star, Clock, BookOpen, Users, Play } from "lucide-react";

interface Course {
  id: number;
  title: string;
  category: string;
  categoryLabel: string;
  instructor: string;
  rating: number;
  reviews: number;
  students: number;
  price: number;
  originalPrice: number;
  image: string;
  duration: string;
  lessons: number;
  modules: number;
  level: string;
  badge: string | null;
  tags: string[];
  description: string;
  progress: number;
  enrolled: boolean;
}

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div
      className="glass-card rounded-2xl overflow-hidden card-hover cursor-pointer group"
      onClick={() => onClick(course)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.title)}&background=1a3a6e&color=fff&size=400`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-transparent to-transparent" />

        {/* Badge */}
        {course.badge && (
          <div className="absolute top-3 left-3">
            <span className={`badge-${course.badge === "Bestseller" || course.badge === "Popular" ? "gold" : "electric"}`}>
              {course.badge}
            </span>
          </div>
        )}

        {/* Discount */}
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
          {discount}% OFF
        </div>

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <Play size={22} className="text-white fill-white ml-1" />
          </div>
        </div>

        {/* Progress bar if enrolled */}
        {course.enrolled && course.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-1.5 bg-white/10">
              <div className="progress-bar h-1.5" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category & Level */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
            {course.categoryLabel}
          </span>
          <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-slate-400 text-xs">by {course.instructor}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1,2,3,4,5].map(i => (
              <Star
                key={i}
                size={12}
                className={`${i <= Math.round(course.rating) ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
              />
            ))}
          </div>
          <span className="text-amber-400 text-xs font-bold">{course.rating}</span>
          <span className="text-slate-500 text-xs">({course.reviews.toLocaleString()})</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-blue-400" /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={12} className="text-blue-400" /> {course.lessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} className="text-blue-400" /> {course.students.toLocaleString()}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {course.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] text-blue-300 bg-blue-900/30 border border-blue-800/40 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          <div>
            {course.enrolled ? (
              <span className="text-green-400 font-bold text-sm">✓ Enrolled</span>
            ) : (
              <>
                <span className="text-white font-black text-lg">৳{course.price}</span>
                <span className="text-slate-500 text-xs line-through ml-2">৳{course.originalPrice}</span>
              </>
            )}
          </div>
          <button className="btn-primary text-xs py-2 px-4">
            {course.enrolled ? "Continue" : "Enroll Now"}
          </button>
        </div>

        {/* Progress if enrolled */}
        {course.enrolled && course.progress > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Progress</span>
              <span className="text-blue-400 font-semibold">{course.progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5">
              <div className="progress-bar h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
