import { db } from "@/lib/db/index";
import { 
  ProjectId, 
  NewProjectParams,
  UpdateProjectParams, 
  updateProjectSchema,
  insertProjectSchema, 
  projectIdSchema 
} from "@/lib/db/schema/projects";
import { getUserAuth } from "@/lib/auth/utils";

export const createProject = async (project: NewProjectParams) => {
  const { session } = await getUserAuth();
  const newProject = insertProjectSchema.parse({ ...project, userId: session?.user.id! });
  try {
    const p = await db.project.create({ data: newProject });
    return { project: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateProject = async (id: ProjectId, project: UpdateProjectParams) => {
  const { session } = await getUserAuth();
  const { id: projectId } = projectIdSchema.parse({ id });
  const newProject = updateProjectSchema.parse({ ...project, userId: session?.user.id! });
  try {
    const p = await db.project.update({ where: { id: projectId, userId: session?.user.id! }, data: newProject})
    return { project: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteProject = async (id: ProjectId) => {
  const { session } = await getUserAuth();
  const { id: projectId } = projectIdSchema.parse({ id });
  try {
    const p = await db.project.delete({ where: { id: projectId, userId: session?.user.id! }})
    return { project: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

