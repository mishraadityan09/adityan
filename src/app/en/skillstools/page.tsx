import Image from "next/image";
import type { SkillGroup } from "@/types";
import { MobilePager } from "@/components/layout/MobilePager";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Skills & Tools",
  description:
    "Languages, frameworks and tools Adityan Mishra uses to build web, mobile and 3D experiences — React, Next.js, Flutter, TypeScript, Three.js and more.",
  path: "/en/skillstools",
});

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
  {
    category: "AI & Developer Tools",
    items: [
      { name: "Claude Code CLI" },
      { name: "MCP Servers" },
      { name: "Figma MCP", iconSrc: "/icons-design/figma.svg" },
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
        <p className="text-sm text-muted-foreground">
          Languages, frameworks, and tools I use to build web, mobile, and 3D experiences.
        </p>
      </div>

      {/* Skill groups */}
      <div className="flex flex-col gap-6">
        {SKILLS.map((group) => (
          <div key={group.category} className="flex flex-col gap-3">
            <p className="title">{group.category}</p>
            <ul className="flex flex-wrap gap-3 sm:gap-4 lg:gap-5">
              {group.items.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <MobilePager />
    </>
  );
}

function SkillBadge({ skill }: { skill: SkillGroup["items"][number] }) {
  return (
    <li className="inline-flex shrink-0 items-center gap-2 rounded-md border border-input bg-input/30 hover:bg-input/50 px-4 py-2 text-sm font-medium transition-colors">
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
    </li>
  );
}
