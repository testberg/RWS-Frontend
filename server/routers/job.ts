/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import {
    createData, deleteData, fetchData, patchData,
    //uploadData
} from '~/helpers/apiCalls';
import { TranslationJob } from '~/types';

/**
 * Default selector for job.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

export const jobRouter = router({
    list: publicProcedure
        .query(async () => {
            return await fetchData<TranslationJob[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/GetJobs`)
        }),
    add: publicProcedure
        .input(
            z.object({
                customerName: z.string().min(1).max(32),
                originalContent: z.string().min(1),
            }),
        )
        .mutation(async ({ input }) => {
            return await createData<TranslationJob>(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/CreateJob`, JSON.stringify(input))
        }),
    delete: publicProcedure
        .input(
            z.object({
                id: z.string().uuid()
            }),
        )
        .mutation(async ({ input }) => {
            await deleteData(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/DeleteJob/${input.id}`)
        }),
    assginTranslator: publicProcedure
        .input(
            z.object({
                jobId: z.string().uuid(),
                translatorId: z.string().uuid()
            }),
        )
        .mutation(async ({ input }) => {
            const { translatorId, jobId } = input
            await patchData(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/UpdateJobTranslator/${jobId}?translatorId=${translatorId}`)
        })
});
