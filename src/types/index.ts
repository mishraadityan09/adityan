export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  href: string;
  previewImage?: string;
  /** Shape of the preview screenshot — decides how the mobile card thumbnail is cropped. Defaults to "phone". */
  previewFrame?: "phone" | "browser";
}

export interface SkillItem {
  name: string;
  iconSrc?: string;
  invertInDark?: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export interface ContactInfo {
  label: string;
  value: string;
  href: string;
  iconSrc: string;
}
