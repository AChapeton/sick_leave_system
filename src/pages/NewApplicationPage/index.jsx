import React from "react";
import { NewApplicationForm } from "../../modules/NewApplicationForm";
import styles from "./styles.module.scss";

const NewApplicationPage = () => {
  return (
    <div className={styles.newAppPage}>
      <p className={styles.newAppPage__title}>NewApplicationPage</p>
      <NewApplicationForm />
    </div>
  );
};

export { NewApplicationPage };
