import React, { useState, useEffect } from "react";
import axios from "axios";
import Frame from "react-frame-component";
import { styles } from "../../views/style";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";



axios.get("http://localhost:7777/api/getdata", {
  params: {}
});

const CompleteFormExample = () => {
  const [contactArray, setContactArray] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [list, setList] = useState([]);
  let optionItems = list.map(planet => (
    <option key={planet.name}>{planet.name}</option>
  ));
  const getData = () => {
    fetch("http://localhost:7777/api/getdata", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(apiResponse => {
        // alert('success')
        console.log(apiResponse);
        if (apiResponse.length) {
          setList(apiResponse);
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    //alert(1)
    getData();
  }, []);
  

  const [cust, setcust] = React.useState("");
  const [prname, setprname] = React.useState("");
  const [prad, setprad] = React.useState("");
  const [refr, setrefr] = React.useState("");
  const [docname, setdocname] = React.useState("");
  const [docad, setdocad] = React.useState("");
  const [note, setnote] = React.useState("");
  const [tdate, settdate] = React.useState("");
  const [time, settime] = React.useState("");
  const [incno, setincno] = React.useState("");
  const [incdate, setincdate] = React.useState("");
  const [qn, setqn] = React.useState(0);
  const [mp, setmp] = React.useState(0);
  const [taxp, settaxp] = React.useState(0);
  const [disc, setdisc] = React.useState(0);
  const [discm, setdiscm] = React.useState(0);
  const [txam, settxam] = React.useState(0);
  const [txbleam, settxbleam] = React.useState(0);
  const [ntam, setntam] = React.useState(0);
  const [gd, setgrand] = React.useState(0);

  let qy = parseFloat(qn);
  let mpr = parseFloat(mp);
  let discp = parseFloat(disc);
  let disamount = mpr * (discp / 100);
  let newprice = mpr - disamount;
  let taxpercent = parseFloat(taxp);
  let taxamount = newprice * (taxpercent / 100);
  let taxableamntt = newprice - taxamount;
  let cesamnt = taxableamntt * (1 / 100);
  let ntamount = (taxableamntt + taxamount) * qy;
  let rnt = ntamount.toFixed(2);
  let grd=parseInt(gd)+parseInt(rnt);

  
  const [suggestions, setSuggestion] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDetails,setItemDetails]=useState({name:'',quantity:0,amount:0})
  

  const getDetails = item => {
   
    setItemName(item.product);
    setSuggestion([]);
    getItemDetails(item);
  };
  const getItemDetails = item => {
    console.log({item})
    fetch("http://localhost:7777/api/item-details", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: item._id })
    })
    .then(res => {
      //console.log(res);
      return res.json();
    })
      .then(({data}) => {
       
        setItemDetails(data);
        setqn(data.quantity);
        setmp(data.mrp);
        setdisc(data.discountper);
      })
      .catch(function(error) {
        console.log(error);
      });
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




  const main_add = event => {
    setContactArray([
      ...contactArray,
      {
        customer: cust,
        name: prname,
        address: prad,
        referred: refr,
        rname: docname,
        addr: docad,
        note: note,
        date: tdate,
        time: time,
        item: itemName,
        invoiceno: incno,
        invoicedate: incdate,
        quantity: qn,
        mrp: mp,
        taxpercent: taxp,
        discountper: disc,
        discountamnt: disamount,
        taxamnt: taxamount,
        taxableamnt: taxableamntt,
        netamnt: rnt,
        grand:gd
      }
    ]);
    alert("adding new row...");
    console.log(contactArray);
    setgrand(gd+parseFloat(rnt))
    event.preventDefault();
  };

  
  const sale_Submit = event => {
    axios({
      url: "http://localhost:7777/api/sale_form_data",
      method: "POST",
      data: contactArray
    }).then(response => {
      alert(response.data.data);
      handleClose();
      setContactArray([]);
    });
    event.preventDefault();
  };

  return (
    <div>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feInputState">Customer</label>
                    <FormSelect
                      id="feInputState"
                      type="text"
                      name="cust"
                      value={cust}
                      onChange={e => setcust(e.target.value)}
                    >
                      {optionItems}
                    </FormSelect>
                  </Col>
                  <Col md="6">
                    <label htmlFor="fePassword">Name</label>
                    <FormInput
                      id="fePassword"
                      type="text"
                      placeholder="enter Name"
                      name="prname"
                      value={prname}
                      onChange={e => setprname(e.target.value)}
                    ></FormInput>
                  </Col>
                </Row>

                <FormGroup>
                  <label htmlFor="feInputAddress">Address</label>
                  <FormInput
                    id="feInputAddress"
                    placeholder="Address here"
                    name="pdad"
                    value={prad}
                    onChange={e => setprad(e.target.value)}
                  ></FormInput>
                </FormGroup>

                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feInputState">RefrdBy</label>
                    <FormSelect
                      id="feInputState"
                      name="refr"
                      value={refr}
                      onChange={e => setrefr(e.target.value)}
                    >
                      {optionItems}
                    </FormSelect>
                  </Col>
                  <Col md="6">
                    <label htmlFor="fePassword">Name</label>
                    <FormInput
                      id="fePassword"
                      type="text"
                      placeholder="enter name"
                      name="docname"
                      value={docname}
                      onChange={e => setdocname(e.target.value)}
                    ></FormInput>
                  </Col>
                </Row>

                <FormGroup>
                  <label htmlFor="feInputAddress2">Address 2</label>
                  <FormInput
                    id="feInputAddress2"
                    placeholder=""
                    name="docad"
                    value={docad}
                    onChange={e => setdocad(e.target.value)}
                  ></FormInput>
                </FormGroup>
                <FormGroup>
                  <label htmlFor="feInputAddress2">Note</label>
                  <FormInput
                    id="feInputAddress2"
                    placeholder=""
                    name="note"
                    value={note}
                    onChange={e => setnote(e.target.value)}
                  ></FormInput>
                </FormGroup>

                <Row form>
                  <Col md="4" className="form-group">
                    <label htmlFor="feInputCity">Date</label>
                    <FormInput
                      type="date"
                      id="feInputCity"
                      name="tdate"
                      value={tdate}
                      onChange={e => settdate(e.target.value)}
                    ></FormInput>
                  </Col>
                  <Col md="4" className="form-group">
                    <label htmlFor="feInputCity">Time</label>
                    <FormInput
                      type="time"
                      id="feInputCity"
                      name="time"
                      value={time}
                      onChange={e => settime(e.target.value)}
                    ></FormInput>
                  </Col>
                </Row>
                <Frame style={{ width: 660, height: 340 }}>
                  <div
                    style={{ display: "inline-block", position: "relative" }}
                  >
                    {" "}
                    Item{" "}
                    <FormInput
                      type="search"
                      value={itemName}
                      placeholder="Item"
                      style={{ width: 200, marginTop: -26, marginLeft: 40 }}
                      onChange={optionchange}
                    />
                    <br />{" "}
                    {suggestions.length > 0 ? (
                      <ul style={styles.suggestionUl}>{autoSuggestion}</ul>
                    ) : (
                      ""
                    )}
                  </div>
                  <div style={{ marginLeft: 320, marginTop: -20 }}>
                    {" "}
                    InvoiceNo{" "}
                    <FormInput
                      placeholder="Invoiceno"
                      style={{ width: 200, marginTop: -26, marginLeft: 40 }}
                      name="incno"
                      value={incno}
                      onChange={e => setincno(e.target.value)}
                    />
                    <br />
                  </div>
                  <div style={{ marginLeft: -6, marginTop: 20 }}>
                    {" "}
                    InvoiceDate
                    <FormInput
                      placeholder="Invoicedate"
                      style={{ width: 190, marginTop: -26, marginLeft: 4 }}
                      name="incdate"
                      value={incdate}
                      onChange={e => setincdate(e.target.value)}
                    />
                    <br />
                  </div>
                  <div style={{ marginLeft: 280, marginTop: -20 }}>
                    Qty
                    <FormInput
                      placeholder="Qty"
                      style={{ width: 100, marginTop: -26, marginLeft: 30 }}
                      name="qn"
                      value={qn}
                      onChange={e => setqn(e.target.value)}
                    />
                    <br />
                  </div>
                  <div style={{ marginLeft: 460, marginTop: -20 }}>
                    Mrp
                    <FormInput
                      placeholder="mrp"
                      style={{ width: 100, marginTop: -26, marginLeft: 30 }}
                      name="mp"
                      value={mp}
                      onChange={e => setmp(e.target.value)}
                    />
                    <br />
                  </div>
                  <div style={{ marginLeft: 280, marginTop: 20 }}>
                    Tax%
                    <FormInput
                      placeholder="tax"
                      style={{ width: 100, marginTop: -26, marginLeft: 20 }}
                      name="taxp"
                      value={taxp}
                      onChange={e => settaxp(e.target.value)}
                    />
                    <br />
                  </div>
                  <div style={{ marginLeft: -6, marginTop: -20 }}>
                    Discnt%
                    <FormInput
                      placeholder="dis%"
                      style={{ width: 190, marginTop: -26, marginLeft: 27 }}
                      name="disc"
                      value={disc}
                      onChange={e => setdisc(e.target.value)}
                    />
                    <br />
                  </div>
                  <div style={{ marginLeft: -6, marginTop: 20 }}>
                    Discount_Amount
                    <FormInput
                      placeholder="dis%"
                      style={{ width: 190, marginTop: -26, marginLeft: 27 }}
                      name="discm"
                      value={disamount}
                      onChange={e => setdiscm(e.target.value)}
                    />
                    <br />
                  </div>
                  <div style={{ marginLeft: 360, marginTop: -20 }}>
                    Tax_Amount
                    <FormInput
                      placeholder="dis%"
                      style={{ width: 160, marginTop: -26, marginLeft: 27 }}
                      name="txam"
                      value={taxamount}
                      onChange={e => settxam(e.target.value)}
                    />
                    <br />
                  </div>
                  <div style={{ marginLeft: -6, marginTop: 20 }}>
                    Taxable_Amount
                    <FormInput
                      placeholder="dis%"
                      style={{ width: 190, marginTop: -26, marginLeft: 35 }}
                      name="txbleam"
                      value={taxableamntt}
                      onChange={e => settxbleam(e.target.value)}
                    />
                    <br />
                  </div>
                  <div style={{ marginLeft: -6, marginTop: 20 }}>
                    Net_Amount
                    <FormInput
                      placeholder="dis%"
                      style={{ width: 190, marginTop: -26, marginLeft: 63 }}
                      name="ntam"
                      value={ntamount}
                      onChange={e => setntam(e.target.value)}
                    />
                    <br />
                  </div>
                  <div style={{ marginLeft: 290, marginTop: -60 }}>
                    <button
                      style={{
                        width: 280,
                        marginTop: -16,
                        height: 70,
                        marginLeft: 63
                      }}
                    >
                      <h1>{gd}</h1>
                    </button>

                    <br />
                  </div>

                  
                </Frame>
                <div>
                <table border="2" cellPadding="12" cellSpacing="8" style={{border:"white",background:"white",width: "100%"}}>
                                <tr style={{width:"100%",align:"center"}}>
                           
                                  <th style={{width:400,align:"center"}}>InvoiceNo</th>
                                  <th style={{width:400,align:"center"}}>itemName</th>
                                  <th style={{width:400,align:"center"}}>Quantity</th>
                                  <th style={{width:400,align:"center"}}>Mrp</th>   
                                  <th style={{width:400,border:"white",align:"center"}}>tax.%</th>
                                  <th style={{width:400,border:"white",align:"center"}}>NetAmnt</th>
                                  
                                  
                                  </tr>
                                  </table>
                                  {contactArray.map(number => {
                            return  (
                              <table border="2" cellPadding="12" cellSpacing="8" style={{background:"white",width:"100%"}}>
                              
                                  <tr>

                                <td style={{width:100,border:"white",align:"center"}}>{number.invoiceno}</td>
                                 <td style={{width:150,border:"white"}}>{number.item}</td>
                               
                                <td style={{width:98,border:"white",textAlign: "center"}}>{number.quantity}</td>
                                <td style={{width:98,border:"white",align:"center"}}>{number.mrp}</td>
                               
                                <td style={{width:98,border:"white",align:"center"}}>{number.taxpercent}</td>
                                <td style={{width:98,border:"white",align:"center"}}>{number.netamnt}</td>
                               
                                </tr>
                              </table>
                           
                            
                            
                           ); })}
                </div>

                <Button type="submit" onClick={sale_Submit}>
                  SAVE
                </Button>
                <Button
                  type="submit"
                  onClick={main_add}
                  style={{
                    marginLeft: 490,
                    width: 100,
                    background: "green",
                    color: "white"
                  }}
                >
                  ADD
                </Button>

                

                
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default CompleteFormExample;
