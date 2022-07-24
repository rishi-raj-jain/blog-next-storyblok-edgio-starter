import { getAllPostsForHome } from "@/lib/api"

export async function getStaticProps() {
    const allPosts = (await getAllPostsForHome()) || []
    return {
      props: { allPosts },
    }
  }