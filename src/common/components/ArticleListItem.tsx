// import { Calendar, User } from 'lucide-react';

// interface ArticleListItemProps {
//   date: string;
//   title: string;
//   writer: string;
// }

// export function ArticleListItem({ date, title, writer }: ArticleListItemProps) {
//   return (
//     <div className="border-b border-[#67e0b8]/20 last:border-0 py-4 px-6 hover:bg-[#2d6b57]/50 transition-colors">
//       <div className="flex flex-col md:flex-row md:items-center gap-3">
//         <div className="flex items-center gap-2 text-gray-300">
//           <Calendar className="w-4 h-4" />
//           <span>{date}</span>
//         </div>
//         <div className="flex-1 text-white">
//           {title}
//         </div>
//         <div className="flex items-center gap-2 text-gray-300">
//           <User className="w-4 h-4" />
//           <span>{writer}</span>
//         </div>
//       </div>
//     </div>
//   );
// }