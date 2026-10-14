function Gallery()
{
    return (
        <section className="py-14 px-10">

            <hr className="w-24 border-t-2 border-gray-200 mx-auto mb-8" />

            <h2 className="text-center text-2xl font-serif font-bold text-rose-950 mb-8 tracking-wide">
                My Photo gallery!
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

                <img src="/image1.jpeg" alt="image 1" className="w-full h-48 object-cover rounded-lg" />
                <img src="/image2.jpeg" alt="image 2" className="w-full h-48 object-cover rounded-lg" />
                <img src="/image3.jpeg" alt="image 3" className="w-full h-48 object-cover rounded-lg" />
                <img src="/image4.jpeg" alt="image 4" className="w-full h-48 object-cover rounded-lg" />
                <img src="/image5.jpeg" alt="image 5" className="w-full h-48 object-cover rounded-lg" />
                <img src="/image6.jpeg" alt="image 6" className="w-full h-48 object-cover rounded-lg" />
                <img src="/image7.jpeg" alt="image 7" className="w-full h-48 object-cover rounded-lg" />
                <img src="/image8.jpeg" alt="image 8" className="w-full h-48 object-cover rounded-lg" />

            </div>

        </section>
    );
}

export default Gallery;