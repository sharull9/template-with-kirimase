import ProjectList from "@/components/projects/ProjectList";
import NewProjectModal from "@/components/projects/ProjectModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Projects() {
  await checkAuth();
  const { projects } = await api.projects.getProjects.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Projects</h1>
        <NewProjectModal />
      </div>
      <ProjectList projects={projects} />
    </main>
  );
}
