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
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const first = screen.getByText(/First Name*/i);
    userEvent.type(first, "Aus");
    const errorMessages = await screen.findAllByTestId("error");
    expect(errorMessages).toHaveLength(1);
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

    await waitFor(() => {
        const errors = screen.queryAllByTestId("error");
        expect(errors).toHaveLength(3);
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    const firstName = screen.queryByPlaceholderText("Edd");
    const lastName = screen.queryByPlaceholderText("Burke");

    userEvent.type(firstName, "Austin");
    userEvent.type(lastName, "M");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errors = await screen.findAllByTestId("error");
    // console.log(errors);
    expect(errors).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const email = screen.queryByLabelText(/email*/i);
    userEvent.type(email, "a");


    const emailError = await screen.findByText(/email must be a valid email address/i);
    expect(emailError).toBeInTheDocument();
    expect("email must be a valid email address").toBeInTheDocument
    expect(emailError).toHaveTextContent("email must be a valid email address")

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    
    const button = screen.getByRole("button");
    userEvent.click(button);

    const lastError = await screen.findByText(/lastName is a required field/i);
    // const errors = screen.queryAllByTestId("error");
    expect(lastError).toBeInTheDocument();
    expect(lastError).toHaveTextContent(/lastName/i);

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

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText("Austin");
        const lastNameDisplay = screen.queryByText("Marz");
        const emailDisplay = screen.queryByText("amarra@gmail.com");
        const messageDisplay = screen.queryByTestId("messageDisplay");
        
        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    })

    // const first = screen.queryAllByTestId("firstnameDisplay");
    // const second = screen.queryAllByTestId("lastnameDisplay");
    // const third = screen.queryAllByTestId("emailDisplay");
    
    // expect(first).toBeTruthy();
    // expect(second).toBeTruthy();
    // expect(third).toBeTruthy();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const firstName = screen.getByPlaceholderText("Edd");
    const lastName = screen.getByPlaceholderText("Burke");
    const email = screen.getByLabelText(/email*/i);
    const message = screen.getByLabelText(/message/i);

    userEvent.type(firstName, "Austin");
    userEvent.type(lastName, "Marz");
    userEvent.type(email, "amarra@gmail.com");
    userEvent.type(message, "yoyoyoyo");

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText("Austin");
        const lastNameDisplay = screen.queryByText("Marz");
        const emailDisplay = screen.queryByText("amarra@gmail.com");
        const messageDisplay = screen.queryByText("yoyoyoyo");
        
        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    })
});