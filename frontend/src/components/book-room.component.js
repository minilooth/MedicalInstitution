import React, { Component } from 'react';
import {faCheck, faHospital, faUndo } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Container, Card, Form, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import RoomService from '../services/room.service';
import EmployeeService from '../services/employee.service';
import BookingService from '../services/booking.service';

export default class BookRoom extends Component {
    constructor(props) {
        super(props);

        this.book = this.book.bind(this);

        this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
        this.onChangeRoomId = this.onChangeRoomId.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeManipulationName = this.onChangeManipulationName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.state = {
            employees: [],
            rooms: [],

            employeeId: "",
            roomId: "",
            date: "",
            startTime: "",
            endTime: "",
            manipulationName: "",
            description: "",

            isTimeInvalid: false,
            isDateInvalid: false,
            isManipulationNameInvalid: false,
            isEmployeeIdNotSelected: false,
            isRoomIdNotSelected: false,

            timeError: null,
            dateError: null,
            manipulationNameError: null,
            employeeIdError: null,
            roomIdError: null,
        }

        this.isFormInvalid = false;
    }

    onEmployeeIdFocus = () => { this.setState({ isEmployeeIdNotSelected: false }) }
    onRoomIdFocus = () => { this.setState({ isRoomIdNotSelected: false })}
    onTimeFocus = () => { this.setState({ isTimeInvalid: false }) }
    onDateFocus = () => { this.setState({ isDateInvalid: false }) }
    onManipulationNameFocus = () => { this.setState({ isManipulationNameInvalid: false }) }

    onChangeEmployeeId = (event) => { this.setState({ employeeId: event.target.value }) }
    onChangeRoomId = (event) => { this.setState({ roomId: event.target.value }) }
    onChangeStartTime = (event) => { this.setState({ startTime: event.target.value }) }
    onChangeEndTime = (event) => { this.setState({ endTime: event.target.value }) }
    onChangeDate = (event) => { this.setState({ date: event.target.value }) }
    onChangeManipulationName = (event) => { this.setState({ manipulationName: event.target.value }) }
    onChangeDescription = (event) => { this.setState({ description: event.target.value }) }

    reset = () => {
        this.setState({
            employeeId: "",
            roomId: "",
            date: "",
            startTime: "",
            endTime: "",
            manipulationName: "",
            description: "",

            isTimeInvalid: false,
            isDateInvalid: false,
            isManipulationNameInvalid: false,
            isEmployeeIdNotSelected: false,
            isRoomIdNotSelected: false,
        })
    }

