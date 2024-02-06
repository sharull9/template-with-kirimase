import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type ProjectId, projectIdSchema } from "@/lib/db/schema/projects";

export const getProjects = async () => {
  const { session } = await getUserAuth();
  const p = await db.project.findMany({ where: {userId: session?.user.id!}});
  return { projects: p };
};

export const getProjectById = async (id: ProjectId) => {
  const { session } = await getUserAuth();
  const { id: projectId } = projectIdSchema.parse({ id });
  const p = await db.project.findFirst({
    where: { id: projectId, userId: session?.user.id!}});
  return { project: p };
};

