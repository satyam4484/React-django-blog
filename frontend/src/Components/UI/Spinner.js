import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className="text-center container">
      <div className={classes.spinner}></div>
    </div>
  );
};

export default Spinner;