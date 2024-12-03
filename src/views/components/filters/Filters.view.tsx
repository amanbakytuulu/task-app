import { ChangeEvent, useEffect } from "react";
import { useActions, useAppSelector } from "../../../shared/hooks";
import styles from "./Filters.module.scss";

export const Filters = () => {
  const { filters } = useAppSelector((state) => state.products);
  const {
    categories,
    loading: catLoading,
    error: catError,
  } = useAppSelector((state) => state.categories);

  const { fetchProducts, fetchCategories, setCategoryFilter } = useActions();

  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
    fetchProducts({ _start: 0, _limit: 10 });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    fetchProducts({ _start: 0, _limit: 10, _onlyFavorite: checked });
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className={styles.filters}>
      <select
        disabled={catLoading || !!catError}
        value={filters.category || undefined}
        onChange={onCategoryChange}
      >
        <option value="">Все категории</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.title}
          </option>
        ))}
      </select>

      <div className={styles.favoriteBox}>
        <label htmlFor="fav">Только избранные</label>
        <input id="fav" type="checkbox" onChange={handleChange} />
      </div>
    </div>
  );
};
