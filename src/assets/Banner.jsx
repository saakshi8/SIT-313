function Banner()
{
    return (
        <div className="banner-wrap relative">

            <img
                src="/BannerImage.jpg"
                alt="Banner — coding on a laptop"
                className="w-full h-96 object-cover object-center"
            />

            <div
                className="overlay absolute bottom-0 left-0 w-full
                           bg-rose-500 bg-opacity-60
                           text-white text-center text-2xl font-bold
                           tracking-widest py-5
                           opacity-0 transition-opacity duration-300"
            >
                Hey, I'm Saakshi
            </div>

        </div>
    );
}

export default Banner;