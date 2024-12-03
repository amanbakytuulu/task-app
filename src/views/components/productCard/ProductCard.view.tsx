import { FC } from "react";
import cn from "classnames";
import styles from "./ProductCard.module.scss";
import { Product } from "../../../models/entities";
import { useActions } from "../../../shared/hooks";

export const ProductCard: FC<Product> = (props) => {
  const { id, title, category, favorite: fav, photo, price } = props;

  const { toggleFavoriteProduct } = useActions();

  return (
    <div className={styles.productCard}>
      <div className={styles.imageBlock}>
        <img src={photo} alt={title} />
        <button
          className={cn(styles.btnFavorite, {
            [styles.isFavorite]: fav,
          })}
          onClick={() =>
            toggleFavoriteProduct({
              id,
              fav,
            })
          }
        >
          ❤
        </button>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.priceBlock}>
          <div className={styles.price}>{price} сом</div>
          <span className={styles.category}>{category}</span>
        </div>
      </div>
    </div>
  );
};
