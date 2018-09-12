import React, { Component } from 'react';
import $ from 'jquery';
import {
    Badge,Button,ButtonDropdown,Card,
    CardBody,CardFooter,CardHeader,Col,
    Collapse,DropdownItem,DropdownMenu,DropdownToggle,
    Fade,Form,FormGroup,FormText,FormFeedback,
    Input,InputGroup,InputGroupAddon,InputGroupText,
    Label,Row,
    Pagination, PaginationItem, PaginationLink, Table ,
    Alert
  } from 'reactstrap';

  import config from 'react-global-configuration';
  import axios from 'axios';
  class BusinessRules extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapse: true,
        fadeIn: true,
        timeout: 300,
        message:false,
        visible:false,
        rules:null,

      };
    }  

    _handleSearch(e){
      e.preventDefault();
      
    }


    componentWillMount() {
     
      axios.get(config.get('BASE_SERVICE_URL')+'/api/Rule/FindAll',{
        headers: { 
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      })
      .then(res=>{
        this.setState({rules:res.data.rules})
         
      })
  
    }

    removeRules(key,code){

      delete this.state.rules[key]  
      this.setState({rules:this.state.rules});
      var visible=false;
      axios({
        url:config.get('BASE_SERVICE_URL')+'/api/Rule/Delete/'+code,
        method: 'get'
        }
      )
      .then((response)=> {
          if(response.data.statusCode===201 || 200)
          {
            visible=true;
          }
          
      })
      .catch(function (response) {
          console.log(response);
      });

      this.setState({ visible:true });

    }

 
      render() {
          if(this.state.rules==null)
            return null;


        return (
          <div className="animated fadeIn">

      <Row>
            
    <Col>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> Business rules
        </CardHeader>
        <CardBody>
          <Table hover bordered striped responsive size="md">
            <thead>
            <tr>
              <th>#</th>
              <th>Context Id</th>
              <th>Designation</th>
              <th>Number Of Contents</th>
              <th>Business Rules</th>
              <th>Default</th>
              <th>Content type</th>
              <th>Options</th>
            </tr>
            </thead>
            <tbody>
                    {Object.keys(this.state.rules).map((key,index) => {
                                        const rule = this.state.rules[index];

                                        return (<tr>
                                            <td>R0{index+1}</td>
                                            <td>{rule.contextId}</td>
                                            <td>{rule.designation}</td>                                           
                                            <td>{rule.numberOfContents}</td>
                                            <td>{rule.businessType}</td>
                                            <td>{rule.default}</td>
                                            <td>{rule.contentType}</td>
                                            <td>
                                                <div className="btn-group">

                                                    <Button  color="ghost-danger" onClick={() => 
                                                      this.removeSegment(key,rule.contextId)}>Delete</Button>
                                                </div>
                                                                                         
                                            </td>
                                        </tr>)
                      })
                    }
            </tbody>
            </Table>
            
              </CardBody>
            </Card>
          </Col>
        </Row>
         </div>

        )
    }
}

export default BusinessRules;