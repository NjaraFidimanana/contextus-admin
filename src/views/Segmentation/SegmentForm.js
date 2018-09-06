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
      _handleSubmit(e){
        e.preventDefault();
        
       

        console.log('Test',this.state.segmentModel.SegmentCode.value);

        fetch('/api/form-submit-url', {
            method: 'POST',
            data: this.state.segmentModel,
          });
      }

      render() {
        return (
    <div className="animated fadeIn">
        <Row>
            <Col xs="12" sm="6">
            <form onSubmit={this._handleSubmit}>
            <Card>
              <CardHeader>
                <strong>Add New Segment</strong>
                <small> Formulaire</small>
              </CardHeader>
              <CardBody>
              
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Code</Label>
                      <input type="text" id="Code" placeholder="Enter the code" required  class="form-control"
                      
                      ref={(input) => this.state.segmentModel.SegmentCode = input}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Segment value</Label>
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
                      <Label htmlFor="ccmonth">Expiration</Label>
                      <select type="select" name="cexpiration" id="cexpiration" class="form-control"                    
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