function Footer() {
    return (
        <footer id="contact" className="w-full">


            {/* MAIN FOOTER */}
            <div className="bg-cyan-700 text-black px-8 py-6">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* EXPLORE */}
                    <div>
                        <h3 className="font-bold text-xl mb-3">
                            Explore
                        </h3>

                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="hover:underline">
                                    Home
                                </a>
                            </li>

                            <li>
                                <a href="/questions" className="hover:underline">
                                    Questions
                                </a>
                            </li>

                            <li>
                                <a href="/articles" className="hover:underline">
                                    Articles
                                </a>
                            </li>

                            <li>
                                <a href="/tutorials" className="hover:underline">
                                    Tutorials
                                </a>
                            </li>
                        </ul>
                    </div>


                    {/* SUPPORT */}
                    <div>
                        <h3 className="font-bold text-xl mb-3">
                            Support
                        </h3>

                        <ul className="space-y-2">
                            <li>
                                <a href="/faqs" className="hover:underline">
                                    FAQs
                                </a>
                            </li>

                            <li>
                                <a href="/help" className="hover:underline">
                                    Help
                                </a>
                            </li>

                            <li>
                                <a href="/contact" className="hover:underline">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>


                    {/* SOCIAL MEDIA */}
                    <div>
                        <h3 className="font-bold text-xl mb-3">
                            Stay connected
                        </h3>

                        <div className="flex gap-3">

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-gray-500 text-white px-3 py-1 rounded font-bold hover:bg-gray-600"
                            >
                                f
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-gray-500 text-white px-3 py-1 rounded font-bold hover:bg-gray-600"
                            >
                                ♥
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-gray-500 text-white px-3 py-1 rounded font-bold hover:bg-gray-600"
                            >
                                ◎
                            </a>

                        </div>
                    </div>

                </div>


                {/* COPYRIGHT */}
                <div className="text-center mt-8">

                    <h3 className="font-bold text-xl">
                        DEV@Deakin 2026
                    </h3>

                    <div className="flex justify-center gap-12 mt-2 text-sm">
                        <a href="/privacy" className="hover:underline">
                            Privacy Policy
                        </a>

                        <a href="/terms" className="hover:underline">
                            Terms
                        </a>

                        <a href="/conduct" className="hover:underline">
                            Code of Conduct
                        </a>
                    </div>

                </div>

            </div>
        </footer>
    );
}

export default Footer;
