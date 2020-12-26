import React, { Component } from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';
import { faProcedures } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ToastContainer, toast } from 'react-toastify';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-toastify/dist/ReactToastify.css';

import RoomService from '../services/room.service';
import Utils from '../utils/utils';

export default class RoomsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: null,

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
                    verticalAlign: 'middle'
                }
            }, {
                dataField: 'number',
                text: 'Number',
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
                dataField: 'type',
                text: 'Type',
                formatter: (type) => { return Utils.getRoomTypes()[type] },
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
                dataField: 'haveComputer',
                text: 'Has computer',
                formatter: (hasComputer) => { return (hasComputer ? "Yes" : "No") },
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
                dataField: 'haveElectronicScoreboard',
                text: 'Have electronic scoreboard',
                formatter: (hasElectronicScoreboard) => { return (hasElectronicScoreboard ? "Yes" : "No") },
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
                paginationTotalRenderer: () => {return null;},
                disablePageTitle: true,
                sizePerPageList: [{
                  text: '5', value: 5
                }]
            },
        }
    }

    getRooms() {
        RoomService.get().then(
            response => {
                this.setState({
                    rooms: response.data,
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
        this.getRooms();
    }

    render() {
        let table = null;

        if (!this.state.isLoading) {
            table = 
                    <BootstrapTable 
                        keyField='id' 
                        data={this.state.rooms} 
                        columns={this.state.columns} 
                        bootstrap4 
                        bordered={true}
                        pagination={paginationFactory(this.state.options)}
                        noDataIndication={"Room list is empty"}  />
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
                        <div style={{display: 'flex', alignItems: 'center', fontSize: '24px'}}><FontAwesomeIcon icon={faProcedures}/>&nbsp;Rooms</div>
                    </Card.Header>
                    <Card.Body>
                        {table}
                    </Card.Body>
                </Card>
                <ToastContainer limit={3}/>
            </Container>
        );
    }
}