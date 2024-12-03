import { FC, SVGProps } from "react";
import cn from "classnames";
import { LoaderIcon } from "../icons/loader";
import { CircularProgressProps } from "./CircularProgress.models";
import styles from "./CircularProgress.module.scss";

export const CircularProgress: FC<CircularProgressProps> = (props) => {
  const loaderProps: SVGProps<SVGSVGElement> = {
    ...props,
    className: cn(props.className, styles.spin),
  };

  return <LoaderIcon {...loaderProps} />;
};
