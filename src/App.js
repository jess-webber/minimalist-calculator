import React, { Component } from 'react';


const keypads = [
  { id: "seven", pad: "7"},
  { id: "eight", pad: "8"},
  { id: "nine", pad: "9"},
  { id: "multiply", pad: "*"},
  { id: "four", pad: "4"},
  { id: "five", pad: "5"},
  { id: "six", pad: "6"},
  { id: "divide", pad: "/"},
  { id: "one", pad: "1"},
  { id: "two", pad: "2"},
  { id: "three", pad: "3"},
  { id: "subtract", pad: "-"},
  { id: "zero", pad: "0"},
  { id: "decimal", pad: "."},
  { id: "equals", pad: "="},
  { id: "add", pad: "+"},
  { id: "clear", pad: "AC"},
];

class Kpads extends React.Component {

  handleClick = () => {
    if (this.props.pad === "=") {
      this.props.handleEquals("0");
    } else if (this.props.pad === "AC") {
       this.props.handleReset(0);
    } else {
   this.props.handleDisplay(this.props.pad);
   this.props.handleFormula(this.props.pad);
    }
  }

  render() {

  const keyStyle = {
    border: "1px solid white",
    height: "2vh",
    width: "2vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4vh",
    marginTop: "3vh",
    fontSize: "4px",
    marginLeft: "30px",
    fontWeight: "bold",
    borderRadius: "40px",
    color: "white"
  }

    const keyStyleOperator = {
    border: "1px solid white",
    height: "2vh",
    width: "2vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4vh",
    marginTop: "3vh",
    fontSize: "4px",
    marginLeft: "30px",
    fontWeight: "bold",
    borderRadius: "40px",
    backgroundColor: "orange",
    color: "white"
  }

    const clearStyle = {
    border: "1px solid white",
    height: "2vh",
    width: "20vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4vh",
    marginTop: "3vh",
    fontSize: "4px",
    marginLeft: "30px",
    fontWeight: "bold",
    borderRadius: "40px",
    backgroundColor: "#F84B4B",
    color: "white"
  }

    const otherSymbolStyle = {
    border: "1px solid white",
    height: "2vh",
    width: "2vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4vh",
    marginTop: "3vh",
    fontSize: "4px",
    marginLeft: "30px",
    fontWeight: "bold",
    borderRadius: "40px",
    backgroundColor: "grey",
    color: "white"
  }

  const fontStyle = {
      fontSize: "25px"
  }

  return (
    <div
      id={this.props.id}
      style={ (this.props.id === "add") || (this.props.id === "multiply") || (this.props.id === "subtract") || (this.props.id === "divide") ? keyStyleOperator
      : (this.props.id === "clear") ? clearStyle
      : (this.props.id === "decimal") || (this.props.id === "equals") ? otherSymbolStyle
      : keyStyle }
      onClick={this.handleClick}
    >
      <h1 style={fontStyle}>{this.props.pad}</h1>
    </div>
  );
}
}


