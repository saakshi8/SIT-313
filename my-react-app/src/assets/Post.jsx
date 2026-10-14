
import { useState } from "react";

function Post()
{
    const [postType, setPostType] = useState("question");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [abstract, setAbstract] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        const tagList = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");

        if (!title.trim() || !description.trim())
        {
            alert("Please fill in the required fields.");
            return;
        }

        if (postType === "article" && !abstract.trim())
        {
            alert("Please enter an abstract.");
            return;
        }

        if (tagList.length > 3)
        {
            alert("Please enter a maximum of 3 tags.");
            return;
        }

        alert("Your post has been sent successfully!");

        setTitle("");
        setDescription("");
        setAbstract("");
        setTags("");
    };

    return (
        <div className="min-h-screen bg-emerald-100 p-8">

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">

                <h1 className="bg-gray-200 font-bold px-3 py-2 mb-4">
                    New Post
                </h1>

                <div className="flex gap-6 mb-6">
                    <span>Select Post Type:</span>

                    <label>
                        <input
                            type="radio"
                            name="postType"
                            checked={postType === "question"}
                            onChange={() => {
                                setPostType("question");
                                setDescription("");
                                setAbstract("");
                            }}
                        />
                        {" "}Question
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="postType"
                            checked={postType === "article"}
                            onChange={() => {
                                setPostType("article");
                                setDescription("");
                                setAbstract("");
                            }}
                        />
                        {" "}Article
                    </label>
                </div>

                <h2 className="bg-gray-200 font-bold px-3 py-2 mb-4">
                    What do you want to ask or share
                </h2>

                <p className="text-sm text-gray-600 mb-6">
                    This section changes depending on the type of post selected.
                </p>

                <form onSubmit={handleSubmit}>

                    <label className="block mb-2">Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={
                            postType === "question"
                                ? "Start your question with how, what, why, etc."
                                : "Enter a descriptive title"
                        }
                        className="w-full border border-gray-300 p-2 rounded mb-5"
                    />

                    {postType === "question" ? (
                        <>
                            <label className="block mb-2">
                                Describe your problem
                            </label>

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="8"
                                className="w-full border border-gray-300 p-2 rounded mb-5"
                            />
                        </>
                    ) : (
                        <>
                            <label className="block mb-2">Abstract</label>

                            <textarea
                                value={abstract}
                                onChange={(e) => setAbstract(e.target.value)}
                                placeholder="Enter a 1-paragraph abstract"
                                rows="3"
                                className="w-full border border-gray-300 p-2 rounded mb-5"
                            />

                            <label className="block mb-2">
                                Article Text
                            </label>

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="6"
                                className="w-full border border-gray-300 p-2 rounded mb-5"
                            />
                        </>
                    )}

                    <label className="block mb-2">Tags</label>

                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Add up to 3 tags, separated by commas, e.g. Java"
                        className="w-full border border-gray-300 p-2 rounded mb-6"
                    />

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-rose-400 text-white px-10 py-2 rounded hover:bg-rose-500"
                        >
                            Post
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
}

export default Post;