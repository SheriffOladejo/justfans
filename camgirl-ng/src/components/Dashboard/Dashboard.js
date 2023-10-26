import './Dashboard.css';
import SideBar from '../SideBar/SideBar';
import Navbar from '../Navbar/Navbar';
import React, { useState } from 'react';
import { Chart } from "react-google-charts";
import TransactionHistoryItem from './TransactionHistoryItem';
import FloatingButton from '../../utils/FloatingButton/FloatingButton';

function Dashboard () {

    const [showCardDetails, setShowCardDetails] = useState(false);

    const toggleCardDetailsVisibility = () => {
        setShowCardDetails(!showCardDetails);
    };

    const chartData = [
        ["x", "Income", "Expenses"],
        ["Mon", 10000, 400],
        ["Tue", 11700, 460],
        ["Wed", 6600, 1120],
        ["Thur", 10300, 540],
        ["Fri", 10000, 400],
        ["Sat", 11700, 460],
        ["Sun", 6600, 1120]
    ];

    const historyData = [1];

    const chartOptions = {
        chartArea: {
            left: 100,
            width: '75%'
        },
        hAxis: {
          title: "",
          textStyle: {
            fontName: "Inter",
            fontSize: 12,
            bold: true,
            color: "#8FA6CB",}
        },
        vAxis: {
            format: "#,###.00",
            formatOptions: {
                prefix: "#",
            },
            textStyle: {
                fontName: "Inter",
                fontSize: 12,
                bold: true,
                color: "#8FA6CB",
            },
            viewWindow: { min: 2 },
            baseline: 2,
            viewWindowMode: "explicit",
        },
        series: {
            1: { curveType: "none" },
        },
        legend: {
            textStyle: {
                fontName: "Inter",
                fontSize: 12,
                bold: false,
                color: "black",
            }
        }
    };

    return (
        <div style={{ backgroundColor:'#EBEBEB' }}>
            <Navbar/>
            <div className='dashboard-page'>
                <SideBar pageIndex={3}/>
                <div className='dashboard-main-container'>
                    <div className='dashboard-title-container'>
                        <p className="dashboard-title">Dashboard</p>
                    </div>
                    <div className='dashboard-actions-card-details'>
                        <div className='dashboard-quick-actions'>
                            <p className='dashboard-tab-title'>Quick actions</p>
                            <div className='dashboard-quick-actions-items'>
                                <div className='dashboard-balance-container'>
                                    <p className='dashboad-balance-title'>Total balance</p>
                                    <p className='dashboard-balance'>#100,000.00</p>
                                    <div className='dashboard-balance-buttons-row'>
                                        <button className='dashboard-deposit-button'>
                                            <div className='dashboard-deposit-button-row'>
                                                <img src='images/deposit.png' />
                                                <p>Deposit</p>
                                            </div>
                                        </button>
                                        <button className='dashboard-withdraw-button'>
                                            <div className='dashboard-withdraw-button-row'>
                                                <img src='images/withdraw.png' />
                                                <p>Withdraw</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className='dashboard-balance-container'>
                                    <p className='dashboad-balance-title'>Tokens balance</p>
                                    <p className='dashboard-balance'>100</p>
                                    <button className='dashboard-buy-tokens-button'>
                                        <div className='dashboard-buy-tokens-button-row'>
                                            <img src='images/buy-token.png' />
                                            <p>Buy tokens</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='dashboard-quick-actions'>
                            <p className='dashboard-tab-title'>Card details</p>
                            <div className='dashboard-quick-actions-items'>
                                <div className='dashboard-card-row'>
                                    <div className='dashboard-card'>
                                        <div className='dashboard-dot-container'>
                                            <div className='dashboard-green-dot'></div>
                                        </div>
                                        <div className='dashboard-card-hide-row'>
                                            <div className='dashboard-card-numbers-row'>
                                                <div className='dashboard-card-numbers'>
                                                    <p>X</p>
                                                    <p>X</p>
                                                    <p>X</p>
                                                    <p>X</p>
                                                </div>
                                                <div className='dashboard-card-numbers'>
                                                    <p>X</p>
                                                    <p>X</p>
                                                    <p>X</p>
                                                    <p>X</p>
                                                </div>
                                                <div className='dashboard-card-numbers'>
                                                    <p>X</p>
                                                    <p>X</p>
                                                    <p>X</p>
                                                    <p>X</p>
                                                </div>
                                                <div className='dashboard-card-numbers'>
                                                    <p>X</p>
                                                    <p>X</p>
                                                    <p>X</p>
                                                    <p>X</p>
                                                </div>
                                            </div>
                                            <img
                                                src={showCardDetails ? '/images/eye-icon-open.png' : '/images/eye-icon-closed.png'}
                                                alt={showCardDetails ? 'Hide' : 'Show'}
                                                className="eye-icon"
                                                onClick={toggleCardDetailsVisibility}
                                            />
                                        </div>
                                        <div className='dashboard-card-last-row'>
                                            <div className='dashboard-card-exp-row'>
                                                <p>EXP XX / XX</p>
                                            </div>
                                            <div className='dashboard-card-cvv-row'>
                                                <p>CVV XXX</p>
                                            </div>
                                            <img src='/images/card-type.png' className='dashboard-card-type'/>
                                        </div>
                                    </div>
                                    <div className='dashboard-add-card'>
                                        <p>+</p>
                                    </div>
                                </div>
                                <div className='dashboard-view-all-cards-container'>
                                    <p>View all cards</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-expenses-container'>
                        <p className='dashboard-expenses-title'>Total income and expenses</p>
                        <div className='dashboard-expenses-row'>
                            <div className='dashboard-income-row'>
                                <div className='dashboard-daily-income'>
                                    <div className='dashboard-income-title-row'>
                                        <p className='dashboard-income-title'>Income</p>
                                        <img className='dashboard-income-image' src='/images/wallet-green.png'/>
                                    </div>
                                    <p className='dashboard-tab-title'>#100,000</p>
                                    <p className='dashboard-income-title2'>Revenue today</p>
                                </div>
                                <div className='dashboard-daily-income'>
                                    <div className='dashboard-income-title-row'>
                                        <p className='dashboard-income-title'>Income</p>
                                        <img className='dashboard-income-image' src='/images/wallet-green.png'/>
                                    </div>
                                    <p className='dashboard-tab-title'>#600,000</p>
                                    <p className='dashboard-income-title2'>Revenue this week</p>
                                </div>
                            </div>
                            <div className='dashboard-expense-row'>
                                <div className='dashboard-daily-income'>
                                    <div className='dashboard-income-title-row'>
                                        <p className='dashboard-income-title'>Expenses</p>
                                        <img className='dashboard-income-image' src='/images/wallet-red.png'/>
                                    </div>
                                    <p className='dashboard-tab-title'>#2,000</p>
                                    <p className='dashboard-income-title2'>Expenditure today</p>
                                </div>
                                <div className='dashboard-daily-income'>
                                    <div className='dashboard-income-title-row'>
                                        <p className='dashboard-income-title'>Expenses</p>
                                        <img className='dashboard-income-image' src='/images/wallet-red.png'/>
                                    </div>
                                    <p className='dashboard-tab-title'>#4,000</p>
                                    <p className='dashboard-income-title2'>Expenditure this week</p>
                                </div>
                            </div>
                        </div>
                        <Chart
                            chartType="LineChart"
                            width="100%"
                            height="400px"
                            data={chartData}
                            options={chartOptions}
                        />
                    </div>
                    <div className='dashboard-transaction-history-container'>
                        <p className='dashboard-history-title'>Transaction history</p>
                        <div className='dashboard-column-names-container'>
                            <div className='dashboard-date-column'>
                                <p>Date</p>
                            </div>
                            <div className='dashboard-transaction-column'>
                                <p>Transaction</p>
                            </div>
                            <div className='dashboard-invoice-column'>
                                <p>Invoice</p>
                            </div>
                            <div className='dashboard-amount-column'>
                                <p>Amount</p>
                            </div>
                            <div className='dashboard-type-column'>
                                <p>Type</p>
                            </div>
                        </div>
                        <div className='dashboard-transaction-divider'></div>
                        <div className='dashboard-history-list'>
                            {historyData.map((item, index) => (
                                <TransactionHistoryItem
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <FloatingButton/>
        </div>
    );
}

export default Dashboard;