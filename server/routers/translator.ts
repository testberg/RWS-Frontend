/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createData, deleteData, fetchData } from '~/helpers/translationManagementService';
import { Translator } from '~/types';

/**
 * Default selector for translator.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

export const translatorRouter = router({
    list: publicProcedure
        .query(async () => {
            const translators = await fetchData<Translator[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/TranslatorsManagement/GetTranslators`)
            if (!translators) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `No translator found`,
                });
            }
            return translators;
        }),
    add: publicProcedure
        .input(
            z.object({
                name: z.string().min(1).max(32),
                status: z.string(),
                hourlyRate: z.number().nonnegative(),
                creditCardNumber: z.string().length(16)
            }),
        )
        .mutation(async ({ input }) => {
            const translator =
                await createData<Translator>(`${process.env.NEXT_PUBLIC_API_URL}/api/TranslatorsManagement/CreateTranslator`, JSON.stringify(input))
            if (!translator) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `Failed to insert translator`,
                });
            }
            return translator;
        }),
    delete: publicProcedure
        .input(
            z.object({
                id: z.string().uuid()
            }),
        )
        .mutation(async ({ input }) => {
            try {
                await deleteData(`${process.env.NEXT_PUBLIC_API_URL}/api/TranslatorsManagement/DeleteTranslator/${input.id}`)
            } catch (error) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `Failed to delete translator`,
                });
            }
        }),
});
