import React, { Component } from 'react';
import $ from 'jquery';
import {
    Badge,Button,ButtonDropdown,Card,
    CardBody,CardFooter,CardHeader,Col,
    Collapse,DropdownItem,DropdownMenu,DropdownToggle,
    Fade,Form,FormGroup,FormText,FormFeedback,
    Input,InputGroup,InputGroupAddon,InputGroupText,
    Label,Row,
    Pagination, PaginationItem, PaginationLink, Table 
  } from 'reactstrap';

  import FilterContentModel from '../../models/FilterContentModel';

  import SimulationInformationModel from '../../models/SimulationInformationModel';

  import SimulationFormOption from '../Simulations/SimulationFormOption';

  import config from 'react-global-configuration';

  import axios from 'axios';
  import SimulationResponse from '../Simulations/SimulationResponse';
  import SimulationInformation from '../Simulations/SimulationInformation';
  class Simulation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapse: true,
        fadeIn: true,
        timeout: 300,
        message:false,
        filterContentModel: new FilterContentModel(),
        simulationInformationModel : null,
        businessRules:null,
        contents:null

      };

      this._handleSearch=this._handleSearch.bind(this);
    
    }  

    _handleSearch(e){
      e.preventDefault();
      
      let contextId=this.state.filterContentModel.ContextId.value;
      let userId=this.state.filterContentModel.UserId.value;

      let rule=this.state.businessRules.filter((e)=>e.contextId==contextId);
      let profile="";
     
     
     axios.get(config.get('BASE_SERVICE_URL')+'/api/User/GetCurrentUser?urn='+userId)
     .then(res=>{
       var sim= new SimulationInformationModel(rule[0],res.data.data);
       this.setState({simulationInformationModel:sim});
       console.log("Profile:",JSON.stringify(sim));
     });

   

      axios.get(config.get('BASE_SERVICE_URL')+'/api/article/contents/context/'+contextId+'/identify/'+userId)
        .then(res=>{
          this.setState({contents:res.data.data})
        });
    }

    componentWillMount() {
     
      axios.get(config.get('BASE_SERVICE_URL')+'/api/Rule/FindAll')
      .then(res=>{
     
          this.setState({businessRules:res.data.rules})
      })
  
    }
      render() {
        var simualtionResponseBody=<br></br>;
        var simulationInformationBody=<br></br>;

        if(this.state.businessRules==null)
         return null;

        if(this.state.contents!=null)
          simualtionResponseBody=   <SimulationResponse contents={this.state.contents}/>

          if(this.state.simulationInformationModel!=null)
          simulationInformationBody=   <SimulationInformation info={this.state.simulationInformationModel}/>

        return (
          <div className="animated fadeIn">
          <Row>
              <Col xs="12" sm="6">
              <form onSubmit={this._handleSearch}>
              <Card>
                <CardHeader>
                  <strong>Search</strong>
                </CardHeader>
                <CardBody>
                
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="name">Context Id</Label>
                        <select name="contextId" id="contextId" className="form-control"                    
                            ref={(input) => this.state.filterContentModel.ContextId = input}
                        >
                       <SimulationFormOption rules={this.state.businessRules}/>

                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="ccnumber">User Identity</Label>
                        <input type="text" id="UserIdentity" placeholder="Enter the value" required 
                        className="form-control"
                        ref={(input) => this.state.filterContentModel.UserId = input}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
             
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="md" color="primary" className="js-submit-segment"> Simulate</Button>
                 
                </CardFooter>
              </Card>
              </form>
            </Col>

           {simulationInformationBody}

          </Row>
    
          {simualtionResponseBody}
                 
                
      </div>
        )
    }
}

export default Simulation;