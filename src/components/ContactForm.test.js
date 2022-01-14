import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import App from '../App'

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/Contact Form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const first = screen.queryByText(/First Name*/i);
    userEvent.type(first, "Aus");
    const error = screen.queryAllByTestId("error");
    expect(error.length).toBe(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    // const firstName = screen.queryByPlaceholderText("Edd");
    // const lastName = screen.queryByPlaceholderText("Burke");
    // const email = screen.queryByPlaceholderText("bluebill1049@gmail.com")

    // userEvent.type(firstName, "");
    // userEvent.type(lastName, "");
    // userEvent.type(email, "");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errors = screen.queryAllByTestId("error");
    expect(errors.length).toBe(3);

    // console.log(errors);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    const firstName = screen.queryByPlaceholderText("Edd");
    const lastName = screen.queryByPlaceholderText("Burke");

    userEvent.type(firstName, "Austin");
    userEvent.type(lastName, "M");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errors = screen.queryAllByTestId("error");
    // console.log(errors);
    expect(errors.length).toBe(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const email = screen.queryByLabelText(/email*/i);
    userEvent.type(email, "a");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errors = screen.queryAllByTestId("error");
    expect(errors[2]).toBeInTheDocument();
    expect("valid email address").toBeInTheDocument

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    
    const button = screen.getByRole("button");
    userEvent.click(button);

    // const errors = screen.queryAllByTestId("error");
    expect("lastName is a required field").toBeInTheDocument

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)

    const firstName = screen.queryByPlaceholderText("Edd");
    const lastName = screen.queryByPlaceholderText("Burke");
    const email = screen.queryByLabelText(/email*/i);

    userEvent.type(firstName, "Austin");
    userEvent.type(lastName, "Marz");
    userEvent.type(email, "amarra@gmail.com");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const first = screen.queryAllByTestId("firstnameDisplay");
    const second = screen.queryAllByTestId("lastnameDisplay");
    const third = screen.queryAllByTestId("emailDisplay");
    
    expect(first).toBeTruthy();
    expect(second).toBeTruthy();
    expect(third).toBeTruthy();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const firstName = screen.queryByPlaceholderText("Edd");
    const lastName = screen.queryByPlaceholderText("Burke");
    const email = screen.queryByLabelText(/email*/i);
    const message = screen.queryByText(/message/i);

    userEvent.type(firstName, "Austin");
    userEvent.type(lastName, "Marz");
    userEvent.type(email, "amarra@gmail.com");
    userEvent.type(message, "hi");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const first = screen.queryAllByTestId("firstnameDisplay");
    const second = screen.queryAllByTestId("lastnameDisplay");
    const third = screen.queryAllByTestId("emailDisplay");
    const fourth = screen.queryAllByTestId("messageDisplay");
    
    expect(first).toBeTruthy();
    expect(second).toBeTruthy();
    expect(third).toBeTruthy();
    expect(fourth).toBeTruthy();
});