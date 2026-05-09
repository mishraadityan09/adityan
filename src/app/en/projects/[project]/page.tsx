import ProjectDetail from "./ProjectDetail";

type Params = {
  params: Promise<{
    project: string;
  }>;
};

export default async function Page({ params }: Params) {
  const { project } = await params;
  return <ProjectDetail project={project} />;
}
