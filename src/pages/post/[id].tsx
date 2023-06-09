import type { 
  GetStaticProps, 
  NextPage 
} from "next";
import Link from 'next/link'
import Head from "next/head";
import { api } from "@/utils/api";
import { PageLayout } from "@/components/layout";

import { BsArrowLeft } from 'react-icons/bs'

import { generateSSGHelper } from "@/server/helpers/ssgHelper";
import { PostView } from "@/components/postview";

const SinglePostPage: NextPage<{ id: string }> = ({id}) => {

  const { data } = api.posts.getById.useQuery({
    id,
  });
  if (!data) return <div className="h-screen flex justify-center items-center">404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - ${data.author.username}`}</title>
        <meta name="description" content="" />
      </Head>
          <PageLayout>
            <Link href="/">
              <BsArrowLeft 
                className="text-black text-3xl m-4 absolute hover:-translate-x-1 transition duration-200" />
            </Link>
              <div className="mt-12 md:mt-24">
                <PostView {...data} />
              </div>
          </PageLayout>
    </>
  ); 
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id!== 'string') throw new Error("no slug");

  await ssg.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return {paths: [], fallback: "blocking"}
}

export default SinglePostPage;