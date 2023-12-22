import { trpc } from "../utils/trpc";
import { NextPageWithLayout } from "./_app";
import { inferProcedureInput } from "@trpc/server";
import { Space } from "antd";
import Link from "next/link";
import { Fragment } from "react";
import JobListings from "~/components/Listings/JobListings";
import TranslatorListings from "~/components/Listings/TranslatorListings";
import type { AppRouter } from "~/server/routers/_app";

const IndexPage: NextPageWithLayout = () => {
  // const utils = trpc.useUtils();
  // const postsQuery = trpc.post.list.useInfiniteQuery(
  //   {
  //     limit: 5,
  //   },
  //   {
  //     getPreviousPageParam(lastPage) {
  //       return lastPage.nextCursor;
  //     },
  //   }
  // );

  // const addPost = trpc.post.add.useMutation({
  //   async onSuccess() {
  //     // refetches posts after a post is added
  //     await utils.post.list.invalidate();
  //   },
  // });

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   const allPosts = postsQuery.data?.pages.flatMap((page) => page.items) ?? [];
  //   for (const { id } of allPosts) {
  //     void utils.post.byId.prefetch({ id });
  //   }
  // }, [postsQuery.data, utils]);

  return (
    <>
      <JobListings />
      <TranslatorListings />
    </>
  );
};

export default IndexPage;
