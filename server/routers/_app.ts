/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { jobRouter } from './job';
import { translatorRouter } from './translator';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  job: jobRouter,
  translator: translatorRouter
});

export type AppRouter = typeof appRouter;
