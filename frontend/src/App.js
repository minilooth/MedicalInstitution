import React from "react";
import { NavDropdown, Nav, Navbar } from "react-bootstrap";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'; 

import EmployeesList from './components/employees-list.component';
import AddEmployee from './components/add-employee.component';
import RoomsList from "./components/rooms-list.component";
import AddRoom from './components/add-room.component';
import BookingsList from './components/bookings-list.component';
import BookRoom from './components/book-room.component';

function App() {
    return (
        <div>
            <Navbar className="navbar navbar-expand navbar-light bg-light justify-content-between" fixed="top">
                <Navbar.Brand href="/">Medical Institution</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                          <NavDropdown title="Employees" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/employees/add">Add Employee</NavDropdown.Item>
                            <NavDropdown.Item href="/employees/list">Employee List</NavDropdown.Item>
                          </NavDropdown>

                          <NavDropdown title="Rooms" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/rooms/add">Add Room</NavDropdown.Item>
                            <NavDropdown.Item href="/rooms/list">Room List</NavDropdown.Item>
                          </NavDropdown>

                          <NavDropdown title="Bookings" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/bookings/book">Book Room</NavDropdown.Item>
                            <NavDropdown.Item href="/bookings/list">Bookings List</NavDropdown.Item>
                          </NavDropdown>
                      </Nav>
                </Navbar.Collapse>
            </Navbar>

            <BrowserRouter>
                <Switch>
                    <Route exact path={["/", "/employees/list"]} component={ EmployeesList } />
                    <Route exact path={"/employees/add"} component={ AddEmployee } />
                    <Route exact path={"/rooms/list"} component={ RoomsList } />
                    <Route exact path={"/rooms/add"} component={ AddRoom } />
                    <Route exact path={"/bookings/list"} component={ BookingsList } />
                    <Route exact path={"/bookings/book"} component={ BookRoom } />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
