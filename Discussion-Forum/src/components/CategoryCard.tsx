interface CategoryCardProps {
    category: string;
  }
  
  const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    return (
      <div className="bg-[#2b2a2a] rounded-3xl p-4 w-full h-full flex justify-center items-center">
        <p className="text-white text-lg font-semibold">{category}</p>
      </div>
    );
  };
  
  export default CategoryCard;
  