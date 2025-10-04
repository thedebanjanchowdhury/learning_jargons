// import React from "react";
import { createRoot } from "react-dom/client";
import { Pizza } from "./Pizza";

const App = () => {
  return (
    <div className="">
      <h1>Padre Gino's - Order Now</h1>
      <Pizza name="Pepperoni" description="Mozzarella Cheese, Pepperoni" />
      <Pizza
        name="Hawaiian"
        description="Sliced Ham, Pineapple, Mozzarella Cheese"
      />
      <Pizza
        name="Meat Feast"
        description="Bacon, Pepperoni, Italian Sausage, Chorizo Sausage"
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
