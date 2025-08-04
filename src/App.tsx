import BalanceCard from './components/BalanceCard'
import TransactionList from './components/TransactionList'
import Backdrop from './components/Backdrop';
import { setInitialTransactions } from './signals/transactionsSignal';
import { currencySignal, currentBalance, fetchWalletBalance } from './signals/currentBalanceSignal';
import { useSignals } from '@preact/signals-react/runtime';
import { useEffect } from 'react';
import DepositModal from './components/DepositModal';

function App() {
  useEffect(() => {
    setInitialTransactions()
    fetchWalletBalance()
  }, [])
  useSignals();
  return (
      <>
      <div className="border-1 border-zinc-400 rounded-2xl p-4 mx-4">
        <Backdrop>
          <DepositModal />
        </Backdrop>
        <div className="flex-row justify-between lg:gap-8 lg:flex">
          <BalanceCard 
            balance={currentBalance.value} 
            currency={currencySignal.value} 
            />
          <TransactionList/>
        </div>
      </div>
      </>
  )
}

export default App
