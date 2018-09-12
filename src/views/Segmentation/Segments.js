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
  class Segments extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapse: true,
        fadeIn: true,
        timeout: 300,
        message:false,
        segments:null,
        visible:false,
        contents:null,
        segmentedCode:''

      };

      this.onDismiss = this.onDismiss.bind(this);

      this.viewContents=this.viewContents.bind(this);
    
    }  

    _handleSearch(e){
      e.preventDefault();
      
    }

    onDismiss() {
      this.setState({ visible: false });
    }

    componentWillMount() {
     
      axios.get(config.get('BASE_SERVICE_URL')+'/api/Segment/Find',{
        headers: { 
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      })
      .then(res=>{
        console.log("test---")
        this.setState({segments:res.data.data})
         
      })
  
    }

    removeSegment(key,code){

      delete this.state.segments[key]  
      this.setState({segments:this.state.segments});
      var visible=false;
      axios({
        url:config.get('BASE_SERVICE_URL')+'/api/Segment/Delete/'+code,
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

    viewContents(code){

      axios.get(config.get('BASE_SERVICE_URL')+'/api/Segment/ContentsBySegment/'+code)
      .then(res=>{
     
          this.setState({contents:res.data.contents})
          this.setState({segmentedCode:code})
      })

    }
      render() {


        var contentResponseBody=<br></br>;

        if(this.state.segments==null)
        return null;
        
        if(this.state.contents!=null ){
           if(this.state.contents.length>0){
          contentResponseBody=<Row>
            
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Linked Contents - {this.state.segmentedCode}
              </CardHeader>
              <CardBody>            
                <Table hover bordered striped responsive size="md">
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Date Creation</th>
                    <th>Brand</th>
                    <th>Content Type</th>
                    <th>Views</th>
                  </tr>
                  </thead>
                  <tbody>
                          {Object.keys(this.state.contents).map((key,index) => {
                                              const content = this.state.contents[index];
      
                                              return (<tr>
                                                  <td>S0{index+1}</td>
                                                  <td>{content.title}</td>
                                                  <td>{content.createdAt}</td>                                           
                                                  <td>{content.brand}</td>
                                                  <td>{content.contentType}</td>
                                                  <td>{content.views}</td>
                                              </tr>)
                            })
                          }
                  </tbody>
                  </Table>
                  
                    </CardBody>
                  </Card>
                </Col>
              </Row>
        }
        else{

          contentResponseBody=<center><h3> The segment {this.state.segmentedCode}   is not linked to any contents! ...</h3></center>

        }
      }
      


        return (
          <div className="animated fadeIn">

      <Row>
            
    <Col>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> Segments
        </CardHeader>
        <CardBody>
        <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss}>
                  Segment has been deleted!!
        </Alert>
          <Table hover bordered striped responsive size="md">
            <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Value</th>
              <th>Expiration</th>
              <th>Options</th>
            </tr>
            </thead>
            <tbody>
                    {Object.keys(this.state.segments).map((key,index) => {
                                        const segment = this.state.segments[index];

                                        return (<tr>
                                            <td>C0{index+1}</td>
                                            <td>{segment.segmentedCode}</td>
                                            <td>{segment.segmentedValue}</td>                                           
                                            <td>{segment.expiration}</td>
                                            <td>
                                                <div className="btn-group">

                                                    <Button  color="ghost-danger" onClick={() => 
                                                      this.removeSegment(key,segment.segmentedCode)}>Delete</Button>
                                                      
                                                    <Button  color="link" className="btn-square" 
                                                    onClick={()=>
                                                      this.viewContents(segment.segmentedCode)}>
                                                      View contents</Button>

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
                {contentResponseBody}
         </div>

        )
    }
}

export default Segments;