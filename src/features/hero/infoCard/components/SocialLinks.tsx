import { GithubIcon } from "../../../../shared/icons/GithubIcon"
import { LinkedinIcon } from "../../../../shared/icons/LinkedinIcon"
import { MessageCircle } from 'lucide-react'

export function SocialLinks() {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono font-black text-xs
                     px-3 py-1.5 bg-[#6E40C9] text-white border-2 border-zinc-800
                     shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]
                     hover:translate-x-px hover:translate-y-px
                     transition-all duration-100"
        >
          <GithubIcon size={14} />
          GITHUB
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono font-black text-xs
                     px-3 py-1.5 bg-link-blue text-black border-2 border-black
                     shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]
                     hover:translate-x-px hover:translate-y-px
                     transition-all duration-100"
        >
          <LinkedinIcon size={14} />
          LINKEDIN
        </a>
        <a
          href="https://wa.me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono font-black text-xs
                     px-3 py-1.5 bg-link-green text-black border-2 border-black
                     shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]
                     hover:translate-x-px hover:translate-y-px
                     transition-all duration-100"
        >
          <MessageCircle size={14} />
          WHATSAPP
        </a>
      </div>
    </>
  )
}