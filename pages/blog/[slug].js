import { getAllPostsWithSlug, getNextBlog, getPost, getPrevBlog } from "@/lib/api"


export async function getStaticProps({ params }) {
  // Get the data for the current post
  const data = await getPost(params.slug)
  // Get the previous blog
  const prevBlog = await getPrevBlog(
    data['post']['first_published_at'],
    data['post']['full_slug']
  )
  if (prevBlog.length > 0) prevBlog[0]['indicator'] = 'Previous'
  // Get the next blog
  const nextBlog = await getNextBlog(
    data['post']['first_published_at'],
    data['post']['full_slug']
  )
  if (nextBlog.length > 0) nextBlog[0]['indicator'] = 'Next'

  return {
    props: {
      post: {
        ...data.post,
        html: data.post?.content?.long_text
          ? new RichTextResolver().render(data.post.content.long_text)
          : null,
      },
      morePosts: [...prevBlog, ...nextBlog],
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map((post) => `/blog/${post.slug}`) || [],
    fallback: 'blocking',
  }
}