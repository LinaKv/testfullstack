import React from 'react';
import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { InputMask, InputMaskChangeEvent } from 'primereact/inputmask';
import 'primeicons/primeicons.css';
import fetchData from '../helpers/fetchData';
import Users from '../components/Users';
import { isValidEmail, isValidPhoneNumber } from '../helpers/utils';

function Form() {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
    });
    const { email, phone } = formData;
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [data, setData] = useState([]);

    const onChange = (e: ChangeEvent<HTMLInputElement> | InputMaskChangeEvent) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));

        // check if email is correct
        if (e.target.id === 'email') {
            setEmailError(!isValidEmail(e.target.value));
        }

        // check if phone number is correct
        if (e.target.id === 'phone') {
            setPhoneError(!isValidPhoneNumber(e.target.value));
        }
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setData(await fetchData(email, phone?.replace(/-/g, '')));
    };

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back</p>
                </header>

                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        className={emailError ? 'emailInputError' : 'emailInput'}
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={onChange}
                        required
                    />

                    <div className="numberInputDiv">
                        <InputMask
                            type="text"
                            className={phoneError ? 'numberInputError' : 'numberInput'}
                            placeholder="xx-xx-xx"
                            id="phone"
                            value={phone}
                            onChange={onChange}
                            mask="99-99-99"
                        />
                    </div>

                    <div className="findBar">
                        <p className="findText">Submit</p>
                        <button className="findButton">
                            <i className="pi pi-search iconButton" />
                        </button>
                    </div>
                </form>

                <Users users={data} />
            </div>
        </>
    );
}

export default Form;
