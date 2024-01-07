import './SendTipModal.css';
import React from 'react';
import { useState } from 'react';

function SendTipModal ({ isOpen, onClose, currency, currency_symbol }) {

    const [amount, setAmount] = useState('');
    const [anonymousTip, setIsAnonymousTip] = useState(false);

    const templateAmounts = ["500", "1000", "5000", "10000", "20000"];

    const selectAmount = (amount) => {
        setAmount(amount);
    }

    const changeIsAnonymousTip = () => {
        setIsAnonymousTip(!anonymousTip); 
    }

    const handleAmountInput = (event) => {
        const regex = /^[0-9]*$/;
        const value = event.target.value;
    
        if (regex.test(value)) {
            setAmount(value);
        }

        else if (value === '') {
            setAmount(value);
        }
      };

    if (!isOpen) {
        return null;
    }

    return (
        <div className='send-tip-modal-main'>
            <div className='send-tip-modal-child'>
                <p className='send-tip-title'>Send tip</p>
                <input type="text" 
                    value={amount}
                    onChange={handleAmountInput}
                    placeholder={'' + currency_symbol + ' Tip amount' } 
                    className="send-tip-input" />
                <p className='send-tip-minimum'>Minimun {currency_symbol}500.00</p>
                <ul className='send-tip-template-list'>
                    {templateAmounts.map((amount, index) => (
                    <li key={index}>
                        <div onClick={() => {selectAmount(amount)}} className='template-amount-div'>
                            <p className='template-amount'>{currency_symbol}{amount}</p>
                        </div>
                    </li>
                    ))}
                </ul>
                <label className="sendtip-checkbox-label">
                    <input
                        type="checkbox"
                        checked={anonymousTip}
                        onChange={changeIsAnonymousTip}
                    />
                    <span className="checkbox-custom"></span>
                    Anonymous tip
                </label>
                <div className="send-tip-buttons-row">
                    <button onClick={onClose} className="send-tip-cancel-button">
                        Cancel
                    </button>
                    <button className="send-tip-done-button">
                    <div className="send-tip-button-div">
                        <img src="/images/send-tip.svg" alt="Tip" />
                        <p>Tip</p>
                    </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SendTipModal;