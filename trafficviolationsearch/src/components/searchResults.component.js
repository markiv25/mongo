

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import searchPage from './searchPage.component';

import ReactiveButton from 'reactive-button';

const Document = props => {
  // <tr>
  //   <td>{props.document.subAgency}</td>
  //   <td>{props.document.description}</td>
  //   <td>{props.document.location}</td>
  //   <td>{props.document.accident}</td>
  //   <td>{props.document.belts}</td>
  //   <td>{props.document.fatal}</td>
  //   <td>{props.document.alcohol}</td>
  //   <td>{props.document.state}</td>
  //   <td>{props.document.vehicleType}</td>
  //   <td>{props.document.make}</td>
  //   <td>{props.document.charge}</td>
  // </tr>

  const message = () =>{
    // return <Link to="/" component={searchPage} data={props.document}>Click Here</Link>
    return <searchPage data={props.document}/>
  }

  return (

  // <tr>
  //   <td>
  //     {/* <Link to="/trafficviolationsearch/src/components/searchPage.component.js" desc={props.document}>
  //         {props.document.description}
  //       </Link> */}
  //     <Link to="/trafficviolationsearch/src/components/searchPage.component.js" data={props.document}>{props.document.description}</Link>
  //   </td>
  // </tr>
  <li>
    <a>{props.document.description}</a>
    {/* <div><button onClick={message}>Click Here</button></div> */}
    <Link to="/" component={searchPage} data={props.document}>Click Here</Link>
    {/* <a href={'./searchPage'}>Click Here</a> */}
  </li>
  )
}

export default class searchList extends Component {
  constructor(props) {
    super(props);

    this.onChangeList = this.onChangeList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: ''
    }
    this.state = {documents: []};
  }

  onChangeList(e) {
  this.setState({
    description: e.target.value
  })
}

onSubmit(e) {
  e.preventDefault();

  const user = {
    description: this.state.description
  }

  console.log(user);

  axios.get('http://localhost:5000/functions/search/'+this.state.description)
  .then(response => {
     this.setState({
      description: response.data.description
     })
     console.log(response.data);
     this.setState({ documents: response.data });
   })
   .catch(function (error) {
     console.log(error);
   })


  this.setState({
    description: ''
  })
}

documentList() {
      return this.state.documents.map(details => {
        return <Document document={details}/>;
      })
    }

    singleDocList() {
      return this.state.documents.map(details => {
        return <Document document={details}/>;
      })
    }

  render() {
    return (
      <div>
        <div className="header">
         <h3>Traffic Violation Search:</h3>
         </div>
         <form onSubmit={this.onSubmit}>
           <div className="form-group1">

             <input  type="text"
                 required
                 className="form-control"
                  value={this.state.description}
                 onChange={this.onChangeList}
                 />
           </div>
           <div className="form-group">
           <ReactiveButton rounded type="submit" value="submit" className="btn btn-primary" color="primary" width="250px" height= "60px" animation="yes">
              View More
        </ReactiveButton>  <span>  </span>
           </div>
         </form>
         {/* <table className="table">
           <thead className="thead-light">
             <tr>
               <th>SubAgency</th>
               <th>Description</th>
               <th>Location</th>
               <th>Accident</th>
               <th>Belts</th>
               <th>Fatal</th>
               <th>Alcohol</th>
               <th>State</th>
               <th>VehicleType</th>
               <th>Make</th>
               <th>Charge</th>
             </tr>
           </thead>
           <tbody>
             { this.documentList()}
           </tbody>
         </table> */}
          <div className="list">
        <ul>
           
           <span>{ this.documentList()}</span>
           
         </ul>
         </div>
       </div>
    )
  }
}