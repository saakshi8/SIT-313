import ArticleCard from "./ArticleCard";

function Articles()
{
    const articles = [
        {
            image: "/article1.png",
            title: "Learning React",
            description: "Understanding React components and how they work.",
            rating: 5,
            author: "Saakshi"
        },
        {
            image: "/article2.jpg",
            title: "Web Development",
            description: "Exploring HTML, CSS and JavaScript for web development.",
            rating: 5,
            author: "Saakshi"
        },
        {
            image: "/article3.jpg",
            title: "Programming Projects",
            description: "Building projects helps improve programming skills.",
            rating: 5,
            author: "Saakshi"
        }
    ];

    return (
        <section className="py-14 px-10 bg-white">

            <h2 className="text-center text-2xl font-serif font-bold text-rose-950 mb-8">
                Featured Articles
            </h2>

            <div className="flex justify-center gap-8">

                {articles.map(function(article)
                {
                    return (
                        <ArticleCard
                            image={article.image}
                            title={article.title}
                            description={article.description}
                            rating={article.rating}
                            author={article.author}
                        />
                    );
                })}

            </div>

            <div className="text-center mt-8">
                <button className="bg-cyan-900 text-white px-5 py-2 rounded">
                    See all articles
                </button>
            </div>

        </section>
    );
}

export default Articles;