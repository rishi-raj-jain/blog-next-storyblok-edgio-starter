import Link from 'next/link'
import { Prefetch } from '@edgio/react'
import { createNextDataURL } from '@edgio/next/client'
import { render } from 'storyblok-rich-text-react-renderer'
import { getAllPostsWithSlug, getNextBlog, getPost, getPrevBlog } from '@/lib/api'

const Page = ({ post, morePosts }) => {
  return (
    <>
      <div className="mt-5 flex flex-col rounded border border-gray-200/10 p-5">
        <h1 className="text-xl font-semibold text-gray-200">{post.content.title}</h1>
        <h1 className="mt-3 text-lg font-medium text-gray-300">{render(post.content.long_text)}</h1>
        <img className="mt-3 h-[250px] w-screen max-w-full object-cover" loading="lazy" src={post.content.image} />
      </div>
      <div className="flex w-full flex-row items-center justify-between">
        {morePosts &&
          morePosts.length > 0 &&
          morePosts.map((i) => (
            <Link key={i.slug} href={`/blog/${i.slug}`}>
              <Prefetch url={createNextDataURL({ href: `/blog/${i.slug}`, routeParams: { slug: i.slug } })}>
                <a href={`/blog/${i.slug}`} className="mt-5 flex flex-col rounded border border-gray-200/10 p-5">
                  <span className="text-xl font-semibold text-gray-300">{i.name}</span>
                  <span className="mt-3 text-sm text-gray-300">{i.indicator}</span>
                </a>
              </Prefetch>
            </Link>
          ))}
      </div>
    </>
  )
}

export default Page

export async function getStaticProps({ params }) {
  // Get the data for the current post
  const data = await getPost(params.slug)
  // Get the previous blog
  const prevBlog = await getPrevBlog(data['post']['first_published_at'], data['post']['full_slug'])
  if (prevBlog.length > 0) prevBlog[0]['indicator'] = 'Previous'
  // Get the next blog
  const nextBlog = await getNextBlog(data['post']['first_published_at'], data['post']['full_slug'])
  if (nextBlog.length > 0) nextBlog[0]['indicator'] = 'Next'

  return {
    props: {
      post: data.post,
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
