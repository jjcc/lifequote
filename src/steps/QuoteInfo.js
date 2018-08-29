import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Table from 'react-bootstrap/lib/Table'

import {Step} from '../enums'
import {Genders, HealthCodes, ProductCodes, States,Flights} from '../lookups'
import {formatDollars} from '../utils'
import { flightCodes } from '../refdata';

let getPaymentRows = payments =>
  payments.reduce((rows, {term, annualPayment, monthlyPayment}) => {
    rows.header.push(<th>{term} year</th>)
    rows.annual.push(<td>{annualPayment.toFixed(2)}</td>)
    rows.monthly.push(<td>{monthlyPayment.toFixed(2)}</td>)
    return rows
  }, {
    header: [<th></th>],
    annual: [<th>Annual</th>],
    monthly: [<th>Monthly</th>]
  })

let QuoteInfo = React.createClass({
  render() {
    let {changeStep, generalInfo, payments} = this.props
    let rows = getPaymentRows(payments)
    return <div>
      <div className="panel-body">
        <p>Congratulations! You’ve just taken the first step toward securing your loved ones’ financial future. Your life insurance quote is below. What’s next? Forward your quote to one of our experienced agents who will walk you through the application process.</p>
        <Row>
          <Col sm={6}>
            <h3>Your Information</h3>
            <Table bordered>
              <tbody>
                <tr>
                  <th>Gender</th>
                  <td>{Genders[generalInfo.gender].title}</td>
                </tr>
                <tr>
                  <th>Age</th>
                  <td>{generalInfo.age}</td>
                </tr>
                <tr>
                  <th>Province/State</th>
                  <td>{States[generalInfo.stateCode].abbreviation}</td>
                </tr>
                <tr>
                  <th>Flight class</th>
                  <td>{generalInfo.tobacco ? 'Economic' : 'Business'}</td>
                </tr>
                <tr>
                  <th>Flight</th>
                  <td>{Flights[generalInfo.coverage].title}</td>
                </tr>
                <tr>
                  <th>Type of coverage</th>
                  <td>{ProductCodes[generalInfo.productCode].name}</td>
                </tr>
                <tr>
                  <th>Premium class</th>
                  <td>{HealthCodes[generalInfo.healthCode].title}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col sm={6}>
            <h3>Cost/Payment</h3>
            <Table bordered>
              <tbody>
                <tr>
                 <td>Pool size: 3,400,567 CND </td>
                </tr>
                <tr>
                  <td>Cost: 25</td>
                </tr>
                <tr>
                  <td>Payment on delay: 3000</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
      <div className="panel-footer">
        <Row>
          <Col sm={12}>
            <Button className="pull-left" onClick={() => changeStep(Step.GENERAL_INFO)}>
              Edit
            </Button>
            <Button bsStyle="primary" className="pull-right" onClick={() => changeStep(Step.SEND_QUOTE)}>
              Pay and send tranction to blockchain
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  }
})

export default QuoteInfo
