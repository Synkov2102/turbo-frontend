import { PostDetails } from "@/widgets/post-details";
import { getPostById } from "@/entities/post/api/get-post-by-id";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Post } from "@/entities/post/model/types";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

function generateStructuredData(post: Post) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://turbo20.ru";
  const postUrl = `${siteUrl}/posts/${post.id}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.text.slice(0, 200),
    image: post.images || [],
    url: postUrl,
    datePublished: post.createdAt,
    ...(post.url && {
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": post.url,
      },
    }),
  };

  return structuredData;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const post = await getPostById(id);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://turbo20.ru";
    const postUrl = `${siteUrl}/posts/${id}`;
    const imageUrl = post.images?.[0] || `${siteUrl}/logo.svg`;
    const description = post.text.slice(0, 160);

    return {
      title: post.title,
      description: description,
      openGraph: {
        title: post.title,
        description: description,
        url: postUrl,
        type: "article",
        publishedTime: post.createdAt,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    return {
      title: "Пост не найден",
      description: "Пост не найден",
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  let post: Post;
  try {
    post = await getPostById(id);
  } catch (error) {
    notFound();
  }

  const structuredData = generateStructuredData(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PostDetails postId={id} />
    </>
  );
}
