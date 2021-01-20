import { Row } from "antd";
import React ,{useState} from "react";
import { styles } from "../../views/style";
import {
  InputGroup,
  FormInput,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "shards-react";

const DropdownInputGroups =()=> {
  
  const [suggestions, setSuggestion] = useState([]);
  const [itemName, setItemName] = useState("");
  const getDetails = item => {
    setItemName(item.product);
    setSuggestion([])
  };
  const autoSuggestion = suggestions.map(item => (
    <li style={styles.suggestionLi} onClick={() => getDetails(item)}>
      {item.product}
    </li>
  ));
  const optionchange = props => {
    setSuggestion([]);
    setItemName(props.target.value);
    console.log(props.target.value);
    fetch("http://localhost:7777/api/suggestions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: props.target.value })
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(sug => {
        if (sug.length) {
          setSuggestion(sug);
        }
        console.log(sug);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
 

  
    return (
      <div >
        <Row form >
        
       {/* <div style={{ display: "inline-block",
                     position: "relative"
                          }}> Item <FormInput type="search" value={itemName} placeholder="Item" style={{width:200,marginTop:-26,marginLeft:80}} onChange={optionchange} /><br/> {suggestions.length > 0 ? (
                            <ul style={styles.suggestionUl}>
                              {autoSuggestion}
                            </ul>
                          ) : (
                            ""
                          )}
          </div>  */}
         {/* InvoiceNo <FormInput placeholder="Invoiceno" style={{width:200,marginTop:-26,marginLeft:80}}  onChange={() => {}} /><br/>
         InvoiceDate <FormInput type="date" placeholder="InvoiceDate" style={{width:200,marginTop:-26,marginLeft:80}} onChange={() => {}} /><br/>
          Qty<FormInput placeholder="Qty" style={{width:100,marginTop:-26,marginLeft:30}} /><br/>
         <div style={{marginTop:-55,marginLeft:150}} >Mrp</div><FormInput placeholder="Mrp" style={{width:90,marginLeft:200,marginTop:-24}} /><br/>
         BatchNo<FormInput placeholder="batchno" style={{width:100,marginTop:-26,marginLeft:60}} />
         <div style={{marginTop:-32,marginLeft:170}}>GST<FormInput placeholder="gst" style={{width:100,marginTop:-26,marginLeft:50}} /></div><br/>
           <div style={{marginTop:6}}> */}
             {/* Payment
           <input type="radio" value="Male" name="gender" style={{marginLeft:10}}/> Cash
           <input type="radio" value="Male" name="gender" style={{marginLeft:10}}/> Card
           <input type="radio" value="Male" name="gender" style={{marginLeft:10}}/> Credit
           </div><br/> */}
           {/* Dis%<FormInput placeholder="dis%" style={{width:100,marginTop:-26,marginLeft:60}} />
         <div style={{marginTop:-32,marginLeft:170}}>Free<FormInput placeholder="free" style={{width:100,marginTop:-26,marginLeft:50}} /></div><br/>
           <FormInput placeholder="Taxable Amount" value="Taxable" onChange={() => {}} /><br/>
           <FormInput placeholder="Total Gst"  value=" Total gst" onChange={() => {}} style={{width:130,height:53}}/>
           <FormInput placeholder="Net Amount" value="Net amount" onChange={() => {}} style={{width:130,marginLeft:150,marginTop:-53,height:55}}/><br/>
        */}
        </Row>
      </div>
    )
  };


export default DropdownInputGroups;
