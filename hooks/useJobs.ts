import { trpc } from "~/utils/trpc";

export const useJobs = () => {
    const utils = trpc.useUtils();

    const { data, isLoading } = trpc.job.list.useQuery();

    const { mutateAsync: deleteJobAsync, isLoading: isDeletingJob } = trpc.job.delete.useMutation({
        async onSuccess() {
            // refetches jobs after a job is deleted
            await utils.job.list.invalidate();
        },
    });
    const { mutateAsync: addJobAsync, isLoading: isAddingJob } = trpc.job.add.useMutation({
        async onSuccess() {
            // refetches jobs after a job is added
            await utils.job.list.invalidate();
        },
    });

    return {
        jobs: data,
        isJobsLoading: isLoading,
        isAddingJob,
        isDeletingJob,
        addJobAsync,
        deleteJobAsync
    }
}