import { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";

import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
  //pass onShowCart to HeaderCartButton as onClick

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Biergarten</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>

      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Table of food" />
      </div>
    </Fragment>
  );
}

export default Header;
