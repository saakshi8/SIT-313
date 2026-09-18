import TutorialCard from "./TutorialCard";

function Tutorials()
{
    let tutorials = [
        {
            image: "/tutorial1.jpg",
            title: "Learn React Basics",
            description: "Learn the basics of React.",
            rating: "4.5",
            username: "Saakshi"
        },
        {
            image: "/tutorial2.png",
            title: "ReactJS Tutorial",
            description: "Learn React JS fundamentals.",
            rating: "4.7",
            username: "Alex"
        },
        {
            image: "/tutorial3.png",
            title: "ExpressJS ",
            description: "Learn the basics of ExpressJS.",
            rating: "4.8",
            username: "John"
        }
    ];

    return (
         <section className="py-14 px-10 ">
            <h2 className="text-center text-2xl font-serif font-bold text-rose-950 mb-8">
                Featured Tutorials</h2>

            <div className="flex justify-center gap-8 ">
                {tutorials.map(function(tutorial)
                {
                    return (
                        <TutorialCard
                            image={tutorial.image}
                            title={tutorial.title}
                            description={tutorial.description}
                            rating={tutorial.rating}
                            username={tutorial.username}
                        />
                    );
                })}
            </div>
             <div className="text-center mt-8">
                <button className="bg-cyan-900 text-white px-5 py-2 rounded">
                    See all tutorials
                </button>
            </div>

            </section>
           
    );
}

export default Tutorials;