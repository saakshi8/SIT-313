function Subscribe()
{
    return (
        <section className="bg-blue-300 py-3 px-4">

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">

                <h2 className="font-serif font-bold text-xl tracking-wide text-cyan-900">
                    SIGN UP TO MY DEV@DEAKIN
                </h2>

                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-64 h-8 px-2 border border-teal-500 bg-white text-sm"
                />

                <button
                    id="subscribe"
                    type="button"
                    className="h-8 px-4 bg-gray-400 border border-teal-500 text-gray-800 text-sm"
                >
                    Subscribe
                </button>

            </div>

            <p
                id="message"
                className="text-center text-sm mt-2"
            ></p>

        </section>
    );
}

export default Subscribe;