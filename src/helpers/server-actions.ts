import { sanityClient } from "sanity:client";

type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

export interface Span {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

interface Slug {
  _type: "slug";
  current: string;
}

interface Image {
  _type: "image";
  asset: Reference;
}

interface Reference {
  _ref: "string";
  _type: "reference";
}

export interface Block {
  _key: string;
  _type: "block";
  children: Span[];
  markDefs: unknown[];
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  split: (separator: string | RegExp) => string[];
  subheadings?: Block[];
}

export interface Category extends Base {
  title: string;
  descriptions: string;
}

export interface Blog extends Base {
  body: Block[];
  categories: Category[];
  title: string;
  slug: Slug;
  mainImage: Image;
  publishedAt: string;
  seoKeywords?: string | undefined;
  seoTitle: string;
  seoDescription: string;
  related: [
    {
      title: string;
      slug: Slug;
      mainImage: Image;
    }
  ];
}

export async function getBlogs(page: number = 1): Promise<Blog[]> {
  const pageSize = 9;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const blogs = await sanityClient.fetch(
    `*[_type == "post"] | order(orderRank) [${start}...${end}] {
      ...,
      categories[]->,
      "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0..5] {
        title,
        slug,
        mainImage
      }
    }`
  );

  return blogs;
}

// export async function getRelatedBlogs(slug: string): Promise<Blog[]> {
//   const blogs = await sanityClient.fetch(
//     `*[_type == "post" && slug.current == ${slug}][0] {
//       title,
//       categories[]->,

//     }
//     `
//   );

//   return blogs;
// }

export async function getAllBlogs(): Promise<Blog[]> {
  const blogs = await sanityClient.fetch(
    `*[_type == "post"] | order(orderRank) {
      ...,
      categories[]->,
      "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0..5] {
        title,
        slug,
        mainImage
      }
    }`
  );

  return blogs;
}

export async function getAllCategories(): Promise<Category[]> {
  const blogs = await sanityClient.fetch(`*[_type == "category"]`);

  return blogs;
}

export async function getCategory(): Promise<Category[]> {
  const blogs = await sanityClient.fetch(`*[_type == "category"]`);

  return blogs;
}

export async function getPostsFromCategory(id: string): Promise<Blog[]> {
  const blogs = await sanityClient.fetch(
    `*[_type == "post" && references(^.${id}))`
  );

  return blogs;
}
