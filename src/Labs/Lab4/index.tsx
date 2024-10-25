import ClickEvent from "./ClickEvent";
import ReduxExamples from "./ReduxExamples";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";

export default function Lab4() {

  function sayHello() {
    alert("Hello");
  }

    console.log('Hello World!');
  
    return (
      <div id="wd-lab3">
  <hr />
  
        <h3>Lab 4</h3>

        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello} />
        <EventObject />





        <ReduxExamples />




</div>
        );
        }