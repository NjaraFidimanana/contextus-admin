import React, { Component } from 'react';
import $ from 'jquery';
import Select from "react-select";
import {
    Badge,Button,ButtonDropdown,Card,
    CardBody,CardFooter,CardHeader,Col,
    Collapse,DropdownItem,DropdownMenu,DropdownToggle,
    Fade,Form,FormGroup,FormText,FormFeedback,
    Input,InputGroup,InputGroupAddon,InputGroupText,
    Label,Row,
    Pagination, PaginationItem, PaginationLink, Table ,
    Modal, ModalBody, ModalFooter, ModalHeader
  } from 'reactstrap';

  import config from 'react-global-configuration';
  import axios from 'axios';
  import FilterContentModel from '../../models/FilterContentModel';
  class Contents extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapse: true,
        fadeIn: true,
        timeout: 300,
        message:false,
        contents:null,
        filterModel: new FilterContentModel(),
        page:2,
        modal: false,
        segmentsToContent:[],
        contentId:'',
        filterOptions: [
          { value: "foo", label: "Foo" },
          { value: "bar", label: "Bar" },
          { value: "bat", label: "Bat" }
        ]
      };
      this._handleSearch=this._handleSearch.bind(this);
      this.toggle = this.toggle.bind(this);
      this.handleMultiChange = this.handleMultiChange.bind(this);
      this.saveAssociatedSegment=this.saveAssociatedSegment.bind(this);
    
    }  

    handleMultiChange(option) {
      this.state.segmentsToContent.push(option.value);
      this.setState({segmentsToContent: this.state.segmentsToContent
      });
    }

    toggle() {
      this.setState({
        modal: !this.state.modal,
      });
    }

    _handleSearch(e){
      e.preventDefault();
      
      axios({
        url:config.get('BASE_SERVICE_URL')+'/api/Article/Find',
        method: 'post', 
        headers: {
         'Content-Type': 'application/json; v=1.0'
        },
       data: {
          "ContentType":this.state.filterModel.ContentType.value,
          "Brand": this.state.filterModel.Brand.value,
          "Category": this.state.filterModel.Category.value,
          "Ordering": this.state.filterModel.Ordering.value,              
          "Language":this.state.filterModel.Language.value,
          "Page":this.state.page
        }
      }
      )
      .then(res=> {
          
        this.setState({contents:res.data.contents})

          if(res.data.statusCode===201)
          {
            console.log("Find");
            
          }
          
          console.log(res);
      })
      .catch(function (res) {
          console.log(res);
      });
    }

    saveAssociatedSegment(){
      this.setState({
        modal: !this.state.modal,
      });
      console.log("ContentId:"+this.state.contentId  , "Segments"+this.state.segmentsToContent.join('|'));

      axios({
        url:config.get('BASE_SERVICE_URL')+'/api/segment/AssociatedContentSegment',
        method: 'post', 
        headers: {
         'Content-Type': 'application/json; v=1.0'
        },
       data: {
          "ContentId":this.state.contentId,
          "SegmentedCode": this.state.segmentsToContent.join('|')
        }
      }
      )
      .then(res=> {
          
        this.setState({contents:res.data.contents})

          if(res.data.statusCode===201)
          {
            console.log("Insert");
            
          }
          
          console.log(res);
      })
      .catch(function (res) {
          console.log(res);
      });

    }
    
    addSegments(key){

      this.setState({
        modal: !this.state.modal,
        contentId:key
      });

      console.log(key);

    }

    componentWillMount() {
     
      axios.get(config.get('BASE_SERVICE_URL')+'/api/Segment/Find',{
        headers: { 
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      })
      .then(res=>{
        this.setState({segments:res.data.data})

        Object.keys(this.state.segments).map((key,index) => {

          const segment = this.state.segments[index];
          this.state.filterOptions.push({value: segment.segmentedCode, label: segment.segmentedValue})

          this.setState({filterOptions:this.state.filterOptions})

        });
             
      })
  
    }
      render() {
        var contentResponseBody=<br></br>;

        if(this.state.contents!=null)
            contentResponseBody=<Row>
            
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Linked Contents 
              </CardHeader>
              <CardBody>            
                <Table hover bordered striped responsive size="md">
                  <thead>
                  <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Date Creation</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Views</th>
                      <th>Score</th>
                      <th>Options</th>
                  </tr>
                  </thead>
                  <tbody>
                          {Object.keys(this.state.contents).map((key,index) => {
                                              const content = this.state.contents[index];
      
                                              return (<tr>
                                                  <td>C0{index+1}</td>
                                                  <td>{content.title}</td>
                                                  <td>{content.createdAt}</td>                                           
                                                  <td>{content.brand}</td>
                                                  <td>{  typeof content.category==="string" ? content.category.parent  - content.category.subCategory :''   }</td>
                                                  <td>{content.views}</td>
                                                  <td>{content.relevantScoring}</td>
                                                  <td>
                                                    <Button  color="ghost-info" onClick={() => 
                                                      this.addSegments(content.contentId)}>
                                                      Add Segments
                                                    </Button>
                                                  </td>
                                              </tr>)
                            })
                          }
                  </tbody>
                  </Table>
                          
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Associate to a segment</ModalHeader>
                        <ModalBody>
                       
                          
                        <Select multi value={this.state.handleMultiChange} 
                          options={this.state.filterOptions} 
                          onChange={this.handleMultiChange}
                        />
                         


                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.saveAssociatedSegment}>Add</Button>{' '}
                          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                      </Modal>

                    </CardBody>
                  </Card>
                </Col>
              </Row>




        return (
          <div className="animated fadeIn">

            <Row>
            <Col xs="12" sm="12">
            <form onSubmit={this._handleSearch} id="content-form">
            <Card>
              <CardHeader>
                <strong>Search Content</strong>
                <small> Formulaire</small>
              </CardHeader>
              <CardBody>
              <Row>
              <Col xs="6" sm="6">
              <Row>
                <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="ContentType">Content Type</Label>
                      <select type="select" name="contentType" id="contentType" class="form-control"     
            
                      ref={(input) => this.state.filterModel.ContentType = input}
                      >
                        <option value="Article">Article</option>
                        <option value="Product">Product</option>                          
                      </select>
                    </FormGroup>
                </Col>
              </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="Language">Language</Label>
                      <select type="select" name="Language" id="Language" class="form-control"     
            
                          ref={(input) => this.state.filterModel.Language = input}
                          >
                            <option value="EN-GB">UK</option>
                            <option value="JP-JP">Japon</option>   
                            <option value="DE-DE">Germany</option> 

                      </select>
                    </FormGroup>
                  </Col>
                
                </Row>
               <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="Brand">Brand</Label>
                      <select type="select" name="Brand" id="Brand" class="form-control"     
            
                          ref={(input) => this.state.filterModel.Brand = input}
                          >
                            <option value="">Empty</option>
                            <option value="always">Always</option>
                            <option value="gillette">Gillette</option>   
                            <option value="oralb">Oralb</option> 
                            <option value="ariel">Ariel</option> 
                            <option value="flash">Flash</option> 
                            <option value="venus">Venus</option> 
                            <option value="braun">Braun</option> 
                            <option value="tampax">Tampax</option>
                                                     
                      </select>
                    </FormGroup>
                  </Col>
                
                </Row>
              </Col>
              <Col xs="6" sm="6">
              <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="Category">Category</Label>
                      <select type="select" name="Category" id="Category" class="form-control"     
            
                          ref={(input) => this.state.filterModel.Category = input}
                          >
                           <option value="">Empty</option>
                            <option value="family">Family</option>
                            <option value="fitness">Fitness</option>   
                            <option value="home">Home</option> 
                            <option value="beauty">Beauty</option> 
                                                     
                      </select>
                    </FormGroup>
                  </Col>
                
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="Ordering">Sort by</Label>
                      <select type="select" name="Ordering" id="Ordering" class="form-control"            
                    ref={(input) => this.state.filterModel.Ordering = input}
                          >
                            <option value="MostRecent">Most Recent</option>
                            <option value="MostViewed">Most Viewed</option>
                            <option value="MostRated">Most Rated</option>
                            <option value="TopReview">Top Review</option>    
                                       
                      </select>

                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              </Row>

            

                

              </CardBody>
              <CardFooter>
                <Button type="submit" size="md" color="primary" class="js-search-content"> Search</Button>
               
              </CardFooter>
            </Card>
            </form>
          </Col>
        </Row>

       

          {contentResponseBody}
                               
      </div>
        )
    }
}

export default Contents;