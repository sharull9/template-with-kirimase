import { getProjectById, getProjects } from "@/lib/api/projects/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  projectIdSchema,
  insertProjectParams,
  updateProjectParams,
} from "@/lib/db/schema/projects";
import { createProject, deleteProject, updateProject } from "@/lib/api/projects/mutations";

export const projectsRouter = router({
  getProjects: publicProcedure.query(async () => {
    return getProjects();
  }),
  getProjectById: publicProcedure.input(projectIdSchema).query(async ({ input }) => {
    return getProjectById(input.id);
  }),
  createProject: publicProcedure
    .input(insertProjectParams)
    .mutation(async ({ input }) => {
      return createProject(input);
    }),
  updateProject: publicProcedure
    .input(updateProjectParams)
    .mutation(async ({ input }) => {
      return updateProject(input.id, input);
    }),
  deleteProject: publicProcedure
    .input(projectIdSchema)
    .mutation(async ({ input }) => {
      return deleteProject(input.id);
    }),
});
