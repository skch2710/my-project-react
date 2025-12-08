import React from "react";
import Child from "./Child";

const Parent = () => {
  let parentObj = {
    name: "Sathish",
    age: 25,
  };

  let parentArray = [
    {
      name: "Sathish",
      age: 25,
    },
    {
      name: "Kumar",
      age: 30,
    },
  ];

  return (
    <div>
      <p>Parent Component</p>
      {/* <Child name={parentObj.name} age={parentObj.age} /> */}
      {/* <Child {...parentObj} /> */}
      {/* {parentArray.map((obj, index) => (
        console.log(`Index : ${index} , Obj: ${JSON.stringify(obj)}`),
        <Child key={index} {...obj} />
      ))} */}
      <Child {...parentObj}>
        <p>Name : {parentObj.name} </p>
        <p>Age : {parentObj.age} </p>
      </Child>
    </div>
  );
};

export default Parent;
