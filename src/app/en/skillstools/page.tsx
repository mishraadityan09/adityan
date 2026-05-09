import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { SkillGroup } from "@/types";

export const metadata = { title: "Skills & Tools | Adityan Mishra" };

const SKILLS: SkillGroup[] = [
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React", iconSrc: "/icons-library/react.svg" },
      { name: "React Native", iconSrc: "/icons-library/react.svg" },
      { name: "Next.js", iconSrc: "/icons-framework/nextjs.svg", invertInDark: true },
      { name: "Flutter", iconSrc: "/icons-framework/flutter.svg" },
      { name: "Three.js" },
      { name: "Babylon.js" },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "JavaScript", iconSrc: "/icons-language/javascript.svg" },
      { name: "TypeScript", iconSrc: "/icons-language/typescript.svg" },
      { name: "Dart", iconSrc: "/icons-language/dart.svg" },
      { name: "Python" },
      { name: "HTML5", iconSrc: "/icons-language/html5.svg" },
      { name: "CSS", iconSrc: "/icons-language/css.svg" },
    ],
  },
  {
    category: "UI Libraries",
    items: [
      { name: "Tailwind CSS", iconSrc: "/icons-framework/tailwindcss.svg" },
      { name: "Material UI" },
      { name: "shadcn/ui", iconSrc: "/icons-library/shadcn-ui.svg", invertInDark: true },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git", iconSrc: "/icons-software/github.svg", invertInDark: true },
      { name: "Firebase", iconSrc: "/icons-database/firebase.svg" },
      { name: "Razorpay" },
      { name: "Figma", iconSrc: "/icons-design/figma.svg" },
      { name: "Postman", iconSrc: "/icons-software/postman.svg" },
      { name: "VS Code" },
    ],
  },
];

export default function SkillsPage() {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-y-3">
        <h1 itemProp="skillstools" className="topic">
          Skills &amp; Tools
        </h1>
        <h3 className="text-sm text-muted-foreground">
          Languages, frameworks, and tools I use to build web, mobile, and 3D experiences.
        </h3>
      </div>

      {/* Skill groups */}
      <div className="flex flex-col gap-6">
        {SKILLS.map((group) => (
          <div key={group.category} className="flex flex-col gap-3">
            <p className="title">{group.category}</p>
            <div className="flex flex-wrap gap-5">
              {group.items.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile prev/next */}
      <div className="lg:hidden flex justify-between flex-1 items-end">
        <Link
          href="/en/projects"
          className="h-fit flex items-center gap-1 uppercase rounded-full shadow shadow-stone-100 px-3 py-2 text-sm"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden />
          prev
        </Link>
        <Link
          href="/en/experience"
          className="h-fit flex items-center gap-1 uppercase rounded-full shadow shadow-stone-100 px-3 py-2 text-sm"
        >
          next
          <ArrowRight className="w-5 h-5" aria-hidden />
        </Link>
      </div>
    </>
  );
}

function SkillBadge({ skill }: { skill: SkillGroup["items"][number] }) {
  return (
    <button
      type="button"
      className="inline-flex shrink-0 items-center gap-2 rounded-md border border-input bg-input/30 hover:bg-input/50 px-4 py-2 text-sm font-medium transition-colors"
    >
      {skill.iconSrc && (
        <Image
          src={skill.iconSrc}
          alt={skill.name}
          width={22}
          height={22}
          className={skill.invertInDark ? "text-inherit dark:invert" : "text-inherit"}
          style={{ height: "auto" }}
        />
      )}
      {skill.name}
    </button>
  );
}
