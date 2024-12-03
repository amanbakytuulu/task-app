import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions, useDebounce } from "../../../shared/hooks";
import styles from "./Header.module.scss";

export const Header = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const debounceTitle = useDebounce(title, 500);
  const { fetchProducts, setTitleFilter } = useActions();

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onRedirectMain = () => {
    navigate("/");
  };

  useEffect(() => {
    setTitleFilter(debounceTitle);
    fetchProducts({ _start: 0, _limit: 10 });
  }, [debounceTitle]);

  return (
    <div className={styles.header}>
      <img
        onClick={onRedirectMain}
        className={styles.logo}
        src="images/logo.png"
        alt="logo"
      />
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Найти по названию..."
          value={title}
          onChange={onChangeTitle}
        />
        <button type="button">Поиск</button>
      </div>
      <div className={styles.controls}>
        <img src="icons/favorite.svg" alt="fav" width={24} />
      </div>
    </div>
  );
};
