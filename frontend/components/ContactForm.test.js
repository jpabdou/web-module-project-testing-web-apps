import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)
    // const errors = app.queryByTestId("error")
    // expect(errors).not.toBeInTheDocument()

});

test('renders the contact form header', () => {
    const app = render(<ContactForm />)
    const header = app.getByText(/Contact Form/i)
    expect(header).toBeInTheDocument()
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    const app = render(<ContactForm />)
    const name = app.getByText(/first name/i)
    userEvent.type(name, "she")
    expect(name).toBeInTheDocument()
    const errors = app.queryAllByTestId("error")
    expect(errors).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    const app = render(<ContactForm />)
    const button = app.getByText(/submit/i)
    userEvent.click(button)
    const errors = app.queryAllByTestId("error")
    expect(errors).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const app = render(<ContactForm />)
    const fname = app.getByText(/first name/i)
    userEvent.type(fname, "Dougie")
    const lname = app.getByText(/last name/i)
    userEvent.type(lname, "Howser") 
    const button = app.getByText(/submit/i)
    userEvent.click(button)
    const errors = app.queryAllByTestId("error")
    expect(errors).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    const app = render(<ContactForm />)
    const email = app.getByText(/email/i)
    userEvent.type(email, "Dougie")
    const error = await app.findByText(/email must be a valid email address/i)
    expect(error).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    const app = render(<ContactForm />)
    const fname = app.getByText(/first name/i)
    userEvent.type(fname, "Dougie")
    const email = app.getByText(/email/i)
    userEvent.type(email, "dougiehowser@gmail.com") 
    const button = app.getByText(/submit/i)
    userEvent.click(button)
    const error = await app.findByText(/lastName is a required field/i)
    expect(error).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    const app = render(<ContactForm />)
    const lname = app.getByText(/last name/i)
    userEvent.type(lname, "Howser")
    const fname = app.getByText(/first name/i)
    userEvent.type(fname, "Dougie")
    const email = app.getByText(/email/i)
    userEvent.type(email, "dougiehowser@gmail.com") 
    const button = app.getByText(/submit/i)
    userEvent.click(button)
    const fnameSubmission = await app.queryByTestId(/firstnamedisplay/i)
    expect(fnameSubmission).toHaveTextContent("Dougie") 
    const lnameSubmission = await app.queryByTestId(/lastnamedisplay/i)
    expect(lnameSubmission).toHaveTextContent("Howser") 
    const emailSubmission = await app.queryByTestId(/emaildisplay/i)
    expect(emailSubmission).toHaveTextContent("dougiehowser@gmail.com") 
    const msgSubmission = await app.queryByTestId(/messagedisplay/i)
 
    expect(msgSubmission).not.toBeInTheDocument() 
});

test('renders all fields text when all fields are submitted.', async () => {
    const app = render(<ContactForm />)
    const lname = app.getByText(/last name/i)
    userEvent.type(lname, "Howser")
    const fname = app.getByText(/first name/i)
    userEvent.type(fname, "Dougie")
    const email = app.getByText(/email/i)
    userEvent.type(email, "dougiehowser@gmail.com") 
    const message = app.getByText(/message/i)
    userEvent.type(message, "this is a test message")
    const button = app.getByText(/submit/i)
    userEvent.click(button)
    const fnameSubmission = await app.queryByTestId(/firstnamedisplay/i)
    expect(fnameSubmission).toHaveTextContent("Dougie") 
    const lnameSubmission = await app.queryByTestId(/lastnamedisplay/i)
    expect(lnameSubmission).toHaveTextContent("Howser") 
    const emailSubmission = await app.queryByTestId(/emaildisplay/i)
    expect(emailSubmission).toHaveTextContent("dougiehowser@gmail.com")
    const msgSubmission = await app.findByTestId(/messagedisplay/i)

    expect(msgSubmission).toHaveTextContent(/this is a test message/i) 
});
