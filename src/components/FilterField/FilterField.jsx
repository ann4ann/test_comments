import React, { useState } from "react";
import styles from "./FilterField.module.scss";

const FilterField = ({ handleChange, value, handleClick }) => {
  return (
    <div>
      <div className={styles["field-wrapper"]}>
        <input
          type="text"
          className={styles["field-wrapper__control"]}
          name="email"
          onChange={handleChange}
          value={value}
          placeholder="Адрес электронной почты"
          id="email"
        />
        <label htmlFor="email">Искать по email</label>
      </div>
    </div>
  );
};

export default FilterField;
