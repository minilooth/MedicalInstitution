import React, { Component } from 'react';
import {faSave, faPlusSquare, faUndo } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Container, Card, Form, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import RoomService from '../services/room.service';

import Utils from '../utils/utils';

export default class AddRoom extends Component {
    constructor(props) {
        super(props);

        this.add = this.add.bind(this);

        this.onChangeRoomNumber = this.onChangeRoomNumber.bind(this);
        this.onChangeRoomType = this.onChangeRoomType.bind(this);
        this.onChangeHaveComputer = this.onChangeHaveComputer.bind(this);
        this.onChangeHaveElectronicScoreboard = this.onChangeHaveElectronicScoreboard.bind(this);

        this.state = {
            roomNumber: "",
            roomType: "",
            haveComputer: false,
            haveElectronicScoreboard: false,

            isRoomNumberInvalid: false,
            isRoomTypeNotSelected: false,

            roomNumberError: null,
            roomTypeError: null,
        }

        this.isFormInvalid = false;
    }

    onRoomNumberFocus = () => { this.setState({ isRoomNumberInvalid: false }) }
    onRoomTypeFocus = () => { this.setState({ isRoomTypeNotSelected: false }) }

    onChangeRoomNumber = (event) => { this.setState({ roomNumber: event.target.value }) }
    onChangeRoomType = (event) => { this.setState({ roomType: event.target.value }) }
    onChangeHaveComputer = (event) => { this.setState({ haveComputer: event.target.checked }) }
    onChangeHaveElectronicScoreboard = (event) => { this.setState({ haveElectronicScoreboard: event.target.checked }) }

    reset = () => {
        this.setState({
            roomNumber: "",
            roomType: "",
            haveComputer: false,
            haveElectronicScoreboard: false,

            isRoomNumberInvalid: false,
            isRoomTypeNotSelected: false,
        })
    }

    validate = () => {
        this.isFormInvalid = false;

        if (this.state.roomNumber.length === 0) {
            this.setState({
                roomNumberError: "This field is required",
                isRoomNumberInvalid: true
            })
            this.isFormInvalid = true;
        }
        else if (this.state.roomNumber.length < 2 || this.state.roomNumber.length > 4) {
            this.setState({
                roomNumberError: "Room number length should be between 2 and 4 characters",
                isRoomNumberInvalid: true,
            })
            this.isFormInvalid = true;
        } 
        else if (!this.state.roomNumber.match(/^[0-9]{2,3}[A-Za-zА-Яа-я]{0,1}$/)) {
            this.setState({
              roomNumberError: "Room number should consists only of letters and digits.",
              isRoomNumberInvalid: true,
            })
            this.isFormInvalid = true;
        }
        
        if (this.state.roomType.length === 0) {
            this.setState({
                roomTypeError: "This field is required",
                isRoomTypeNotSelected: true,
            })
            this.isFormInvalid = true;
        }
    }

    add = (event) => {
        event.preventDefault();

        this.validate();

        if (!this.isFormInvalid) {
            RoomService.add(
                this.state.roomNumber,
                this.state.roomType,
                this.state.haveComputer,
                this.state.haveElectronicScoreboard
            ).then(
                response => {
                    this.reset();
                    toast.success(response.data.message, { position: toast.POSITION.BOTTOM_RIGHT });
                    setTimeout(() => this.props.history.push("/rooms/list"), 5000);
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

    render() {
        return (
            <Container style={{width: "50%", marginTop: "100px"}}>
              <Card className="border border-light bg-light text-black">
                <Form onSubmit={this.add} onReset={this.reset} noValidate>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare}/>&nbsp;Add room</Card.Header>
                  <Card.Body>
                    <Form.Row>
                      <Form.Group as={Col} id="roomNumberInput" className="left__form__group__style">
                        <Form.Label>Room number</Form.Label>
                        <Form.Control
                          name="roomNumber"
                          type="text"
                          autoComplete="off"
                          value={this.state.roomNumber}
                          isInvalid={this.state.isRoomNumberInvalid}
                          onFocus={this.onRoomNumberFocus.bind(this)}
                          onChange={this.onChangeRoomNumber}
                          placeholder="Enter room number"/>
                        {this.state.isRoomNumberInvalid ? <span className="error">{this.state.roomNumberError}</span> : null}
                      </Form.Group>
                      <Form.Group as={Col} id="positionSelect" className="right_form_group_style">
                        <Form.Label>Room Type</Form.Label>
                        <Form.Control
                          as="select"
                          className="mr-sm-2"
                          custom
                          name="role"
                          value={this.state.roomType}
                          isInvalid={this.state.isRoomTypeNotSelected}
                          onChange={this.onChangeRoomType}
                          onFocus={this.onRoomTypeFocus.bind(this)}>
                                <option value="">Select...</option>
                                {
                                    Utils.getRoomTypes().map((type, index) => {
                                        return <option key={index} value={index}>{type}</option>
                                    })
                                }
                        </Form.Control>
                        {this.state.isRoomTypeNotSelected ? <span className="error">{this.state.roomTypeError}</span> : null}
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} id="haveComputerCheckbox" className="left__form__group__style">
                        <Form.Check 
                            type="checkbox" 
                            label="Have computer"
                            value={this.state.haveComputer}
                            onChange={this.onChangeHaveComputer} />
                      </Form.Group>
                      <Form.Group as={Col} id="haveElectronicScoreboardCheckbox" className="right__form__group__style">
                        <Form.Check 
                            type="checkbox" 
                            label="Have electronic scoreboard"
                            value={this.state.haveElectronicScoreboard}
                            onChange={this.onChangeHaveElectronicScoreboard} />
                      </Form.Group>
                    </Form.Row>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: "40px"}}>
                        <Button variant="primary" type="submit" style={{width: "40%"}}><FontAwesomeIcon icon={faSave}/>&nbsp;Save</Button>
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