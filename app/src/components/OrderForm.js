import React, { Component }  from 'react';
import { useState, useEffect } from "react";
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import Pricing from "./Pricing";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

//Standard prices
const CWriting = 11.01;
const CRwriting = 6.98;
const CEditing = 5.2;

const UWriting = 11.76;
const URwriting = 7.4;
const UEditing = 5.5;

const PWriting = 12.5;
const PRwriting = 8.0;
const PEditing = 6.0;

//Other constants
const College = "College";
const University = "University";
const Phd = "PhD";
const Writing = "Writing";
const Editing = "Editing";
const Re_Writing = "Re-Writing";

//Spacing
const Double = "Double";
const Single = "Single";

const orderInitialState = {
  academicLevel: "College",
  subject: "",
  typeOfPaper: "Essay",
  writingService: "Writing",
  writingStyle: "APA",
  orderDescription: "",
  noOfPages: 3,
  hours: 72,
  cost: 0.0,
  currency: "USD",
  spacing: "Double",
  supportiveFiles: null,
  orderFeasibility: true,
};

function OrderForm ({ updateOrder, order, auth, updatePendingOrder }) {
  const his = useNavigate();

  //loading visibility changes
  const [btnVisibility, setBtnVisibility] = useState("loadVisible");
  const [spinnerVisibility, setSpinnerVisibility] = useState("loadInvisible");

  //Server Erros
  const [serverError, setServerError] = useState({
    message: "",
    success: false,
    classError: "invisible",
  });
  //Informers
  // const [highSchoolVAr, setHighSchoolVar] = useState(false);
  // const [collegeVar, setCollegeVar] = useState(true);
  // const [universityVar, setUniVar] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Levels var categories
  const [phDVariant, setPhDVariant] = useState("outline-success");
  const [collegeVariant, setCollegeVariant] = useState("warning");
  const [uniVariant, setUniVariant] = useState("outline-info");

  //Individual component variable. Enables swift flow
  const [l_academicLevl, setl_academicLevl] = useState("");
  const [l_writingService, setl_writingService] = useState("");

  // //This function update the variant from a single source
  // const changeVar = () => {
  //   // setHighSchoolVar(!highSchoolVAr);
  //   setHsVariant("success");
  // };

  //Functions to update inputs
  const serviceType = (service) => {
    setl_writingService(service);
    updateOrder({ ...order, writingService: service });
  };

  //Functions to update inputs
  const typeOfPaper = (paperType) => {
    updateOrder({ ...order, typeOfPaper: paperType });
  };

  const pagesUpdate = (pages) => {
    updateOrder({ ...order, noOfPages: pages });
  };

  const urgencyUpdate = (urgency) => {
    updateOrder({ ...order, hours: urgency });
  };

  const spacingUpdate = (spacing) => {
    updateOrder({ ...order, spacing: spacing });
  };

  const changePhDVar = () => {
    setPhDVariant("success");
    setCollegeVariant("outline-warning");
    setUniVariant("outline-info");

    updateOrder({ ...order, academicLevel: Phd });
  };

  const changeCollegeVar = () => {
    //College var turn

    setPhDVariant("outline-success");
    setCollegeVariant("warning");
    setUniVariant("outline-info");

    updateOrder({ ...order, academicLevel: College });

    //changeVar();
  };

  const changeUniVar = () => {
    //sure now university tab

    setPhDVariant("outline-success");
    setCollegeVariant("outline-warning");
    setUniVariant("info");

    updateOrder({ ...order, academicLevel: University });

    //changeVar();
  };

  useEffect(() => {
    let academicLevel = order.academicLevel;

    switch (academicLevel) {
      case College:
        setPhDVariant("outline-success");
        setCollegeVariant("warning");
        setUniVariant("outline-info");
        break;
      case University:
        setPhDVariant("outline-success");
        setCollegeVariant("outline-warning");
        setUniVariant("info");
        break;
      case Phd:
        setPhDVariant("success");
        setCollegeVariant("outline-warning");
        setUniVariant("outline-info");
        break;

      default:
        setPhDVariant("outline-success");
        setCollegeVariant("outline-warning");
        setUniVariant("info");
        break;
    }
  });

  const submit = (e) => {
    e.preventDefault();
    //updateFeasibility();

    calculatePrice();
    handleShow();
  };

  //Calculate price function
  const calculatePrice = () => {
    //using set order values calculate price
    //updateOrder({ ...order, orderFeasibility: false });
    var cost = 0.0;

    var aLevel = order.academicLevel;
    var service = order.writingService;

    switch (aLevel) {
      case College:
        switch (service) {
          case Writing:
            cost = CWriting;
            break;
          case Re_Writing:
            cost = CRwriting;
            break;
          case Editing:
            cost = CEditing;
            break;
          default:
            break;
        }
        break;

      case University:
        switch (service) {
          case Writing:
            cost = UWriting;
            break;
          case Re_Writing:
            cost = URwriting;
            break;
          case Editing:
            cost = UEditing;
            break;
          default:
            break;
        }
        break;

      case Phd:
        switch (service) {
          case Writing:
            cost = PWriting;
            break;
          case Re_Writing:
            cost = PRwriting;
            break;
          case Editing:
            cost = PEditing;
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }

    //Update cost by hours
    var hours = parseInt(order.hours);
    switch (hours) {
      case 6:
        cost = cost * 1.7;
        break;
      case 12:
        cost = cost * 1.6;
        break;
      case 24:
        cost = cost * 1.4;
        break;
      case 48:
        cost = cost * 1.15;
        break;
      case 120:
        cost = cost * 0.9;
        break;
      case 168:
        cost = cost * 0.88;
        break;
      case 336:
        cost = cost * 0.8;
        break;

      default:
        if (hours > 336) cost = cost * 0.75;
        break;
    }

    //update cost on spacing
    var spacing = order.spacing;
    cost = spacing === Single ? cost * 1.9 : cost;

    //Update cost by pages
    var pages = parseInt(order.noOfPages);
    var dis = 0.0;
    if (pages > 80) {
      // use standard
      cost = cost * pages;
      dis = (80 / 300) * cost;
      cost = cost - dis;
    } else if (pages < 80 && pages > 0) {
      //go by pages
      cost = cost * pages;
      dis = (pages / 300) * cost;
      cost = cost - dis;
    } else cost = 0.0;

    //round of price to 2decimal
    cost = cost.toFixed(2);

    updateOrder({ ...order, cost: cost });
  };

  const proceed = () => {
    if (!auth.loggedIn) {
      updatePendingOrder(true);
      his.push("/login");
    }

    //change buttons visibilities
    setBtnVisibility("loadInvisible");
    setSpinnerVisibility("loadVisible");

    placeOrder();
    //setServerError({ ...serverError, message: "Error", classError: "visible" });
    //setShow(false);
  };

  const placeOrder = async () => {
    const formData = new FormData();

    //Append other info
    formData.append("academicLevel", order.academicLevel);
    formData.append("subject", order.subject);
    formData.append("typeOfPaper", order.typeOfPaper);
    formData.append("writingService", order.writingService);
    formData.append("writingStyle", order.writingStyle);
    formData.append("orderDescription", order.orderDescription);
    formData.append("noOfPages", order.noOfPages);
    formData.append("hours", order.hours);
    formData.append("cost", order.cost);
    formData.append("currency", order.currency);
    formData.append("spacing", order.spacing);

    if (order.supportiveFiles !== null && order.supportiveFiles.length > 0) {
      for (let i = 0; i < order.supportiveFiles.length; i++) {
        formData.append("file[" + i + "]", order.supportiveFiles[i]);
      }
    }

    try {
      const response = await fetch(auth.url + "/api/place-order", {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + auth.token,
        },

        body: formData,
      });

      const data = await response.json();

      setServerError({
        ...serverError,
        message: data.message,
        classError: "visible",
      });
      //change buttons visibilities
      setBtnVisibility("loadVisible");
      setSpinnerVisibility("loadInvisible");

      if (data.success) {
        //clear all orders states
        updatePendingOrder(false);
        updateOrder({ ...order, subject: "", orderDescription: "" });
        updateOrder({ ...orderInitialState });
        his.push("/dashboard");
      } else {
        if (data.message === "Unauthenticated.") his.push("/login");

        //change buttons visibilities
        setBtnVisibility("loadVisible");
        setSpinnerVisibility("loadInvisible");

        setShow(false);
        setServerError({
          ...serverError,
          message: data.message,
          classError: "visible",
        });
      }

      //data.success ? his.push("/dashboard") : his.push("/login");
    } catch (error) {
      setShow(false);
      setServerError({
        ...serverError,
        message: "Error occured!, try smaller files",
        classError: "visible",
      });

      //change buttons visibilities
      setBtnVisibility("loadVisible");
      setSpinnerVisibility("loadInvisible");
    }
  };

  const updateFeasibility = () => {
    var hours = 6;
    var pages = order.pages;

    if (hours < 66) {
      //document.getElementById("proceedBtn").disabled = true;
    }
  };

  // const conlogfiles = () => {
  //   console.log(order.supportiveFiles.length);
  // };

  return (
    <div>
      <p className={serverError.classError}>{serverError.message}</p>
      <Form onSubmit={submit} autocomplete="false">
        <Row className="m-2">
          <Button as={Col} variant={phDVariant} onClick={changePhDVar}>
            PhD{" "}
          </Button>{" "}
          <Button as={Col} variant={collegeVariant} onClick={changeCollegeVar}>
            College{" "}
          </Button>{" "}
          <Button as={Col} variant={uniVariant} onClick={changeUniVar}>
            University{" "}
          </Button>{" "}
        </Row>{" "}
        <br />
        <div className="m-2">
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Service:
            </Form.Label>
            <Col>
              <Form.Control
                as="select"
                className="form-select"
                value={l_writingService}
                onChange={(e) => serviceType(e.target.value)}
              >
                <option value={Writing}>Writing</option>
                <option value={Re_Writing}>Re-writing</option>
                <option value={Editing}>Editing</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Type of Paper:
            </Form.Label>
            <Col>
              <Form.Control
                as="select"
                className="form-select"
                value={order.typeOfPaper}
                onChange={(e) => typeOfPaper(e.target.value)}
              >
                <option value="Essay">Essay</option>
                <option value="Term Paper">Term Paper</option>
                <option value="Research Paper">Research Paper</option>
                <option value="Book Report">Book Report</option>
                <option value="Coursework">Coursework</option>
                <option value="Book Review">Book Review</option>
                <option value="Movie Review">Movie Review</option>
                <option value="Research Summary">Research Summary</option>
                <option value="Dissertation">Dissertation</option>
                <option value="Thesis">Thesis</option>
                <option value="ThesisDissertation Proposal">
                  Thesis/Dissertation Proposal
                </option>
                <option value="Research Proposal">Research Proposal</option>
                <option value="Dissertation Chapter-Abstract">
                  Dissertation Chapter-Abstract
                </option>
                <option value="Dissertation Chapter-Introduction Chapter">
                  Dissertation Chapter-Introduction Chapter
                </option>
                <option value="Dissertation Chapter-Literature View">
                  Dissertation Chapter-Literature View
                </option>
                <option value="Dissertation Chapter-Methodology">
                  Dissertation Chapter-Methodology
                </option>
                <option value="Dissertation Chapter-Results">
                  Dissertation Chapter-Results
                </option>
                <option value="Dissertation Chapter-Discussion">
                  Dissertation Chapter-Discussion
                </option>
                <option value="PowerPoint Presentation">
                  PowerPoint Presentation
                </option>
                <option value="Dissertation Services-Proofreading">
                  Dissertation Services-Proofreading
                </option>
                <option value="Formatting">Formatting</option>
                <option value="Admission Services-Admission Essay">
                  Admission Services-Admission Essay
                </option>
                <option value="Admission Services-Scholarship Essay">
                  Admission Services-Scholarship Essay
                </option>
                <option value="Admission Services-Personal Statement">
                  Admission Services-Personal Statement
                </option>
                <option value="Admission Services-Editing">
                  Admission Services-Editing
                </option>
                <option value="Editing">Editing</option>
                <option value="Proofreading">Proofreading</option>
                <option value="Case Study">Case Study</option>
                <option value="Lab Report">Lab Report</option>
                <option value="Speech-Presentation">Speech/Presentation</option>
                <option value="Math-Physics-Economics-Statistics Problems">
                  Math/Physics/Economics/Statistics Problems
                </option>
                <option value="Article">Article</option>
                <option value="Article Critique">Article Critique</option>
                <option value="Annotated Bibliography">
                  Annotated Bibliography
                </option>
                <option value="Reaction Paper">Reaction Paper</option>
                <option value="Multiple Choice Questions 1">
                  Multiple Choice Questions(Non-time-framed)
                </option>
                <option value="Multiple Choice Questions 2">
                  Multiple Choice Questions(Time-framed)
                </option>
                <option value="Statistics Project">Statistics Project </option>
                <option value="Programming">Programming</option>
                <option value="Concept Mapping">Mind/Concept Mapping</option>
                <option value="Multimedia Project">Multimedia Project</option>
                <option value="Online Assignmet">Online Assignmet</option>
                <option value="Simulation Report">Simulation Report</option>
                <option value="Case studies">Case studies</option>
                <option value="Building Elevations">Building Elevations</option>
                <option value="Building sections">Building sections</option>
                <option value="Working Drawings">Working Drawings</option>
                <option value="Site Analysis">Site Analysis</option>
                <option value="3D rendering">3D rendering</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Design Analysis">Design Analysis</option>
                <option value="Landscaping">Landscaping</option>
                <option value="History and Theory of Architecture">
                  History and Theory of Architecture
                </option>
                <option value="Structural Design">Structural Design</option>
                <option value="Site Analysis">Site Analysis</option>
                <option value="Site Inventories">Site Inventories</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Apps">Mobile Apps</option>
                <option value="Graphic Designs">Graphic Designs</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Subject:
            </Form.Label>
            <Col>
              <input
                className="form-control"
                type="text"
                placeholder="Subject name"
                value={order.subject}
                onChange={(e) =>
                  updateOrder({ ...order, subject: e.target.value })
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Order Descriptions:
            </Form.Label>
            <Col>
              <Form.Control
                as="textarea"
                required
                rows={4}
                placeholder="Paper instructions"
                value={order.orderDescription}
                onChange={(e) =>
                  updateOrder({ ...order, orderDescription: e.target.value })
                }
              />
            </Col>
          </Form.Group>
          <Row>
            <Form.Label as={Col}>Pages: </Form.Label>
            <Col sm={5}>
              <Form.Control
                as="select"
                className="form-select"
                value={order.noOfPages}
                onChange={(e) => pagesUpdate(e.target.value)}
              >
                <option value="1">1 Page(s) / 275 Words</option>
                <option value="2">2 Page(s) / 550 Words</option>
                <option selected value="3">
                  3 Page(s) / 825 Words
                </option>
                <option value="4">4 Page(s) / 1100 Words</option>
                <option value="5">5 Page(s) / 1375 Words</option>
                <option value="6">6 Page(s) / 1650 Words</option>
                <option value="7">7 Page(s) / 1925 Words</option>
                <option value="8">8 Page(s) / 2200 Words</option>
                <option value="9">9 Page(s) / 2475 Words</option>
                <option value="10">10 Page(s) / 2750 Words</option>
                <option value="11">11 Page(s) / 3025 Words</option>
                <option value="12">12 Page(s) / 3300 Words</option>
                <option value="13">13 Page(s) / 3575 Words</option>
                <option value="14">14 Page(s) / 3850 Words</option>
                <option value="15">15 Page(s) / 4125 Words</option>
                <option value="16">16 Page(s) / 4400 Words</option>
                <option value="17">17 Page(s) / 4675 Words</option>
                <option value="18">18 Page(s) / 4950 Words</option>
                <option value="19">19 Page(s) / 5225 Words</option>
                <option value="20">20 Page(s) / 5500 Words</option>
                <option value="21">21 Page(s) / 5775 Words</option>
                <option value="22">22 Page(s) / 6050 Words</option>
                <option value="23">23 Page(s) / 6325 Words</option>
                <option value="24">24 Page(s) / 6600 Words</option>
                <option value="25">25 Page(s) / 6875 Words</option>
                <option value="26">26 Page(s) / 7150 Words</option>
                <option value="27">27 Page(s) / 7425 Words</option>
                <option value="28">28 Page(s) / 7700 Words</option>
                <option value="29">29 Page(s) / 7975 Words</option>
                <option value="30">30 Page(s) / 8250 Words</option>
                <option value="31">31 Page(s) / 8525 Words</option>
                <option value="32">32 Page(s) / 8800 Words</option>
                <option value="33">33 Page(s) / 9075 Words</option>
                <option value="34">34 Page(s) / 9350 Words</option>
                <option value="35">35 Page(s) / 9625 Words</option>
                <option value="36">36 Page(s) / 9900 Words</option>
                <option value="37">37 Page(s) / 10175 Words</option>
                <option value="38">38 Page(s) / 10450 Words</option>
                <option value="39">39 Page(s) / 10725 Words</option>
                <option value="40">40 Page(s) / 11000 Words</option>
                <option value="41">41 Page(s) / 11275 Words</option>
                <option value="42">42 Page(s) / 11550 Words</option>
                <option value="43">43 Page(s) / 11825 Words</option>
                <option value="44">44 Page(s) / 12100 Words</option>
                <option value="45">45 Page(s) / 12375 Words</option>
                <option value="46">46 Page(s) / 12650 Words</option>
                <option value="47">47 Page(s) / 12925 Words</option>
                <option value="48">48 Page(s) / 13200 Words</option>
                <option value="49">49 Page(s) / 13475 Words</option>
                <option value="50">50 Page(s) / 13750 Words</option>
                <option value="51">51 Page(s) / 14025 Words</option>
                <option value="52">52 Page(s) / 14300 Words</option>
                <option value="53">53 Page(s) / 14575 Words</option>
                <option value="54">54 Page(s) / 14850 Words</option>
                <option value="55">55 Page(s) / 15125 Words</option>
                <option value="56">56 Page(s) / 15400 Words</option>
                <option value="57">57 Page(s) / 15675 Words</option>
                <option value="58">58 Page(s) / 15950 Words</option>
                <option value="59">59 Page(s) / 16225 Words</option>
                <option value="60">60 Page(s) / 16500 Words</option>
                <option value="61">61 Page(s) / 16775 Words</option>
                <option value="62">62 Page(s) / 17050 Words</option>
                <option value="63">63 Page(s) / 17325 Words</option>
                <option value="64">64 Page(s) / 17600 Words</option>
                <option value="65">65 Page(s) / 17875 Words</option>
                <option value="66">66 Page(s) / 18150 Words</option>
                <option value="67">67 Page(s) / 18425 Words</option>
                <option value="68">68 Page(s) / 18700 Words</option>
                <option value="69">69 Page(s) / 18975 Words</option>
                <option value="70">70 Page(s) / 19250 Words</option>
                <option value="71">71 Page(s) / 19525 Words</option>
                <option value="72">72 Page(s) / 19800 Words</option>
                <option value="73">73 Page(s) / 20075 Words</option>
                <option value="74">74 Page(s) / 20350 Words</option>
                <option value="75">75 Page(s) / 20625 Words</option>
                <option value="76">76 Page(s) / 20900 Words</option>
                <option value="77">77 Page(s) / 21175 Words</option>
                <option value="78">78 Page(s) / 21450 Words</option>
                <option value="79">79 Page(s) / 21725 Words</option>
                <option value="80">80 Page(s) / 22000 Words</option>
                <option value="81">81 Page(s) / 22275 Words</option>
                <option value="82">82 Page(s) / 22550 Words</option>
                <option value="83">83 Page(s) / 22825 Words</option>
                <option value="84">84 Page(s) / 23100 Words</option>
                <option value="85">85 Page(s) / 23375 Words</option>
                <option value="86">86 Page(s) / 23650 Words</option>
                <option value="87">87 Page(s) / 23925 Words</option>
                <option value="88">88 Page(s) / 24200 Words</option>
                <option value="89">89 Page(s) / 24475 Words</option>
                <option value="90">90 Page(s) / 24750 Words</option>
                <option value="91">91 Page(s) / 25025 Words</option>
                <option value="92">92 Page(s) / 25300 Words</option>
                <option value="93">93 Page(s) / 25575 Words</option>
                <option value="94">94 Page(s) / 25850 Words</option>
                <option value="95">95 Page(s) / 26125 Words</option>
                <option value="96">96 Page(s) / 26400 Words</option>
                <option value="97">97 Page(s) / 26675 Words</option>
                <option value="98">98 Page(s) / 26950 Words</option>
                <option value="99">99 Page(s) / 27225 Words</option>
                <option value="100">100 Page(s) / 27500 Words</option>
              </Form.Control>
            </Col>
            <Form.Label as={Col}>Style:</Form.Label>
            <Col>
              <Form.Control
                as="select"
                className="form-select"
                value={order.writingStyle}
                onChange={(e) =>
                  updateOrder({ ...order, writingStyle: e.target.value })
                }
              >
                <option value="APA">APA</option>
                <option value="MLA">MLA</option>
                <option value="Havard">Havard</option>
                <option value="Chicago">Chicago</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className="mt-3">
            <Form.Label as={Col}>Days Due:</Form.Label>
            <Col sm="5">
              <Form.Control
                as="select"
                className="form-select"
                value={order.hours}
                onChange={(e) => urgencyUpdate(e.target.value)}
              >
                <option value="6">6 Hours</option>
                <option value="12">12 Hours</option>
                <option value="24">24 Hours</option>
                <option value="48">2 Days</option>
                <option selected value="72">
                  3 Days
                </option>
                <option value="120">5 Days</option>
                <option value="168">7 Days</option>
                <option value="336">14 Days</option>
                <option value="337">14+ Days</option>
              </Form.Control>
            </Col>
            <Form.Label as={Col}>Spacing:</Form.Label>
            <Col>
              <Form.Control
                as="select"
                className="form-select"
                value={order.spacing}
                onChange={(e) => spacingUpdate(e.target.value)}
              >
                <option value={Double}>Double</option>
                <option value={Single}>Single</option>
              </Form.Control>
            </Col>
          </Row>
          <Form.Group as={Row} className="mt-4">
            <Form.Label column sm="3">
              Files:
            </Form.Label>
            <Form.Control type="file"
              id="file"
              name="file"
              multiple
              onChange={(e) =>
                updateOrder({ ...order, supportiveFiles: e.target.files })
              }
            />
          </Form.Group>
          {/* <div>
            <Form.Group as={Row} className="mt-4">
              <Form.Label column sm="3">
                File 2:
              </Form.Label>
              <Form.File id="supportFile2" name="file2" 
              value={order.supportiveFiles[1]}
              onChange={(e) => order.supportiveFiles.push(e.target.files[0])}/>
            </Form.Group>
          </div> */}

          {/* <Button variant="success" onClick={conlogfiles}>
            checkfiles
          </Button> */}

          <Button variant="success" type="submit">
            Place Your Order
          </Button>
        </div>
      </Form>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="h3">Order Summary</p>
          </Modal.Title>
        </Modal.Header>
        <Pricing order={order} />
        <Modal.Footer>
          <div className={spinnerVisibility} style={{ textAlign: "center" }}>
            <Spinner animation="grow" variant="success" />
          </div>
          <Button
            variant="danger"
            onClick={handleClose}
            className={btnVisibility}
          >
            Close
          </Button>
          <Button variant="success" onClick={proceed} className={btnVisibility}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderForm;
