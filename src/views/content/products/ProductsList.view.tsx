import { useEffect, useState } from "react";
import { useActions, useAppSelector } from "../../../shared/hooks";
import {
  CircularProgress,
  DataAsync,
  Filters,
  ProductCard,
} from "../../components";
import styles from "./ProductsList.module.scss";

export const ProductsList = () => {
  const [skip, setSkip] = useState(0);

  const { products, totalCount, loading, error } = useAppSelector(
    (state) => state.products
  );

  const { fetchProducts } = useActions();

  const onSkip = () => {
    setSkip((prev) => (prev += 10));
  };

  useEffect(() => {
    fetchProducts({ _start: skip, _limit: 10 });
  }, [fetchProducts, skip]);

  return (
    <>
      <Filters />
      <DataAsync loading={loading} error={error} data={products}>
        {(products) => (
          <>
            <div className={styles.productsList}>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </>
        )}
      </DataAsync>
      {totalCount > products.length && (
        <div className={styles.btnMore}>
          {loading && <CircularProgress width={24} height={24} />}
          <span onClick={onSkip} className={loading ? styles.disable : ""}>
            Показать ещё
          </span>
        </div>
      )}
    </>
  );
};
