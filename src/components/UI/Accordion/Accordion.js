import React, { useState } from "react";
import Card from "../Card/Card";
import classes from "./Accordion.module.css";

const Accordion = ({ space }) => {
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
            <p>
              {space?.comments?.sort
                ? space?.comments?.sort
                : "No comments yet."}
            </p>
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
            <p>
              {space?.comments?.setInOrder
                ? space?.comments?.setInOrder
                : "No comments yet."}
            </p>
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
            <p>
              {space?.comments?.shine
                ? space?.comments?.shine
                : "No comments yet."}
            </p>
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
            <p>
              {space?.comments?.standarize
                ? space?.comments?.standarize
                : "No comments yet."}
            </p>
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
            <p>
              {space?.comments?.sustain
                ? space?.comments?.sustain
                : "No comments yet."}
            </p>
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
    </Card>
  );
};

export default Accordion;
