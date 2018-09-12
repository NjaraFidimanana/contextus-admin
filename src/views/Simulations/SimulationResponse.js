import React, { Component } from 'react';
import $ from 'jquery';
import {
    Badge,Button,ButtonDropdown,Card,
    CardBody,CardFooter,CardHeader,Col,
    Collapse,DropdownItem,DropdownMenu,DropdownToggle,
    Label,Row,
    Pagination, PaginationItem, PaginationLink, Table 
  } from 'reactstrap';
function SimulationResponse(props) {

    var response= (<Row>
    <Col>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> Simulation Response
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
            </tr>
            </thead>
            <tbody>
                    {Object.keys(props.contents).map((key,index) => {
                                        const content = props.contents[index];

                                        return (<tr>
                                            <td>C0{index+1}</td>
                                            <td>{content.title}</td>
                                            <td>{content.createdAt}</td>                                           
                                            <td>{content.brand}</td>
                                            <td>{  typeof content.category==="string" ? content.category.parent  - content.category.subCategory :''   }</td>
                                            <td>{content.views}</td>
                                            <td>{content.relevantScoring}</td>
                                        </tr>)
                      })
                    }
            </tbody>
            </Table>
            
              </CardBody>
            </Card>
          </Col>
        </Row>
            )
                    

  
                         
    return response;
                           
}
export default SimulationResponse;