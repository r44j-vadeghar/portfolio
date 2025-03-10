import SocialLinks from "@/constants/socials";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

type SocialsProps = {
  className?: string;
};

export default function Socials({ className = "" }: SocialsProps) {
  return (
    <div id="socials" className={className}>
      <Link
        href={SocialLinks.github.url}
        title={SocialLinks.github.title}
        aria-label={SocialLinks.github.title}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Github size={18} />
      </Link>
      <Link
        href={SocialLinks.linkedin.url}
        title={SocialLinks.linkedin.title}
        aria-label={SocialLinks.linkedin.title}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Linkedin size={18} />
      </Link>
      <Link
        href={SocialLinks.mail.url}
        title={SocialLinks.mail.title}
        aria-label={SocialLinks.mail.title}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Mail size={18} />
      </Link>
      <Link
        href={SocialLinks.instagram.url}
        title={SocialLinks.instagram.title}
        aria-label={SocialLinks.instagram.title}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Instagram size={18} />
      </Link>
      <Link
        href={SocialLinks.twitter.url}
        title={SocialLinks.twitter.title}
        aria-label={SocialLinks.twitter.title}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Twitter size={18} />
      </Link>
      <Link
        href={SocialLinks.youtube.url}
        title={SocialLinks.youtube.title}
        aria-label={SocialLinks.youtube.title}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Youtube size={18} />
      </Link>
    </div>
  );
}
