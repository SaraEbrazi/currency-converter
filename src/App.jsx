/** @format */

import { useState,useEffect } from 'react';
import ResultModal from './Components/ResultModal';


function App () {
    const [ amount,setAmount ] = useState( 0 );
    const [ usdRate,setUsdRate ] = useState( 0 );

    const [ showModal,setShowModal ] = useState( false );

    const [ fromCurrency,setFromCurrency ] = useState( 'USD' );
    const [ toCurrency,setToCurrency ] = useState( 'IRR' );
    const [ result,setResult ] = useState( 0 );

    const currencies = {
        USD: {
            name: "US Dollar",
            flag: "🇺🇸",
            symbol: "$",
        },
        IRR: {
            name: "Iranian Rial",
            flag: "🇮🇷",
            symbol: "﷼",
        },
    };

    const handleConvert = () => {

        let convertedAmount;
        if( fromCurrency === 'USD' && toCurrency === 'IRR' ) {
            convertedAmount = Number( amount ) * usdRate * 10;
        } else if( fromCurrency === 'IRR' && toCurrency === 'USD' ) {
            convertedAmount = Number( amount ) / usdRate;
        }
        else if( fromCurrency === toCurrency ) {
            convertedAmount = Number( amount );
        }
        setResult( convertedAmount );
        setShowModal( true );
    };

    useEffect( () => {
        const fetchRates = async () => {
            try {
                const response = await fetch(
                    'https://nerkhara.com/api/v1/latest/usd.json',
                    {
                        method: 'GET',
                        cache: 'no-store',
                    },
                );

                // console.log( 'Status:',response.status );

                const data = await response.json();
                setUsdRate( data.item.price );

                console.log( 'API DATA:',data );
            } catch( error ) {
                console.log( error );
            }
        };
        fetchRates();
    },[] );

    return (
        <div className='min-h-screen bg-[linear-gradient(37deg,_rgba(72,_42,_155,_1)_0%,_rgba(152,_130,_217,_1)_50%,_rgba(221,_197,_235,_1)_100%)]

 flex items-center justify-center p-4'>
            <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-lg '>
                <h1 className='mb-6 text-center text-2xl font-bold text-gray-800'>
                    Currency Converter
                </h1>

                <form className='space-y-5'>
                    <div>
                        <label className='mb-2 block text-sm font-medium text-gray-700'>
                            Amount
                        </label>
                        <input
                            value={amount}
                            onChange={( e ) => setAmount( e.target.value )}
                            type='number'
                            placeholder='Enter amount'
                            className='w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                        />
                    </div>

                    <div>
                        <label className='mb-2 block text-sm font-medium text-gray-700'>
                            From
                        </label>
                        <select
                            value={fromCurrency}
                            onChange={( e ) => setFromCurrency( e.target.value )}
                            className='appearance-auto w-full rounded-lg border border-gray-300 bg-white p-3 outline-none focus:border-indigo-500'>
                            <option value='USD'>🇺🇸 - US Dollar</option>
                            <option value='IRR'>🇮🇷 - Iran Rials</option>
                        </select>
                    </div>

                    <div>
                        <label className='mb-2 block text-sm font-medium text-gray-700'>
                            To
                        </label>
                        <select
                            value={toCurrency}
                            onChange={( e ) => setToCurrency( e.target.value )}
                            className='appearance-auto w-full rounded-lg border border-gray-300 bg-white p-3 outline-none focus:border-indigo-500'>
                            <option value='IRR'>🇮🇷 - Iran Rial</option>
                            <option value='USD'>🇺🇸 - US Dollar</option>
                        </select>
                    </div>





                </form>

                {showModal && (
                    <ResultModal
                        usdRate={usdRate}
                        amount={amount}
                        result={result}
                        fromCurrency={fromCurrency}
                        toCurrency={toCurrency}
                        currencies={currencies}
                        onClose={() => setShowModal( false )} />
                )}
                <button
                    type='button'
                    onClick={handleConvert}
                    className='w-full rounded-lg mt-3 bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-700'>
                    Convert
                </button>
            </div>
        </div>
    );
}

export default App;
