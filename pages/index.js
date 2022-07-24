import Link from 'next/link'
import { Prefetch } from '@layer0/react'
import { getAllPostsForHome } from '@/lib/api'
import { createNextDataURL } from '@layer0/next/client'

const Page = ({ allPosts }) => {
  return allPosts.map((i) => {
    return (
      <Link key={i.slug} href={`/blog/${i.slug}`}>
        <Prefetch url={createNextDataURL({ href: `/blog/${i.slug}`, routeParams: { slug: i.slug } })}>
          <a href={`/blog/${i.slug}`}>
            <div className="mt-5 flex flex-col rounded border border-gray-200/10 p-5">
              <h1 className="text-xl font-semibold text-gray-200">{i.content.title}</h1>
              <h1 className="mt-3 text-lg font-medium text-gray-300">{i.content.intro}</h1>
              <img className="mt-3 h-[250px] w-screen max-w-full object-cover" loading="lazy" src={i.content.image} />
            </div>
          </a>
        </Prefetch>
      </Link>
    )
  })
}

export default Page

export async function getStaticProps() {
  const allPosts = (await getAllPostsForHome()) || []
  return {
    props: { allPosts },
  }
}
