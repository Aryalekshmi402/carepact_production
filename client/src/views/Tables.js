import React, { useState, Component, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import Frame from "react-frame-component";
import axios from "axios";
import { styles } from "./style";

import { Form, Input } from "antd";

import PageTitle from "../components/common/PageTitle";
import FormItem from "antd/lib/form/FormItem";

axios.get("http://localhost:7777/api/getdata", {
  params: {}
});

const FormSizeDemo = () => {
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
};



function selectdata(props) {
  var self = this;
  const [myState, setMyState] = useState(10);
  axios
    .get("https://reqres.in/api/users?page=1", {
      mode: "no-cors"
    })
    .then(function(response) {
      self.setState({ users: response.data.data });
    })
    .catch(function(error) {
      console.log(error);
    });
}


const App = () => {
  
  const [list, setList] = useState([]);
  let optionItems = list.map(planet => (
    <option key={planet.name}>{planet.name}</option>
  ));
  const [suggestions, setSuggestion] = useState([]);
  const autoSuggestion = suggestions.map(item => (
    <li style={styles.suggestionLi}>{item.name}</li>
  ));
  const optionchange = (props)=>{
    setSuggestion([]);
    console.log(props.target.value);
    axios
      .get("http://localhost:7777/api/suggestions", {
        params: {
          props: props.target.value
        },
        mode: "no-cors"
      })
      .then(function(response) {
       setSuggestion(response.data.data)
      console.log(response.data.data)
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  
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
        setList(apiResponse);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    //alert(1)
    getData();
  }, []);

  

  return (
    <div className="App">
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}

        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Add New Post"
            subtitle="Blog Posts"
            className="text-sm-left"
          />
        </Row>

        <Row>
          <Col>
            <Card small className="">
              <CardHeader
                className=""
                style={{
                  background: "#2b3200 "
                }}
              >
                <h3
                  className=""
                  style={{
                    color: "#c7b500",
                    marginLeft: 380
                  }}
                >
                  <img
                    src={require("./rup.png")}
                    style={{
                      width: 100,
                      height: 90,
                      marginTop: -10,
                      marginLeft: -40
                    }}
                  />
                  Purchase Entry
                </h3>
              </CardHeader>
              <CardBody
                className=""
                style={{
                  background: "#c7b500 "
                }}
              >
                <Form
                  labelCol={{
                    span: 3
                  }}
                  wrapperCol={{
                    span: 1
                  }}
                  layout="horizontal"
                  initialValues={{
                    size: 1
                  }}
                  onValuesChange={2}
                  size={1}
                >
                  <Frame
                    style={{
                      width: 700,
                      height: 220
                    }}
                  >
                    <div style={{ color: "#ff0000" }}>Product details</div>
                    <br />
                    <div style={{ marginTop: 6, marginLeft: 20 }}>
                      <FormItem>
                        Itemcode &nbsp;&nbsp;
                        <Input
                          type="text"
                          style={{
                            width: 163,
                            marginLeft: 21,
                            marginTop: -70
                          }}
                        />
                      </FormItem>
                    </div>
                    
                    <div style={{ marginTop: 7, marginLeft: 20 }}>
                      <FormItem>
                        {" "}
                        Item Name &nbsp;&nbsp;
                        <div
                          style={{
                            display: "inline-block",
                            position: "relative"
                          }}
                        >
                          
                          <Input
                          onBlur={()=>setSuggestion([])}
                            type="search"
                            style={{
                              width: 170,
                              marginLeft: 9,
                              marginTop: -180
                            }}
                            
                            onChange={optionchange}
                          />
                          
                            {suggestions.length && (
                            <ul style={styles.suggestionUl}>
                              {autoSuggestion}
                            </ul>
                          )}
                        </div>
                      </FormItem>
                    </div>
                    <div
                      style={{
                        marginLeft: 300,
                        marginTop: 20
                      }}
                    >
                      <Form.Item name="price">
                        &nbsp;&nbsp;Exp_date
                        <input
                          type="date"
                          style={{
                            width: 170,
                            marginLeft: 20,
                            marginTop: -85
                          }}
                        ></input>
                      </Form.Item>
                    </div>
                    <div></div>
                    <FormItem>
                      <div style={{ marginTop: -30, marginLeft: 13 }}>
                        &nbsp;&nbsp;BatchNo
                        <input
                          type="text"
                          style={{
                            width: 163,
                            marginLeft: 36,
                            marginTop: -85
                          }}
                        ></input>
                      </div>
                      <FormItem>
                        <div style={{ marginTop: 20, marginLeft: 10 }}>
                          &nbsp;&nbsp;Manufacturer
                          <Input
                            type="text"
                            style={{
                              width: 163,
                              marginLeft: 10,
                              marginTop: -70
                            }}
                          />
                        </div>
                      </FormItem>
                      <FormItem>
                        <div style={{ marginTop: 20, marginLeft: 20 }}>
                          &nbsp;&nbsp;Qty
                          <Input
                            type="text"
                            style={{
                              width: 100,
                              marginLeft: 63,
                              marginTop: -70
                            }}
                          />
                        </div>
                      </FormItem>
                    </FormItem>
                    <FormItem>
                      <div style={{ marginTop: -184, marginLeft: 320 }}>
                        &nbsp;&nbsp;Mrp
                        <Input
                          type="text"
                          style={{
                            width: 160,
                            marginLeft: 33,
                            marginTop: 20
                          }}
                        />
                      </div>
                    </FormItem>

                    <FormItem>
                      <div style={{ marginTop: 15, marginLeft: 300 }}>
                        &nbsp;&nbsp;Pur_Rate
                        <Input
                          type="text"
                          style={{
                            width: 163,
                            marginLeft: 22,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>

                    <FormItem>
                      <div
                        style={{
                          marginLeft: 300,
                          marginTop: 48
                        }}
                      >
                        <Form.Item name="price">
                          &nbsp;&nbsp;HSNCode
                          <input
                            style={{
                              width: 170,
                              marginLeft: 15,
                              marginTop: -85
                            }}
                          ></input>
                        </Form.Item>
                      </div>
                    </FormItem>
                    <FormItem>
                      <div style={{ marginTop: 20, marginLeft: 230 }}>
                        &nbsp;&nbsp;Free Qty
                        <Input
                          type="text"
                          style={{
                            width: 100,
                            marginLeft: 22,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>

                    <FormItem>
                      <div style={{ marginTop: -40, marginLeft: 400 }}>
                        &nbsp;&nbsp;
                        <button
                          style={{
                            width: 100,
                            height: 35,
                            marginLeft: 32,
                            marginTop: 10,
                            background: "#afd8d6"
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </FormItem>

                    <div style={{ marginLeft: 400, marginTop: -180 }}>
                      <FormItem>
                        &nbsp;&nbsp;
                        <button
                          style={{
                            width: 100,
                            height: 35,
                            marginLeft: 172,
                            marginTop: -40,
                            background: "#52f841"
                          }}
                        >
                          New Product
                        </button>
                      </FormItem>
                    </div>
                  </Frame>
                  <Frame
                    style={{
                      width: 340,
                      height: 220
                    }}
                  >
                    <FormItem>
                      <div style={{ marginTop: 15, marginLeft: 10 }}>
                        &nbsp;&nbsp;InvoiceNo
                        <Input
                          type="text"
                          style={{
                            width: 163,
                            marginLeft: 22,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div style={{ marginTop: 15, marginLeft: 10 }}>
                        &nbsp;&nbsp;InvoiceDate
                        <Input
                          type="date"
                          style={{
                            width: 163,
                            marginLeft: 13,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div style={{ marginTop: 15, marginLeft: 15 }}>
                        &nbsp;&nbsp;Supplier
                        <select
                          type="text"
                          style={{
                            width: 167,
                            marginLeft: 32,
                            marginTop: -30
                          }}
                        >
                          {optionItems}
                        </select>
                      </div>
                    </FormItem>
                    <FormItem>
                      <div style={{ marginTop: 15, marginLeft: 15 }}>
                        &nbsp;&nbsp;Chemical Composition
                        <Input
                          type="text"
                          style={{
                            width: 163,
                            marginLeft: 94,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>

                    <FormItem>
                      <div
                        style={{
                          marginTop: 10,
                          marginLeft: 2
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Payment
                        &nbsp;&nbsp;{" "}
                        <input type="radio" value="Male" name="gender" /> Cash
                        &nbsp;&nbsp;
                        <input type="radio" value="Female" name="gender" /> Card
                        &nbsp;&nbsp;{" "}
                        <input type="radio" value="Other" name="gender" />{" "}
                        Credit
                      </div>
                    </FormItem>
                  </Frame>
                  <Frame
                    style={{
                      width: 1042,
                      height: 130
                    }}
                  >
                    <FormItem>
                      <div style={{ marginTop: 15, marginLeft: 15 }}>
                        &nbsp;&nbsp;tax_amount
                        <Input
                          type="text"
                          style={{
                            width: 163,
                            marginLeft: 30,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div style={{ marginTop: 15, marginLeft: 15 }}>
                        &nbsp;&nbsp;dis:Per(%)
                        <Input
                          type="text"
                          style={{
                            width: 163,
                            marginLeft: 37,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div style={{ marginTop: 15, marginLeft: 15 }}>
                        &nbsp;&nbsp;dis:Amnt
                        <Input
                          type="text"
                          style={{
                            width: 163,
                            marginLeft: 44,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div style={{ marginTop: -89, marginLeft: 310 }}>
                        &nbsp;&nbsp;SGST
                        <Input
                          type="text"
                          style={{
                            width: 93,
                            marginLeft: 30,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div style={{ marginTop: 13, marginLeft: 310 }}>
                        &nbsp;&nbsp;CGST
                        <Input
                          type="text"
                          style={{
                            width: 93,
                            marginLeft: 30,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div style={{ marginTop: 13, marginLeft: 310 }}>
                        &nbsp;&nbsp;CESS
                        <Input
                          type="text"
                          style={{
                            width: 93,
                            marginLeft: 33,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div
                        style={{
                          marginTop: -85,
                          marginLeft: 505,
                          color: "#b80000",
                          fontStyle: "bold"
                        }}
                      >
                        &nbsp;&nbsp;Total GST_Amnt
                        <Input
                          type="text"
                          style={{
                            width: 163,
                            marginLeft: 20,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div
                        style={{
                          marginTop: 15,
                          marginLeft: 505,
                          color: "#b80000"
                        }}
                      >
                        &nbsp;&nbsp;Taxable Amnt
                        <Input
                          type="text"
                          style={{
                            width: 163,
                            marginLeft: 40,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div
                        style={{
                          marginTop: 15,
                          marginLeft: 508,
                          color: "#b80000"
                        }}
                      >
                        &nbsp;&nbsp;Net Amnt
                        <Input
                          type="text"
                          style={{
                            width: 163,
                            marginLeft: 64,
                            marginTop: -30
                          }}
                        />
                      </div>
                    </FormItem>

                    <FormItem>
                      <div style={{ marginTop: -90, marginLeft: 680 }}>
                        &nbsp;&nbsp;{" "}
                        <FormItem>
                          &nbsp;&nbsp;
                          <button
                            style={{
                              width: 180,
                              height: 100,
                              marginLeft: 160,
                              marginTop: -40,
                              background: "#52f841"
                            }}
                          >
                            <b>0.00</b>
                          </button>
                        </FormItem>
                      </div>
                    </FormItem>
                  </Frame>
                  <Frame
                    style={{
                      width: 1042,
                      height: 130
                    }}
                  >
                    <table style={{ width: 100, border: 1 }}>
                      <tbody>
                        <div
                          style={{
                            background: "#010404",
                            width: 1025,
                            marginTop: -10,
                            color: "white"
                          }}
                        >
                          <th style={{ width: 100 }}>product</th>
                          <th style={{ width: 100 }}>qty</th>
                          <th style={{ width: 100 }}>free</th>
                          <th style={{ width: 100 }}>mrp</th>
                          <th style={{ width: 100 }}>batch</th>
                          <th style={{ width: 100 }}>exp</th>
                          <th style={{ width: 100 }}>pur_rate</th>
                          <th style={{ width: 100 }}>payment</th>
                          <th style={{ width: 100 }}>net_amnt</th>
                          <th style={{ width: 100 }}>total</th>
                        </div>
                        <tr>
                          <td style={{ border: 1 }}>hhh</td>
                        </tr>
                      </tbody>
                    </table>
                  </Frame>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;