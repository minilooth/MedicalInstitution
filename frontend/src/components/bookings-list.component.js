import React, { Component } from 'react';
import { Container, Card, Spinner, Button, ButtonGroup, } from 'react-bootstrap';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ToastContainer, toast } from 'react-toastify';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-toastify/dist/ReactToastify.css';

import BookingService from '../services/booking.service';

export default class BookingsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookings: null,

            isLoading: true,
            
            columns: [{
                dataField: 'id',
                text: 'ID',
                sort: true,
                headerAlign: 'center',
                style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                },
                headerStyle: {
                    width: '5%',
                    verticalAlign: 'middle'
                }
            }, {
                dataField: 'startTime',
                text: 'Start',
                formatter: (startTime) => { return new Date(startTime).toLocaleString(); },
                sort: true,
                headerAlign: 'center',
                style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                },
                headerStyle: {
                    verticalAlign: 'middle'
                }
            }, {
                dataField: 'endTime',
                text: 'End',
                formatter: (endTime) => { return new Date(endTime).toLocaleString(); },
                headerAlign: 'center',
                style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                },
                headerStyle: {
                    verticalAlign: 'middle'
                }
            }, {
                dataField: 'manipulationName',
                text: 'Manipulation Name',
                sort: true,
                headerAlign: 'center',
                style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                },
                headerStyle: {
                    verticalAlign: 'middle'
                }
            }, {
                dataField: 'description',
                text: 'Description',
                formatter: this.descriptionFormatter,
                sort: true,
                headerAlign: 'center',
                style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                },
                headerStyle: {
                    verticalAlign: 'middle'
                }
            }, {
                dataField: 'employee',
                text: 'Employee',
                formatter: (employee) => { return employee.firstname + " " + employee.surname + " " + employee.patronymic; }, 
                sort: true,
                headerAlign: 'center',
                style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                },
                headerStyle: {
                    verticalAlign: 'middle'
                }
            }, {
                dataField: 'room',
                text: 'Room',
                formatter: (room) => { return room.number; },
                sort: true,
                headerAlign: 'center',
                style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                },
                headerStyle: {
                    width: '6%',
                    verticalAlign: 'middle'
                }
            }, {
                dataField: 'status',
                text: 'Status',
                formatter: this.statusFormatter,
                isDummyField: true,
                sort: true,
                headerAlign: 'center',
                style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                },
                headerStyle: {
                    width: '6%',
                    verticalAlign: 'middle'
                }
            }, {
                dataField: 'endBook',
                text: 'End Book',
                formatter: this.endBookFormatter,
                isDummyField: true,
                headerAlign: 'center',
                align: 'center',
                headerStyle: {
                    width: '8%',
                    verticalAlign: 'middle'
                }
            }, {
                dataField: 'cancellBook',
                text: 'Cancel Book',
                formatter: this.cancelBookFormatter,
                idDummyField: true,
                headerAlign: 'center',
                align: 'center',
                headerStyle: {
                    width: '10%',
                    verticalAlign: 'middle'
                }
            }],
            options: {
                paginationSize: 5,
                pageStartIndex: 1,
                hideSizePerPage: true,
                hidePageListOnlyOnePage: true,
                firstPageText: 'Begin',
                prePageText: '<',
                nextPageText: '>',
                lastPageText: 'End',
                showTotal: true,
                paginationTotalRenderer: () => { return null; },
                disablePageTitle: true,
                sizePerPageList: [{
                  text: '10', value: 10
                }]
            },
        }
    }

    endBook = (bookingId) => {
        BookingService.finishBook(bookingId).then(
            response => {
                toast.success(response.data.message, { position: toast.POSITION.BOTTOM_RIGHT });
                this.getBookings();
            },
            error => {
                toast.error((error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString(), {position: toast.POSITION.BOTTOM_RIGHT});
                this.getBookings();
            }
        )
    }

    cancelBook = (bookingId) => {
        BookingService.cancelBook(bookingId).then(
            response => {
                toast.success(response.data.message, { position: toast.POSITION.BOTTOM_RIGHT });
                this.getBookings();
            },
            error => {
                toast.error((error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString(), {position: toast.POSITION.BOTTOM_RIGHT});
                this.getBookings();
            }
        )
    }

    endBookFormatter = (cell, row) => {
        return(
            <ButtonGroup>
                <Button size="sm" variant="outline-primary" disabled={row.ended || row.cancelled} onClick={this.endBook.bind(this, row.id)}>End Book</Button>
            </ButtonGroup>
        );
    }

    cancelBookFormatter = (cell, row) => {
        return(
            <ButtonGroup>
                <Button size="sm" variant="outline-danger" disabled={row.ended || row.cancelled} onClick={this.cancelBook.bind(this, row.id)}>Cancel Book</Button>
            </ButtonGroup>
        );
    }

    descriptionFormatter = (cell, row) => {
        return (
            <TooltipComponent className="tooltip-box" cssClass="customtooltip" content={row.description} mouseTrail={true} showTipPointer={false}>
                <span style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%"}}>{row.description}</span>
            </TooltipComponent>
        )
    }

    statusFormatter = (cell, row) => {
        if (row.cancelled) {
            return "Cancelled";
        }
        else {
            return row.ended ? "Finished" : "Booked";
        }
    }

    getBookings() {
        BookingService.get().then(
            response => {
                this.setState({
                    bookings: response.data,
                    isLoading: false
                })
            },
            error => {
                toast.error((error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString(), {position: toast.POSITION.BOTTOM_RIGHT});
            }
        )
    }

    componentDidMount() {
        this.getBookings();
    }

    render() {
        let table = null;

        if (!this.state.isLoading) {
            table = 
                    <BootstrapTable 
                        keyField='id' 
                        data={this.state.bookings} 
                        columns={this.state.columns}
                        editable={false}
                        bootstrap4 
                        bordered={true}
                        pagination={paginationFactory(this.state.options)}
                        noDataIndication={"Booking list is empty"}  />
        }
        else {
            table = 
                <div style={{display: "flex", justifyContent: "center"}}> 
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    &nbsp;
                    <div>
                        <div style={{fontSize: "24px"}}>Loading...</div>
                    </div>
                </div>
        }

        return(
            <Container style={{marginTop: "100px", marginBottom: "100px", width: "100%"}} fluid>
                <Card>
                    <Card.Header className={"d-flex justify-content-between"}>
                        <div style={{display: 'flex', alignItems: 'center', fontSize: '24px'}}><FontAwesomeIcon icon={faHospital}/>&nbsp;Bookings</div>
                    </Card.Header>
                    <Card.Body style={{ fontSize: "12px" }}>
                        {table}
                    </Card.Body>
                </Card>
                <ToastContainer limit={3}/>
            </Container>
        );
    }
}