import { Link } from 'react-router-dom';
import { Category } from '@/types';

const CategoryCard = ({ category }: { category: Category }) => (
  <Link
    to={`/products?category=${category.slug}`}
    className="group relative aspect-[4/3] rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300"
  >
    <img
      src={category.image_url}
      alt={category.name}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
    <div className="absolute bottom-0 left-0 p-4">
      <h3 className="text-primary-foreground font-semibold text-lg">{category.name}</h3>
    </div>
  </Link>
);

export default CategoryCard;
