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

function SimulationInformation(props) {
    let result= <Col xs="12" sm="6">
    <form>
    <Card>
      <CardHeader>
        <strong>Informations</strong>
      </CardHeader>
      <CardBody>
      
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label htmlFor="name">Context Id</Label>
              <input type="text" id="Context" value={props.info.Rule.contextId} disabled 
              className="form-control"/>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label htmlFor="Rules">Default Rules</Label>
              <input type="text" id="Context" value={props.info.Rule.default} disabled 
              className="form-control"/>
            </FormGroup>
          </Col>

          <Col xs="6">
            <FormGroup>
              <Label htmlFor="Number">Number Of Contents</Label>
              <input type="text" id="Context" value={props.info.Rule.numberOfContents}  disabled 
              className="form-control"/>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label htmlFor="Content">Content Type</Label>
              <input type="text" id="Context" value={props.info.Rule.contentType} disabled 
              className="form-control"/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label htmlFor="Segments">Segments</Label>
              <input type="text" id="Segments" value={props.info.Profile.segments.map((segment)=>
                    segment.segmentedCode
              )
            } 
            disabled 
              className="form-control"/>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label htmlFor="status">Status</Label>
              <input type="text" id="Status" value={props.info.Profile.status} disabled 
              className="form-control"/>
            </FormGroup>
          </Col>

        </Row>

        <Row>
          <Col xs="6">
            <FormGroup>
              <Label htmlFor="TriedBrand">Tried Brand</Label>
              <input type="text" id="TriedBrand" value={props.info.Profile.triedBrand} disabled 
              className="form-control"/>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label htmlFor="FavoriteSection">Favorite Section</Label>
              <input type="text" id="FavoriteSection" value={props.info.Profile.favoriteSection} disabled 
              className="form-control"/>
            </FormGroup>
          </Col>

        </Row>
   
      </CardBody>
    </Card>
    </form>
  </Col>
                         
    return result;
                           
}
export default SimulationInformation;