class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      userKey: "",
      input: "0",
      processor: "",
    }

    this.handleFormula = this.handleFormula.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }


  handleFormula = userKey => {
   let testRegex = /[.][0-9]*$/;
   //If formula is zero add the charcter to formula
   if (this.state.input === "0") {
   this.setState(state => ({
   userKey: userKey,
   input: userKey
  }));
   } else if (userKey === "." && testRegex.test(this.state.input) === true) {

   } else {
   this.setState(state => ({
   userKey: userKey,
   input: state.input + userKey
  }));
    }
  }


  handleDisplay = userKey => {
  let testRegex = /[.][0-9]*$/;
  //  Don't allow multiple zeros at the beginning of calculation
  if (userKey === "0" && this.state.processor === "0") {
  this.setState(state => ({
  processor: "0"}));
  //Add first number in calculation to display
  } else if (userKey !== "0" && this.state.processor === "0") {
  this.setState(state => ({
  processor: userKey
  }));
  } else if (userKey === "." && testRegex.test(this.state.processor) === true) {

  } else {
  //Add userkey to display
  this.setState(state => ({
  processor: state.processor + userKey
  }));
  }
  }

  handleEquals = userKey => {
    var ourRegex = /[0-9]+[.]*[0-9]*|[-]|[+]|[*]|[/]/g;
    var numRegex = /\w|[0-9]*[.][0-9]*/
    var result = (this.state.input).match(ourRegex);
    var arrayLength = result.length;
    var total = 0;
     function isNumeric(num) {
     return !isNaN(num)
     };
    var check = isNumeric(result[0]);
    if (check === true) {
      total = parseFloat(result[0])
    };
    for (let i = 1; i < arrayLength; i++) {
      if (result[i] === "-" && numRegex.test(result[i + 1]) === true && numRegex.test(result[i - 1]) === true) {
        total = total - parseFloat(result[i + 1]);
      } else if (result[i] === "+" && numRegex.test(result[i + 1]) === true) {
        total = total + parseFloat(result[i + 1]);
      } else if (result[i] === "*" && numRegex.test(result[i + 1]) === true) {
        total = total * parseFloat(result[i + 1]);
      } else if (result[i] === "/" && numRegex.test(result[i + 1]) === true) {
        total = total / (parseFloat(result[i + 1]));
      } else if (result[i] === "-" && numRegex.test(result[i + 1]) === true && result[i - 1] === "*") { total = total * (-(parseFloat(result[i + 1])))
      } else if (result[i] === "-" && numRegex.test(result[i + 1]) === true && result[i - 1] === "/") { total = total / (-(parseFloat(result[i + 1])))                                                             } else if (result[i] === "-" && numRegex.test(result[i + 1]) === true && result[i - 1] === "+") { total = total - (parseFloat(result[i + 1]))
      } else if (result[i] === "-" && numRegex.test(result[i + 1]) === true && result[i - 1] === "-") { total = total + (parseFloat(result[i + 1]))
      } else {
        total = total
      }
    }
    this.setState(state => ({
    userKey: "=",
    input: state.input + "=" + total,
    processor: total
  }));
  }


  handleReset = userKey => this.setState(state => ({
    userKey: "",
    input: "",
    processor: "0"
  }));

  render() {

    const calculatorStyle = {
      paddingTop: "2vh",
      border: "5px solid #333232",
      width: "65vh",
      height: "95vh",
      backgroundColor: "#333232",
      marginTop: "2vh",
      marginBottom: "10vh",
      marginLeft: "60vh",
      borderRadius: "30px"
    };


    const keyPadStyle = {
    height: "40vh",
    width: "60vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    alignItems: "center",
    marginLeft: "10px",
    };

   const descriptionStyle = {
    justifyContent: "right",
    textAlign: "center",
    paddingTop: "5vh",
    marginBottom: "2vh"
   };

   const descriptionBox = {
     paddingRight: "30px",
     paddingBottom: "2vh",
     height: "15vh",
     marginLeft: "5vh",
     marginRight: "5vh",
     border: "5px solid grey",
     borderRadius: "20px"
   };


   const formulaStyle = {
     fontSize: "1em",
     textAlign: "right",
     color: "orange",
     marginTop: "1vh"
   };

   const outputStyle = {
     fontSize: "2em",
     textAlign: "right",
     color: "white",
     marginBottom: "3vh"
   };

     return (
  <div className="container">
       <div className="container" style={calculatorStyle}>
           <div className="col-sm-12">
           <div style={descriptionStyle}>
        <div style={descriptionBox}>
        <div id="formula" style={formulaStyle}>
        <p> {this.state.input} </p></div>
        <b />
        <div id="display" style={outputStyle}>
        <p> {this.state.processor} </p></div>
         </div>
         </div>
         </div>
         <div className="col-sm-12">
           <div style={keyPadStyle}>
             {keypads.map(k => (
               <Kpads
                   id={k.id}
                   pad={k.pad}
                   handleDisplay={this.handleDisplay}
                   handleReset={this.handleReset}
                   handleFormula={this.handleFormula}
                   handleEquals={this.handleEquals}
                 />
             ))}
            </div>
      </div>
        </div>
        </div>
 );
}
}

export default App;
