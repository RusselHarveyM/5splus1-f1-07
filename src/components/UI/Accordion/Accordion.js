import React, { useState } from "react";
import Card from "../Card/Card";
import classes from "./Accordion.module.css";

const Accordion = () => {
  const [isSort, setIsSort] = useState(false);
  const [isSIO, setIsSIO] = useState(false);
  const [isShine, setIsShine] = useState(false);
  const [isStandardize, setIsStandardize] = useState(false);
  const [isSustain, setIsSustain] = useState(false);
  const [isSafety, setIsSafety] = useState(false);

  const onSortHandler = () => {
    setIsSort(!isSort);
    setIsSIO(false);
    setIsShine(false);
    setIsStandardize(false);
    setIsSustain(false);
    setIsSafety(false);
  };
  const onSIOHandler = () => {
    setIsSort(false);
    setIsSIO(!isSIO);
    setIsShine(false);
    setIsStandardize(false);
    setIsSustain(false);
    setIsSafety(false);
  };
  const onShineHandler = () => {
    setIsSort(false);
    setIsSIO(false);
    setIsShine(!isShine);
    setIsStandardize(false);
    setIsSustain(false);
    setIsSafety(false);
  };
  const onStandardizeHandler = () => {
    setIsSort(false);
    setIsSIO(false);
    setIsShine(false);
    setIsStandardize(!isStandardize);
    setIsSustain(false);
    setIsSafety(false);
  };
  const onSustainHandler = () => {
    setIsSort(false);
    setIsSIO(false);
    setIsShine(false);
    setIsStandardize(false);
    setIsSustain(!isSustain);
    setIsSafety(false);
  };
  const onSafetyHandler = () => {
    setIsSort(false);
    setIsSIO(false);
    setIsShine(false);
    setIsStandardize(false);
    setIsSustain(false);
    setIsSafety(!isSafety);
  };

  return (
    <Card className={classes.accordionContainer}>
      {isSort ? (
        <div
          className={classes.accordionContainer_item}
          onClick={onSortHandler}
        >
          <h3>SORT</h3>
          <div className={classes.accordionContainer_comments}>
            Est dolore labore enim quis consectetur. Do dolor est nulla officia
            cillum minim id quis ut incididunt nulla id ut. Irure minim
            incididunt consequat sint deserunt voluptate fugiat dolore anim anim
            et duis. Elit eiusmod laborum ullamco cillum fugiat do. Do aliquip
            ea culpa non aliqua veniam culpa minim. Occaecat deserunt et culpa
            laborum elit qui non sit non.
          </div>
        </div>
      ) : (
        <div
          className={classes.accordionContainer_item}
          onClick={onSortHandler}
        >
          <h3>SORT</h3>
        </div>
      )}
      {isSIO ? (
        <div className={classes.accordionContainer_item} onClick={onSIOHandler}>
          <h3>SET IN ORDER</h3>
          <div className={classes.accordionContainer_comments}>
            Magna non officia ex proident. Labore dolor nisi exercitation mollit
            irure est eiusmod minim. In aliqua elit ipsum ut sunt tempor
            deserunt.
          </div>
        </div>
      ) : (
        <div className={classes.accordionContainer_item} onClick={onSIOHandler}>
          <h3>SET IN ORDER</h3>
        </div>
      )}
      {isShine ? (
        <div
          className={classes.accordionContainer_item}
          onClick={onShineHandler}
        >
          <h3>SHINE</h3>
          <div className={classes.accordionContainer_comments}>
            Magna non officia ex proident. Labore dolor nisi exercitation mollit
            irure est eiusmod minim. In aliqua elit ipsum ut sunt tempor
            deserunt.
          </div>
        </div>
      ) : (
        <div
          className={classes.accordionContainer_item}
          onClick={onShineHandler}
        >
          <h3>SHINE</h3>
        </div>
      )}
      {isStandardize ? (
        <div
          className={classes.accordionContainer_item}
          onClick={onStandardizeHandler}
        >
          <h3>STANDARDIZE</h3>
          <div className={classes.accordionContainer_comments}>
            Magna non officia ex proident. Labore dolor nisi exercitation mollit
            irure est eiusmod minim. In aliqua elit ipsum ut sunt tempor
            deserunt.
          </div>
        </div>
      ) : (
        <div
          className={classes.accordionContainer_item}
          onClick={onStandardizeHandler}
        >
          <h3>STANDARDIZE</h3>
        </div>
      )}

      {isSustain ? (
        <div
          className={classes.accordionContainer_item}
          onClick={onSustainHandler}
        >
          <h3>SUSTAIN</h3>
          <div className={classes.accordionContainer_comments}>
            Magna non officia ex proident. Labore dolor nisi exercitation mollit
            irure est eiusmod minim. In aliqua elit ipsum ut sunt tempor
            deserunt.
          </div>
        </div>
      ) : (
        <div
          className={classes.accordionContainer_item}
          onClick={onSustainHandler}
        >
          <h3>SUSTAIN</h3>
        </div>
      )}
      {isSafety ? (
        <div
          className={classes.accordionContainer_item}
          onClick={onSafetyHandler}
        >
          <h3>SAFETY</h3>
          <div className={classes.accordionContainer_comments}>
            Occaecat officia voluptate reprehenderit aliqua ut Lorem proident
            anim. Et sit occaecat esse est officia enim magna velit culpa. Dolor
            mollit duis ullamco non fugiat exercitation cillum. Ad elit laboris
            excepteur nulla ipsum incididunt sint labore elit velit. Labore
            irure excepteur culpa consectetur laborum ipsum Lorem. Duis ipsum
            aliqua tempor anim enim ut Lorem non anim Lorem ullamco. Occaecat ut
            ex proident et cillum ea incididunt id reprehenderit officia id
            cillum. Et ex mollit anim fugiat irure ut commodo velit
            reprehenderit. Quis commodo do ut exercitation velit nisi enim
            ullamco esse reprehenderit. Dolore dolor do voluptate nostrud labore
            eu. Veniam sunt qui velit amet aliquip. Laboris occaecat aute mollit
            irure sit quis consectetur. Veniam amet laboris ullamco elit aliquip
            magna. Cupidatat Lorem qui sunt id veniam proident ad anim ullamco
            proident. Aliquip enim sunt pariatur ea esse consequat ad voluptate
            ipsum quis nisi magna. Anim dolor incididunt sunt ullamco proident
            ipsum anim. Consequat voluptate deserunt id aute voluptate.
          </div>
        </div>
      ) : (
        <div
          className={classes.accordionContainer_item}
          onClick={onSafetyHandler}
        >
          <h3>SAFETY</h3>
        </div>
      )}
    </Card>
  );
};

export default Accordion;
