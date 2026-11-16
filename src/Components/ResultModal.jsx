import { ArrowRightIcon } from "lucide-react";

function ResultModal ( { amount,result,onClose,fromCurrency,toCurrency,currencies,usdRate } ) {
    return (
        <div>
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">

                <div className="grid items-center gap-5 bg-white rounded-2xl p-6 w-full max-w-md max-h-md">

                    <h2 className="text-xl text-center font-bold mb-4">
                        Conversion Result
                    </h2>

                    <div className="flex justify-center align-middle">
                        <p className="text-3xl mb-4 ">{currencies[ fromCurrency ].flag} </p>

                        <span>{<ArrowRightIcon size={24} />}</span>

                        <p className="text-3xl mb-4 "> {currencies[ toCurrency ].flag}</p>
                    </div>


                    <div className="flex justify-between align-middle  rounded-lg  m-2">
                        <p className="text-2xl font-bold text-green-600 mb-2 text-center">
                            {amount}
                        </p>

                        <hr className="w-full h-9px bg-black mt-9" />

                        <p className=" front-bold text-slate-900">
                            {fromCurrency}
                        </p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-xl font-bold text-green-600">
                            {usdRate}
                        </p>

                        <p className="font-bold text-zinc-400 text-xl">
                            Exchange Rate
                        </p>


                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-4xl font-bold text-green-600">
                            {Number( result ).toLocaleString( "en-US" )}
                        </p>

                        <p className="font-bold text-zinc-700 text-4xl">
                            {toCurrency}
                        </p>
                    </div>

                    <div className="flex justify-center align-middle">
                        <button
                            onClick={onClose}
                            className="bg-purple-800 text-white px-6 py-2 rounded-lg "
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultModal;
