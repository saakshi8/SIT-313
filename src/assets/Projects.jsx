import ProjectCard from "./ProjectCard";

function Projects()
{
    return (
        <section
            id="work"
            className="bg-gray-100 py-14 px-10"
        >

            <h2 className="text-center text-2xl font-serif font-bold text-rose-950 mb-10 tracking-wide">
                Here are some of the projects!
            </h2>

            <div className="flex flex-wrap justify-center gap-6">

                <ProjectCard
                    image="/project1.png"
                    title="Gaming Arcade"
                    description="A Gaming arcade built using the SplashKit library in C++."
                    link="https://github.com/saakshi8/Gaming-arcadee"
                />

                <ProjectCard
                    image="/project2.png"
                    title="BMI Calculator"
                    description="An interactive data BMI calculator built with HTML, CSS and JavaScript."
                    link="https://github.com/saakshi8/BMI-calculator"
                />

                <ProjectCard
                    image="/Project3.png"
                    title="Weather App"
                    description="A web interface displaying the weather details when the button is clicked."
                    link="https://github.com/saakshi8/Weather-App"
                />

            </div>

        </section>
    );
}

export default Projects;