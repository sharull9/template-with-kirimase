import { router } from "@/lib/server/trpc";
import { accountRouter } from "./account";
import { projectsRouter } from "./projects";

export const appRouter = router({
  account: accountRouter,
  projects: projectsRouter,
});

export type AppRouter = typeof appRouter;
