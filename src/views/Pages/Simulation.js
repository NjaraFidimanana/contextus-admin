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

  import FilterContentModel from '../../models/FilterContentModel';

  class Simulation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapse: true,
        fadeIn: true,
        timeout: 300,
        filterContentModel: new FilterContentModel(),
        message:false
      };
    
    }  
      render() {
        return (
          <div className="animated fadeIn">
          <Row>
              <Col xs="12" sm="6">
              <form onSubmit={this._handleSubmit}>
              <Card>
                <CardHeader>
                  <strong>Search</strong>
                </CardHeader>
                <CardBody>
                
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="name">Context Id</Label>
                        <select type="select" name="contextId" id="contextId" class="form-control"                    
                        ref={(input) => this.state.filterContentModel.ContextId = input}
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
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="ccnumber">User Identity</Label>
                        <input type="text" id="UserIdentity" placeholder="Enter the value" required 
                        class="form-control"
                        ref={(input) => this.state.filterContentModel.UserId = input}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
             
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="md" color="primary" class="js-submit-segment"> Simulate</Button>
                 
                </CardFooter>
              </Card>
              </form>
            </Col>
          </Row>
      </div>
        )
    }
}

export default Simulation;