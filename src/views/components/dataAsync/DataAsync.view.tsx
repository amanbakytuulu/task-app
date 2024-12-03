import { ReactElement } from "react";
import { CircularProgress } from "../circularProgress";
import { WarningIcon } from "../icons/warning";
import { IBlockProps } from "./DataAsync";
import styles from "./DataAsync.module.scss";

export const DataAsync = <TData extends object>(
  props: IBlockProps<TData>
): ReactElement | null => {
  if (props.error) {
    const reload = () => {
      window.location.reload();
    };

    return (
      <div className={styles.stateBlock}>
        <div className={styles.stateBlock__error}>
          <WarningIcon className={styles.stateBlock__error_icon} />
          <div className={styles.stateBlock__error_message}>
            Неизвестная ошибка
          </div>
        </div>
        <a className={styles.stateBlock__link} href="#" onClick={reload}>
          Обновить страницу
        </a>
      </div>
    );
  }

  if (props.loading || !props.data) {
    return (
      <div className={styles.stateBlock}>
        <div className={styles.stateBlock__loader}>
          <CircularProgress width={24} height={24} />
        </div>
      </div>
    );
  }

  if (Array.isArray(props.data) && !props.data?.length) {
    return (
      <div className={styles.stateBlock}>
        <div className={styles.stateBlock__error_message}>Нет данных</div>
      </div>
    );
  }

  return props.children(props.data);
};
