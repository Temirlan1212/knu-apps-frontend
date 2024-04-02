import { useBlogState, useBlogCuState } from './store/blog.store';
import { blogController as blogControllerLocal } from './conrollers/blog-crud.conroller';
const blogController = blogControllerLocal();
export { blogController, useBlogState, useBlogCuState };
