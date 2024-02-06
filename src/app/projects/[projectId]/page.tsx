import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { api } from "@/lib/trpc/api";
import React from "react";

type Props = {
    params: {
        projectId: string;
    };
};

export default async function Page({ params }: Props) {
    await checkAuth();
    const { session } = await getUserAuth();
    const data = await api.projects.getProjectById.query({
        id: params.projectId,
    });
    return (
        <div className="grid grid-cols-2 lg:max-w-3xl gap-3">
            <div>Project Id: </div>
            <div>{data.project?.id}</div>
            <div>Project Url:</div>
            <div> {data.project?.url}</div>
            <div>User Id: </div>
            <div>
                {data.project?.userId} | {session?.user.email}
            </div>
            <div>Created At: </div>
            <div>{data.project?.createdAt.toDateString()}</div>
            <div>Updated At: </div>
            <div>{data.project?.updatedAt.toDateString()}</div>
        </div>
    );
}
