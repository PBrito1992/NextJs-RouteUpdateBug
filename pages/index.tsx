import Layout from "../layout/Layout";
import ActivitySections from "../components/ActivitySections";

const Detail = () => <ActivitySections />;

export const getServerSideProps = async (context) => {
  console.log("INSIDE getServerSideProps");

  return {
    props: {
      title: "Idea details • InnovationCast UI",
      description: "Idea details page"
    }
  };
};

Detail.getLayout = (page, { ...props }) => {
  console.info("getTenantLayout", { props });
  console.info("----------------");
  return <Layout>{page}</Layout>;
};

export default Detail;
