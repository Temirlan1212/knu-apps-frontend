import { BlogPage } from '@/libs/formulas/blog/src';
import { Header } from '@/libs/formulas/layouts/src';

export default async function BlogSlugPage() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */

  return (
    <>
      <Header />
      <div className="container">
        <BlogPage />
      </div>
    </>
  );
}
