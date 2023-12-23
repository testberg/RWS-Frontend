import { NextPageWithLayout } from "./_app";
import JobListings from "~/components/Listings/JobListings";
import TranslatorListings from "~/components/Listings/TranslatorListings";

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
      <JobListings />
      <TranslatorListings />
    </>
  );
};

export default IndexPage;
