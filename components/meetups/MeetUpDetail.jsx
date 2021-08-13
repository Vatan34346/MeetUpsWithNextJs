
import classes from './MeetUpDetail.module.css';


const MeetUpDet = (props) => {
  return (
    <section className={classes.detail} > 
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.adress}</address>
      <p>{props.description}</p>
    </section>
  );
};
export default MeetUpDet;
