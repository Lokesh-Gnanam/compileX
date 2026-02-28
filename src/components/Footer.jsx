import { Github, Code2, Globe, Mail } from 'lucide-react';

const LINKS = [
  {
    id: 'github-link',
    href: 'https://github.com/Lokesh-Gnanam',
    icon: <Github className="w-3.5 h-3.5" />,
    label: 'GitHub',
    color: 'hover:text-slate-200',
  },
  {
    id: 'leetcode-link',
    href: 'https://leetcode.com/u/Lokesh-Codes',
    icon: <Code2 className="w-3.5 h-3.5" />,
    label: 'LeetCode',
    color: 'hover:text-orange-400',
  },
  {
    id: 'portfolio-link',
    href: 'https://lokeshgnanam.vercel.app',
    icon: <Globe className="w-3.5 h-3.5" />,
    label: 'Portfolio',
    color: 'hover:text-blue-400',
  },
  {
    id: 'email-link',
    href: 'mailto:lokeshgnanam@gmail.com',
    icon: <Mail className="w-3.5 h-3.5" />,
    label: 'lokeshgnanam@gmail.com',
    color: 'hover:text-green-400',
  },
];

export default function Footer() {
  return (
    <footer
      id="compilex-footer"
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-0"
      style={{
        height: '36px',
        background: 'rgba(7, 11, 23, 0.96)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Left: social links */}
      <div className="flex items-center gap-4">
        {LINKS.map((link) => (
          <a
            key={link.id}
            id={link.id}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-[11px] font-medium text-slate-500
              transition-colors duration-200 ${link.color}`}
            title={link.label}
          >
            {link.icon}
            <span className="hidden sm:inline">{link.label}</span>
          </a>
        ))}
      </div>

      {/* Right: attribution */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-600 no-select">
        <span>Made by</span>
        <span className="font-semibold text-slate-400">Lokesh</span>
        <span className="text-slate-700">•</span>
        <span className="text-slate-500">Department of Artificial Intelligence &amp; Data Science</span>
      </div>
    </footer>
  );
}
