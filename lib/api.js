async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch('https://gapi.storyblok.com/v1/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Token: 'rXZrPl7d34pOQBbuHXOHTgtt', // Insert your token here!
      Version: preview ? 'draft' : 'published',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getAllPostsForHome() {
  const data = await fetchAPI(
    `
      {
        PostItems(sort_by: "first_published_at:desc") {
          items {
            slug
            published_at
            first_published_at
            content {
              long_text
              intro
              title
              image
              author {
                name
                content
              }
            }
          }
        }
      }
    `
  )
  return data?.PostItems.items
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
      {
        PostItems {
          items {
            slug
          }
        }
      }
    `)
  return data?.PostItems.items
}

export async function getPost(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: ID!) {
      PostItem(id: $slug) {
        slug
        full_slug
        published_at
        first_published_at
        id
        content {
          long_text
          intro
          title
          image
          author {
            name
            content
          }
        }
      }
    }
    `,
    {
      variables: {
        slug: `posts/${slug}`,
      },
    }
  )
  return {
    post: data?.PostItem,
  }
}

export async function getPrevBlog(first_published_at, excluded_slug) {
  const data = await fetchAPI(
    `
      query ($first_published_at:String!, $excluded_slug: String!) {
        PostItems(
          per_page: 1,
          excluding_slugs: $excluded_slug,
          sort_by: "first_published_at:desc",
          first_published_at_lt: $first_published_at, 
        ) {
          items{
            name
            slug
          }
        }
      }
    `,
    {
      variables: {
        first_published_at,
        excluded_slug,
      },
    }
  )
  return data?.PostItems.items
}

export async function getNextBlog(first_published_at, excluded_slug) {
  const data = await fetchAPI(
    `
      query ($first_published_at:String!, $excluded_slug:String!) {
        PostItems(
          per_page: 1,
          excluding_slugs: $excluded_slug,
          sort_by: "first_published_at:asc",
          first_published_at_gt: $first_published_at, 
        ) {
          items{
            name
            slug
          }
        }
      }
    `,
    {
      variables: {
        first_published_at,
        excluded_slug,
      },
    }
  )
  return data?.PostItems.items
}