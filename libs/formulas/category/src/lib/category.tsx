import CategoryList from './components/category-list';

/* eslint-disable-next-line */
export interface CategoryProps {}

export async function CategoryPage(props: CategoryProps) {
  return (
    <div>
      <CategoryList />
    </div>
  );
}

export default CategoryPage;
