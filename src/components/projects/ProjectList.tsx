"use client";
import { CompleteProject } from "@/lib/db/schema/projects";
import { trpc } from "@/lib/trpc/client";
import ProjectModal from "./ProjectModal";
import Link from "next/link";


export default function ProjectList({ projects }: { projects: CompleteProject[] }) {
  const { data: p } = trpc.projects.getProjects.useQuery(undefined, {
    initialData: { projects },
    refetchOnMount: false,
  });

  if (p.projects.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.projects.map((project) => (
        <Project project={project} key={project.id} />
      ))}
    </ul>
  );
}

const Project = ({ project }: { project: CompleteProject }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <Link href={`/projects/${project.id}`}>{project.url}</Link>
      </div>
      <ProjectModal project={project} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No projects
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new project.
      </p>
      <div className="mt-6">
        <ProjectModal emptyState={true} />
      </div>
    </div>
  );
};

