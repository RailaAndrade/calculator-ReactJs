import React, {Component} from 'react'
import Button from '../../components/button/index'
import Input from '../../components/input/index'
import'./styles.css'

class Wrapper extends Component{
    constructor(props){
        super(props);
    
        this.state={
        input:0,
        previousNumber:0,
        currentNumber:0,
        operator: 0,
        flag:0
        };
        
    }

    format(result){
        parseFloat(result).toLocaleString(navigator.language , {
            useGrouping: true,
            maximumFractionDigits: 6
          })
        return result;
    }
 
    componentDidMount(){
        document.addEventListener('keydown', this.handleKeyDown);
    }
      componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown)
      }
    addToInput = val =>{

        if(this.state.flag===0){
            if(this.state.input !==0){
                this.setState({input: this.state.input +""+val});
            }else{
                this.setState({input: val});
            }
        }else{
            this.setState({
                input: val,
                flag:0
            });
        
        }
        
    };

    addZeroToInput = val =>{
        if(this.state.input !==0){
            this.setState({input:this.state.input +""+val});

        }
    }

    addDecimal = val =>{

 
        

        if(this.state.flag===0){
            if(this.state.input ===0){
                this.setState({input:"0."});
            }
        
            else if(String(this.state.input).indexOf(".")===-1){
        
                this.setState({input:this.state.input+"."});
            }
        }

    
    }
    clearInput =() =>{
        this.setState({
            input:0,
            flag:0 
        });
    }

    toggleSign =() => {
   
        const newValue = parseFloat(this.state.input) * -1;
        
        this.setState({
         input: newValue,
         flag:0
        })
    }
    clearLastChar = () =>{
        if (this.state.input.length <=1 ||this.state.input.length===0){
            this.setState({input:0});
        }else{
        this.setState({input:String(this.state.input).substring(0, this.state.input.length - 1)});
        }
    }
    add=() =>{
    
        this.setState({
            previousNumber:this.state.input,
            input:"",
            operator:"plus",
            flag:0
        });
      
    }

    subtract=() =>{
        this.setState({previousNumber:this.state.input,
            input:"",
            operator:"minus",
            flag:0
        });

    }

    multiply=() =>{
        this.setState({previousNumber:this.state.input,
            input:"",
            operator:"multiply",
            flag:0
        });
    }

    divide=() =>{
        this.setState({previousNumber:this.state.input,
            input:"",
            operator:"divide",
            flag:0
        });
    }

    inputPercent =() =>{
        const currentValue = parseFloat(this.state.input)
        if (currentValue === 0)
          return
        const newValue = parseFloat(currentValue) / 100
        
        this.setState({
         input: newValue
        })
    }

    handleKeyDown = (event) => {
        let { key } = event
    
        
        if ((/\d/).test(key)) {
            if(key===0){
                event.preventDefault()
                this.addZeroToInput(parseInt(key, 10))

            }else{
                event.preventDefault()
                this.addToInput(parseInt(key, 10))
            }


        }else if (key==='*') {
            event.preventDefault()
            this.multiply() 
        }
        else if(key==='/'){
            event.preventDefault()
            this.divide() 
        }
        else if (key==='+') {
            event.preventDefault()
            this.add() 
        }   
        else if (key==='-') {
            event.preventDefault()
            this.subtract() 
        }   
        else if (key ==='.') {
          event.preventDefault()
          this.addDecimal()
        } else if (key === '%') {
          event.preventDefault()
          this.inputPercent()
        } else if (key === 'Backspace') {
          event.preventDefault()
          this.clearLastChar()
        } else if (key === 'c') {
          event.preventDefault()
          this.clearInput()
        }
        else if (key === 'Enter'){
            event.preventDefault()
            this.evaluate()
        }
      };


    evaluate =() =>{
        //usar callback

        const newValue = parseFloat(this.state.input)
       
        if (this.state.flag===0){

            this.setState({
                currentNumber:newValue,
                flag:1
            },()=>{ 
                console.log(this.state.currentNumber);
                console.log(this.state.flag)
            
                
            
                if (this.state.operator ==="plus"){
                    this.setState(
                        {
                            input:parseFloat(this.state.previousNumber)+parseFloat(this.state.currentNumber)
                
                        }

                    );
                }

                if (this.state.operator ==="minus"){
                    this.setState(
                        {
                            input:parseFloat(this.state.previousNumber)-parseFloat(this.state.currentNumber)
                        }
                    );
                }

                if (this.state.operator ==="divide"){
                    this.setState(
                        {
                            input:parseFloat(this.state.previousNumber)/parseFloat(this.state.currentNumber)
                        }
                    );
                }

                if (this.state.operator ==="multiply"){


                    this.setState(
                        {
                            input:parseFloat(this.state.previousNumber)*parseFloat(this.state.currentNumber)
                        }
                    );
                }

            

            });

        } else if (this.state.flag===1){
            this.setState({
                flag:1
            },()=>{ 
                if (this.state.operator ==="plus"){
                    this.setState(
                        {
                            input:parseFloat(this.state.input)+parseFloat(this.state.currentNumber)
                        }

                    );
                }

                if (this.state.operator ==="minus"){
                    this.setState(
                        {
                            input:this.format(parseFloat(this.state.input)-parseFloat(this.state.currentNumber))
                        }
                    );
                }

                if (this.state.operator ==="divide"){
                    this.setState(
                        {
                            input:parseFloat(this.state.input)/parseFloat(this.state.currentNumber)
                        }
                    );
                }

                if (this.state.operator ==="multiply"){


                    this.setState(
                        {
                            input:parseFloat(this.state.input)*parseFloat(this.state.currentNumber)
                        }
                    );
                }

            }
            );


        }

    }
    render(){
        //const clearDisplay = this.state.input !== 0
        //const clearText = clearDisplay ? 'C' : 'AC'

        return(
            <div className="calc-wrapper">
                <div className="row">
                    <Input>{this.state.input}</Input>

                </div>
                <div className="row">
                <Button handleClick={this.clearInput}>C</Button>
                <Button handleClick={this.toggleSign}>+/-</Button>
                <Button handleClick={this.inputPercent}>%</Button>
                <Button handleClick={this.divide}>/</Button>   
                </div>

                <div className="row">
                <Button handleClick={this.addToInput}>7</Button>
                <Button handleClick={this.addToInput}>8</Button>
                <Button handleClick={this.addToInput}>9</Button>
                <Button handleClick={this.multiply}>*</Button>
                
                </div>

                <div className="row">
                <Button handleClick={this.addToInput}>4</Button>
                <Button handleClick={this.addToInput}>5</Button>
                <Button handleClick={this.addToInput}>6</Button>
                <Button handleClick={this.add}>+</Button>
                
                </div>
            
                <div className="row">
                <Button handleClick={this.addToInput}>1</Button>
                <Button handleClick={this.addToInput}>2</Button>
                <Button handleClick={this.addToInput}>3</Button>
                <Button handleClick={this.subtract}>-</Button>
                </div>

                <div className="row">
                <Button handleClick={this.addDecimal}>.</Button>
                <Button handleClick={this.addZeroToInput}>0</Button>
                <Button handleClick={this.clearLastChar}>&larr;</Button>
                <Button handleClick={this.evaluate}>=</Button>
                
                </div>

           

            </div>
     
        );



    }

}

export default Wrapper;