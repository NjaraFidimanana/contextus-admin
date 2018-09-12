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
  import RuleModel from '../../models/RuleModel';

  class RuleForm extends Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.toggleFade = this.toggleFade.bind(this);
      this.state = {
        collapse: true,
        fadeIn: true,
        timeout: 300,
        ruleModel: new RuleModel(),
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
        this.state.ruleModel.ContextId.value="";
        this.state.ruleModel.BusinessType.value="";
        this.state.ruleModel.NumberOfContent.value="";
        this.state.ruleModel.Designation.value="";
        this.state.ruleModel.DefaultRule.value="";
        this.state.ruleModel.ContentType.value="";
      }

      _handleSubmit(e){
        e.preventDefault();

          axios({
              url:config.get('BASE_SERVICE_URL')+'/api/Rule/SaveRule',
              method: 'post', 
              headers: {
               'Content-Type': 'application/json; v=1.0'
              },
             data: {
                "ContextId":this.state.ruleModel.ContextId.value,
                "Designation": this.state.ruleModel.Designation.value,
                "BusinessType": this.state.ruleModel.BusinessType.value,
                "NumberOfContent": this.state.ruleModel.NumberOfContent.value,              
                "Default":this.state.ruleModel.DefaultRule.value,
                "ContentType":this.state.ruleModel.ContentType.value
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
            <form onSubmit={this._handleSubmit} id="rule-form">
            <Card>
              <CardHeader>
                <strong>Add New Rule</strong>
                <small> Formulaire</small>
              </CardHeader>
              <CardBody>
              
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ContextId">Context Id</Label>
                      <input type="text" id="ContextId" placeholder="Enter the context Id" 
  
                      required  class="form-control"
                      
                      ref={(input) => this.state.ruleModel.ContextId = input}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="Designation">Designation</Label>
                      <input type="text" id="Designation" placeholder="Designation" required 
                      class="form-control"
                      ref={(input) => this.state.ruleModel.Designation = input}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="BusinessType">Business Type</Label>
                      <select type="select" name="businessType" id="businessType" class="form-control"     
            
                      ref={(input) => this.state.ruleModel.BusinessType = input}
                      >
                        <option value="Web">Web</option>
                        <option value="Mobile">Mobile</option>                          
                      </select>
                    </FormGroup>
                  </Col>
                
                </Row>

                <Row>
                  <Col xs="12">
                        <FormGroup>
                          <Label htmlFor="NumberOfContent">Number Of Content</Label>
                          <input type="text" id="NumberOfContent" placeholder="NumberOfContent" required 
                          class="form-control"
                          ref={(input) => this.state.ruleModel.NumberOfContent = input}
                          />
                        </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs="12">
                        <FormGroup>
                          <Label htmlFor="DefaultRule">Default Rule</Label>
                          <select type="select" name="DefaultRule" id="DefaultRule" class="form-control"     
            
                            ref={(input) => this.state.ruleModel.DefaultRule = input}
                            >
                              <option value="MostRecent">Most Recent</option>
                              <option value="MostViewed">Most Viewed</option>
                              <option value="MostRated">Most Rated</option>
                              <option value="TopReview">Top Review</option>                          
                            </select>
                        </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ContentType">Content Type</Label>
                      <select type="select" name="contentType" id="contentType" class="form-control"     
            
                      ref={(input) => this.state.ruleModel.ContentType = input}
                      >
                        <option value="Article">Article</option>
                        <option value="Product">Product</option>                          
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

export default RuleForm;