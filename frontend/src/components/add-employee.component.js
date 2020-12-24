import React, { Component } from 'react';
import {faSave, faPlusSquare, faUndo } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Container, Card, Form, Col, Button, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import MaskedFormControl from 'react-bootstrap-maskedinput';

import 'react-toastify/dist/ReactToastify.css';

import EmployeeService from '../services/employee.service';

import Utils from '../utils/utils';

export default class AddEmployee extends Component {
    constructor(props) {
        super(props);

        this.add = this.add.bind(this);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangePatronymic = this.onChangePatronymic.bind(this);
        this.onChangeWorkPhone = this.onChangeWorkPhone.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);

        this.state = {
            firstname: "",
            surname: "",
            patronymic: "",
            workPhone: "",
            position: "",

            isFirstnameInvalid: false,
            isSurnameInvalid: false,
            isPatronymicInvalid: false,
            isWorkPhoneInvalid: false,
            isPositionNotSelected: false,

            firstnameError: null,
            surnameError: null,
            patronymicError: null,
            workPhoneError: null,
            positionError: null
        }

        this.isFormInvalid = false;
    }

    onFirstnameFocus = () => { this.setState({ isFirstnameInvalid: false }) }
    onSurnameFocus = () => { this.setState({ isSurnameInvalid: false }) }
    onPatronymicFocus = () => { this.setState({ isPatronymicInvalid: false }) }
    onWorkPhoneFocus = () => { this.setState({ isWorkPhoneInvalid: false }) }
    onPositionFocus = () => { this.setState({ isPositionNotSelected: false }) }

    onChangeFirstname = (event) => { this.setState({ firstname: event.target.value }) }
    onChangeSurname = (event) => { this.setState({ surname: event.target.value }) }
    onChangePatronymic = (event) => { this.setState({ patronymic: event.target.value }) }
    onChangeWorkPhone = (event) => { this.setState({ workPhone: event.target.value }) }
    onChangePosition = (event) => { this.setState({ position: event.target.value }) }

    reset = () => {
        this.setState({
            firstname: "",
            surname: "",
            patronymic: "",
            workPhone: "",
            position: "",

            isFirstnameInvalid: false,
            isSurnameInvalid: false,
            isPatronymicInvalid: false,
            isWorkPhoneInvalid: false,
            isPositionNotSelected: false,
        })
    }

    validate = () => {
        this.isFormInvalid = false;

        if (this.state.firstname.length === 0) {
            this.setState({
                firstnameError: "This field is required",
                isFirstnameInvalid: true
            })
            this.isFormInvalid = true;
        }
        else if (this.state.firstname.length < 2 || this.state.firstname.length > 30) {
            this.setState({
              firstnameError: "Firstname length should be between 2 and 30 characters",
              isFirstnameInvalid: true,
            })
            this.isFormInvalid = true;
        } 
        else if (!this.state.firstname.match(/^[A-Za-zА-Яа-я]+$/)) {
            this.setState({
              firstnameError: "Firstname should consists only of letters.",
              isFirstnameInvalid: true,
            })
            this.isFormInvalid = true;
        }
        
        if (this.state.surname.length === 0) {
            this.setState({
                surnameError: "This field is required",
                isSurnameInvalid: true
            })
            this.isFormInvalid = true;
        }
        else if (this.state.surname.length < 2 || this.state.surname.length > 30) {
            this.setState({
              surnameError: "Surname length should be between 2 and 30 characters",
              isSurnameInvalid: true,
            })
            this.isFormInvalid = true;
        } 
        else if (!this.state.surname.match(/^[A-Za-zА-Яа-я]+$/)) {
            this.setState({
              surnameError: "Surname should consists only of letters.",
              isSurnameInvalid: true,
            })
            this.isFormInvalid = true;
        }

        if (this.state.patronymic.length === 0) {
            this.setState({
                patronymicError: "This field is required",
                isPatronymicInvalid: true
            })
            this.isFormInvalid = true;
        }
        else if (this.state.patronymic.length < 2 || this.state.patronymic.length > 30) {
            this.setState({
              patronymicError: "Patronymic length should be between 2 and 30 characters",
              isPatronymicInvalid: true,
            })
            this.isFormInvalid = true;
        } 
        else if (!this.state.patronymic.match(/^[A-Za-zА-Яа-я]+$/)) {
            this.setState({
              patronymicError: "Patronymic should consists only of letters.",
              isPatronymicInvalid: true,
            })
            this.isFormInvalid = true;
        }

        if (this.state.workPhone.length === 0) {
            this.setState({
                workPhoneError: "This field is required",
                isWorkPhoneInvalid: true
            })
            this.isFormInvalid = true;
        }
        else if (this.state.workPhone.length !== 13) {
            this.setState({
              workPhoneError: "Work phone length should be 17 characters",
              isWorkPhoneInvalid: true,
            })
            this.isFormInvalid = true;
        } 
        else if (!this.state.workPhone.match(/^[(]{1}[0-9]{2}[)]{1}[-\\s/0-9]{9}$/)) {
            this.setState({
              workPhone: "Work phone should match template +375(12)345-67-89",
              isWorkPhoneInvalid: true,
            })
            this.isFormInvalid = true;
        }

        if (this.state.position.length === 0) {
            this.setState({
                positionError: "This field is required",
                isPositionNotSelected: true,
            })
            this.isFormInvalid = true;
        }
    }

    add = (event) => {
        event.preventDefault();

        this.validate();

        if (!this.isFormInvalid) {
            EmployeeService.add(
                this.state.firstname,
                this.state.surname,
                this.state.patronymic,
                "+375" + this.state.workPhone,
                this.state.position
            ).then(
                response => {
                    this.reset();
                    toast.success(response.data.message, { position: toast.POSITION.BOTTOM_RIGHT });
                    setTimeout(() => this.props.history.push("/employees/list"), 5000);
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
                <Card.Header><FontAwesomeIcon icon={faPlusSquare}/>&nbsp;Add employee</Card.Header>
                  <Card.Body>
                    <Form.Row>
                      <Form.Group as={Col} id="firstnameInput" className="left__form__group__style">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control
                          name="firstname"
                          type="text"
                          autoComplete="off"
                          value={this.state.firstname}
                          isInvalid={this.state.isFirstnameInvalid}
                          onFocus={this.onFirstnameFocus.bind(this)}
                          onChange={this.onChangeFirstname}
                          placeholder="Enter firstname"/>
                        {this.state.isFirstnameInvalid ? <span className="error">{this.state.firstnameError}</span> : null}
                      </Form.Group>
                      <Form.Group as={Col} id="surnameInput" className="right__form__group__style">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control
                          name="surname"
                          type="text"
                          autoComplete="off"
                          value={this.state.surname}
                          isInvalid={this.state.isSurnameInvalid}
                          onFocus={this.onSurnameFocus.bind(this)}
                          onChange={this.onChangeSurname}
                          placeholder="Enter surname"/>
                        {this.state.isSurnameInvalid ? <span className="error">{this.state.surnameError}</span> : null}
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} id="patronymicInput" className="left__form__group__style">
                        <Form.Label>Patronymic</Form.Label>
                        <Form.Control
                          name="patronymic"
                          type="text"
                          autoComplete="off"
                          value={this.state.patronymic}
                          isInvalid={this.state.isPatronymicInvalid}
                          onFocus={this.onPatronymicFocus.bind(this)}
                          onChange={this.onChangePatronymic}
                          placeholder="Enter patronymic"/>
                        {this.state.isPatronymicInvalid ? <span className="error">{this.state.patronymicError}</span> : null}
                      </Form.Group>
                      <Form.Group as={Col} id="workPhoneInput" className="right__form__group__style">
                        <Form.Label>Work Phone</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">+375</InputGroup.Text>
                            </InputGroup.Prepend>

                            <MaskedFormControl 
                                name="workPhone"
                                type="tel" 
                                autoComplete="off"
                                value={this.state.workPhone}
                                onChange={this.onChangeWorkPhone}
                                onFocus={this.onWorkPhoneFocus.bind(this)}
                                mask="(11)111-11-11"
                                isInvalid={this.state.isWorkPhoneInvalid}
                                placeholder="(__)___-__-__" />
                        </InputGroup>
                        {this.state.isWorkPhoneInvalid ? <span className="error">{this.state.workPhoneError}</span> : null}
                      </Form.Group>
                    </Form.Row>

                    <Form.Group id="positionSelect">
                        <Form.Label>Postition</Form.Label>
                        <Form.Control
                          as="select"
                          className="mr-sm-2"
                          custom
                          name="role"
                          value={this.state.position}
                          isInvalid={this.state.isPositionNotSelected}
                          onChange={this.onChangePosition}
                          onFocus={this.onPositionFocus.bind(this)}>
                                <option value="">Select...</option>
                                {
                                    Utils.getPositions().map((type, index) => {
                                        return <option key={index} value={index}>{type}</option>
                                    })
                                }
                        </Form.Control>
                        {this.state.isPositionNotSelected ? <span className="error">{this.state.positionError}</span> : null}
                    </Form.Group>

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