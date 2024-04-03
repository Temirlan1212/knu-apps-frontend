import { BlogDocument } from '@/libs/formulas/blog/src';

export default function BlogSlugPage({
  params,
}: {
  params: { slug: string[] };
}) {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */

  return (
    <div className="container">
      <BlogDocument
        blogSlug={params.slug[0]}
        blogDocumentSlug={params.slug[1]}
      />
    </div>
  );
}