    validate = () => {
        this.isFormInvalid = false;

        if (this.state.employeeId === "") {
            this.setState({
                employeeIdError: "This field is required",
                isEmployeeIdNotSelected: true,
            })
            this.isFormInvalid = true;
        }

        if (this.state.roomId === "") {
            this.setState({
                roomIdError: "This field is required",
                isRoomIdNotSelected: true
            })
            this.isFormInvalid = true;
        }

        if (this.state.startTime === "") {
            this.setState({
                timeError: "This field is required",
                isTimeInvalid: true
            })
            this.isFormInvalid = true;
        }
        
        if (this.state.endTime === "") {
            this.setState({
                timeError: "This field is required",
                isTimeInvalid: true
            })
            this.isFormInvalid = true;
        }

        if (this.state.date === "") {
            this.setState({
                dateError: "This field is required",
                isDateInvalid: true
            })
            this.isFormInvalid = true;
        }

        if (this.state.manipulationName.length === 0) {
            this.setState({
                manipulationNameError: "This field is required",
                isManipulationNameInvalid: true
            })
            this.isFormInvalid = true;
        }
        else if (this.state.manipulationName.length < 5 || this.state.manipulationName.length > 255) {
            this.setState({
                manipulationNameError: "Manupulation name length should be between 5 and 255 characters",
                isManipulationNameInvalid: true
            })
            this.isFormInvalid = true;
        }
        else if (!this.state.manipulationName.match(/^[A-Za-zА-Яа-я0-9 .,"()-№;:-]+$/)) {
            this.setState({
                manipulationNameError: "Manipulation name should consists of digits, letters and symbols \".-, \"()-№;:\".",
                isManipulationNameInvalid: true
            })
            this.isFormInvalid = true;
        }

        
        if (this.state.startTime !== "" && this.state.endTime !== "" && this.state.date !== "") {
            if (Date.parse(this.state.date + " " + this.state.startTime) < new Date().setHours(0,0,0) || Date.parse(this.state.date + " " + this.state.endTime) < new Date().setHours(0,0,0)) {
                this.setState({
                    dateError: "Date entered incorrectly",
                    isDateInvalid: true
                })
                this.isFormInvalid = true;
            }
            if (Date.parse(this.state.date + " " + this.state.startTime) >= Date.parse(this.state.date + " " + this.state.endTime)) {
                this.setState({
                    timeError: "Time entered incorrectly",
                    isTimeInvalid: true
                })
                this.isFormInvalid = true;
            }
        }
    }

    getEmployees() {
        EmployeeService.get().then(
            response => {
                this.setState({ employees: response.data });
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

    getRooms() {
        RoomService.get().then(
            response => {
                this.setState({ rooms: response.data });
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

    book = (event) => {
        event.preventDefault();

        this.validate();

        if (!this.isFormInvalid) {
            BookingService.book(
                this.state.employeeId,
                this.state.roomId,
                new Date(this.state.date + " " + this.state.startTime),
                new Date(this.state.date + " " + this.state.endTime),
                this.state.manipulationName,
                this.state.description
            ).then(
                response => {
                    this.reset();
                    toast.success(response.data.message, { position: toast.POSITION.BOTTOM_RIGHT });
                    setTimeout(() => this.props.history.push("/bookings/list"), 5000);
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
    }

    componentDidMount() {
        this.getEmployees();
        this.getRooms();
    }

    render() {
        return (
            <Container style={{width: "50%", marginTop: "100px"}}>
              <Card className="border border-light bg-light text-black">
                <Form onSubmit={this.book} onReset={this.reset} noValidate>
                <Card.Header><FontAwesomeIcon icon={faHospital}/>&nbsp;Book room</Card.Header>
                  <Card.Body>
                    <Form.Row>
                        <Form.Group as={Col} id="employeeSelect" className="right_form_group_style">
                            <Form.Label>Employee</Form.Label>
                            <Form.Control
                            as="select"
                            className="mr-sm-2"
                            custom
                            name="employee"
                            value={this.state.employeeId}
                            isInvalid={this.state.isEmployeeIdNotSelected}
                            onChange={this.onChangeEmployeeId}
                            onFocus={this.onEmployeeIdFocus.bind(this)}>
                                    <option value="">Select...</option>
                                    {
                                        this.state.employees.map((employee) => {
                                            return <option key={employee.id} value={employee.id}>{employee.firstname} {employee.surname} {employee.patronymic}</option>
                                        })
                                    }
                            </Form.Control>
                            {this.state.isEmployeeIdNotSelected ? <span className="error">{this.state.employeeIdError}</span> : null}
                        </Form.Group>
                        <Form.Group as={Col} id="roomSelect" className="right_form_group_style">
                            <Form.Label>Room</Form.Label>
                            <Form.Control
                            as="select"
                            className="mr-sm-2"
                            custom
                            name="room"
                            value={this.state.roomId}
                            isInvalid={this.state.isRoomIdNotSelected}
                            onChange={this.onChangeRoomId}
                            onFocus={this.onRoomIdFocus.bind(this)}>
                                    <option value="">Select...</option>
                                    {
                                        this.state.rooms.map((room) => {
                                            return <option key={room.id} value={room.id}>{room.number}</option>
                                        })
                                    }
                            </Form.Control>
                            {this.state.isRoomIdNotSelected ? <span className="error">{this.state.roomIdError}</span> : null}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} id="startTimeInput" className="right_form_group_style">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                            type="time"
                            className="mr-sm-2"
                            name="startTime"
                            value={this.state.startTime}
                            isInvalid={this.state.isTimeInvalid}
                            onChange={this.onChangeStartTime}
                            onFocus={this.onTimeFocus.bind(this)}>
                            </Form.Control>
                            {this.state.isTimeInvalid ? <span className="error">{this.state.timeError}</span> : null}
                        </Form.Group>
                        <Form.Group as={Col} id="endTimeInput" className="right_form_group_style">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                            type="time"
                            className="mr-sm-2"
                            name="endTime"
                            value={this.state.endTime}
                            isInvalid={this.state.isTimeInvalid}
                            onChange={this.onChangeEndTime}
                            onFocus={this.onTimeFocus.bind(this)}>
                            </Form.Control>
                            {this.state.isTimeInvalid ? <span className="error">{this.state.timeError}</span> : null}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} id="dateInput" className="right_form_group_style">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                            type="date"
                            className="mr-sm-2"
                            name="date"
                            value={this.state.date}
                            isInvalid={this.state.isDateInvalid}
                            onChange={this.onChangeDate}
                            onFocus={this.onDateFocus.bind(this)}>
                            </Form.Control>
                            {this.state.isDateInvalid ? <span className="error">{this.state.dateError}</span> : null}
                        </Form.Group>
                        <Form.Group as={Col} id="manipulationNameInput" className="right_form_group_style">
                            <Form.Label>Manipulation Name</Form.Label>
                            <Form.Control
                            type="text"
                            className="mr-sm-2"
                            name="manipulationName"
                            placeholder="Enter manipulation name"
                            value={this.state.manipulationName}
                            isInvalid={this.state.isManipulationNameInvalid}
                            onChange={this.onChangeManipulationName}
                            onFocus={this.onManipulationNameFocus.bind(this)}>
                            </Form.Control>
                            {this.state.isManipulationNameInvalid ? <span className="error">{this.state.manipulationNameError}</span> : null}
                        </Form.Group>
                    </Form.Row>
                    <Form.Group id="descriptionInput">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        as="textarea"
                        className="mr-sm-2"
                        name="description"
                        style={{height: "150px"}}
                        placeholder="Enter description"
                        value={this.state.description}
                        onChange={this.onChangeDescription}>
                        </Form.Control>
                    </Form.Group>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: "40px"}}>
                        <Button variant="primary" type="submit" style={{width: "40%"}}><FontAwesomeIcon icon={faCheck}/>&nbsp;Book</Button>
                        <Button variant="danger" type="reset" style={{width: "40%"}}><FontAwesomeIcon icon={faUndo}/>&nbsp;Reset</Button>
                    </div>
                  </Card.Body>
                </Form>
              </Card>
              <ToastContainer limit={3}/>
            </Container>
        )
    }
}