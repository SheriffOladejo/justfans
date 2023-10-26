import './TransactionHistoryItem.css';

function TransactionHistoryItem () {
    return (
        <div>
            <div className='historyitem-column-names-container'>
                <div className='historyitem-date-column'>
                    <p>05/09/2023</p>
                </div>
                <div className='historyitem-transaction-column'>
                    <p>New subscription for premium conteint. New subscription for premium conteint</p>
                </div>
                <div className='historyitem-invoice-column'>
                    <p>PDF</p>
                </div>
                <div className='historyitem-amount-column'>
                    <p>#500</p>
                </div>
                <div className='historyitem-type-column'>
                    <div className='historyitem-status'>
                        <div className='historyitem-status-circle-inactive'></div>
                        <p className='historyitem-status-inactive'>Expense</p>
                    </div>
                </div>
            </div>
            <div className='historyitem-divider'></div>
        </div>
    );
}

export default TransactionHistoryItem;