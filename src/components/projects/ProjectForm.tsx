"use client";

import { Project, NewProjectParams, insertProjectParams } from "@/lib/db/schema/projects";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ProjectForm = ({
  project,
  closeModal,
}: {
  project?: Project;
  closeModal?: () => void;
}) => {

  const editing = !!project?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertProjectParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertProjectParams),
    defaultValues: project ?? {
      url: "",
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(`${action
        .slice(0, 1)
        .toUpperCase()
        .concat(action.slice(1))} Failed`);
      return;
    }

    await utils.projects.getProjects.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    if (action == "delete") { toast.error(`Project ${action}d!`) } else { toast.success(`Project ${action}d!`) }
  };

  const { mutate: createProject, isLoading: isCreating } =
    trpc.projects.createProject.useMutation({
      onSuccess: (res) => onSuccess("create"),
    });

  const { mutate: updateProject, isLoading: isUpdating } =
    trpc.projects.updateProject.useMutation({
      onSuccess: (res) => onSuccess("update"),
    });

  const { mutate: deleteProject, isLoading: isDeleting } =
    trpc.projects.deleteProject.useMutation({
      onSuccess: (res) => onSuccess("delete"),
    });

  const handleSubmit = (values: NewProjectParams) => {
    if (editing) {
      updateProject({ ...values, id: project.id });
    } else {
      createProject(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (<FormItem>
            <FormLabel>Url</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteProject({ id: project.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ProjectForm;
