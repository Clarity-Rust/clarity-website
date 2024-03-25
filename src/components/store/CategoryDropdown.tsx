import { getAllCategories } from "@/lib/Actions";
import { Category } from "../../../types";

export default async function CategoryDropdown() {
  const categories: Category[] = await getAllCategories();

  return (
    <div>
      <select>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
}
