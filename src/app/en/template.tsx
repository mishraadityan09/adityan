import { BootSequence } from "@/components/layout/BootSequence";

// Templates remount on navigation, which is what gives each page its enter transition.
export default function EnTemplate({ children }: { children: React.ReactNode }) {
  return <BootSequence>{children}</BootSequence>;
}
