import React from "react";

const Child = (props) => {
  console.log(props);
  console.log(props.children);

  let parentName = props.name;

  return (
    <div>
      <p>Name : {parentName} </p>
      <p>Age : {props.age} </p>
      <p>Children Prop</p>
      {props.children}
    </div>
  );
};

export default Child;
