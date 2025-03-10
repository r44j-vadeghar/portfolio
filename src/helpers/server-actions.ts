import { client } from "@/sanity/lib/client";

export type Base = {
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

export interface Slug {
  _type: "slug";
  current: string;
}

export interface Image {
  _type: "image";
  asset: Reference;
}

export interface Reference {
  _ref: string;
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

export async function getBlogs(
  page: number = 1,
  pageSize: number = 5
): Promise<Blog[]> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const blogs = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc, _createdAt desc) [${start}...${end}] {
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

export async function getBlogPost(
  slug: string | undefined
): Promise<Blog | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    ...,
    categories[]->,
    "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0..5] {
      title,
      slug,
      mainImage
    }
  }`;
  const params = { slug };
  return slug ? await client.fetch(query, params) : null;
}

export async function getAllBlogs(): Promise<Blog[]> {
  const blogs = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
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
  const blogs = await client.fetch(`*[_type == "category"]`);
  return blogs;
}

export async function getCategory(): Promise<Category[]> {
  const blogs = await client.fetch(`*[_type == "category"]`);
  return blogs;
}

export async function getPostsFromCategory(id: string): Promise<Blog[]> {
  const blogs = await client.fetch(`*[_type == "post" && references($id)]`, {
    id,
  });
  return blogs;
}
