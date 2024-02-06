import { projectSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getProjects } from "@/lib/api/projects/queries";


// Schema for projects - used to validate API requests
const baseSchema = projectSchema.omit(timestamps)

export const insertProjectSchema = baseSchema.omit({ id: true });
export const insertProjectParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateProjectSchema = baseSchema;
export const updateProjectParams = updateProjectSchema.extend({}).omit({ 
  userId: true
});
export const projectIdSchema = baseSchema.pick({ id: true });

// Types for projects - used to type API request params and within Components
export type Project = z.infer<typeof projectSchema>;
export type NewProject = z.infer<typeof insertProjectSchema>;
export type NewProjectParams = z.infer<typeof insertProjectParams>;
export type UpdateProjectParams = z.infer<typeof updateProjectParams>;
export type ProjectId = z.infer<typeof projectIdSchema>["id"];
    
// this type infers the return from getProjects() - meaning it will include any joins
export type CompleteProject = Awaited<ReturnType<typeof getProjects>>["projects"][number];

