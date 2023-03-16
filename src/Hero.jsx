export default function Hero(props) {
    return (
        <div className="hero-page">
            <h1>Quizzical</h1>
            <p>Offer a wide range of quizzes, from general knowledge to subject-specific quizzes such as science, history, mathematics, and more.</p>
            <button className="start-button" onClick={props.start}>Start Quiz!</button>
        </div>
    )
}