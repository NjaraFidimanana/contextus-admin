import React, { Component } from 'react';
import $ from 'jquery';
import {
    Badge,
    Button,
    ButtonDropdown,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
  } from 'reactstrap';
  import axios from 'axios';
  import config from 'react-global-configuration';
  import SegmentModel from '../../models/SegmentModel';

  class SegmentForm extends Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.toggleFade = this.toggleFade.bind(this);
      this.state = {
        collapse: true,
        fadeIn: true,
        timeout: 300,
        segmentModel: new SegmentModel(),
        message:false
      };
      this.baseState = this.state ;
      this._handleSubmit = this._handleSubmit.bind(this);
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
      }
    
      toggleFade() {
        this.setState((prevState) => { return { fadeIn: !prevState }});
      }

      componentWillMount() {
        console.log("Component will mount");

      }

      resetForm = () => {
        this.state.segmentModel.SegmentCode.value="";
        this.state.segmentModel.SegmentValue.value="";
        this.state.segmentModel.Expiration.value="";
      }

      _handleSubmit(e){
        e.preventDefault();
        console.log(this.state.segmentModel.SegmentCode.value);

          axios({
              url:config.get('BASE_SERVICE_URL')+'/api/Segment/SaveSegment',
              method: 'post', 
              headers: {
               'Content-Type': 'application/json; v=1.0'
              },
             data: {
              "SegmentedCode":this.state.segmentModel.SegmentCode.value,
              "SegmentedValue":this.state.segmentModel.SegmentValue.value,
              "Expiration":this.state.segmentModel.Expiration.value
              }
            }
            )
            .then(function (response) {
                //handle success
                if(response.data.statusCode===201)
                {
                  console.log("Insertedddddd");
                  
                }
                
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
     
            this.resetForm();
      }

      render() {
        return (
    <div className="animated fadeIn">
        <Row>
            <Col xs="12" sm="6">
            <form onSubmit={this._handleSubmit} id="segment-form">
            <Card>
              <CardHeader>
                <strong>Add New Segment</strong>
                <small> Formulaire</small>
              </CardHeader>
              <CardBody>
              
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="Code">Code</Label>
                      <input type="text" id="Code" placeholder="Enter the code" 
  
                      required  class="form-control"
                      
                      ref={(input) => this.state.segmentModel.SegmentCode = input}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="SegmentValue">Segment value</Label>
                      <input type="text" id="SegmentValue" placeholder="Enter the value" required 
                      class="form-control"
                      ref={(input) => this.state.segmentModel.SegmentValue = input}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="Cexpiration">Expiration</Label>
                      <select type="select" name="Cexpiration" id="cexpiration" class="form-control"     
            
                      ref={(input) => this.state.segmentModel.Expiration = input}
                      >
                        <option value="7">1 Week</option>
                        <option value="15">2 Weeks</option>
                        <option value="30">1 Month</option>
                        <option value="60">2 Months</option>
                        <option value="90">3 Months</option>                            
                      </select>
                    </FormGroup>
                  </Col>
                
                </Row>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="md" color="primary" class="js-submit-segment"> Submit</Button>
               
              </CardFooter>
            </Card>
            </form>
          </Col>
        </Row>
    </div>
        )
    }
}

export default SegmentForm;