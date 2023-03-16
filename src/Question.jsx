export default function Question(props) {
    const answerElement = props.details.answers.map((answer, index) => {
        const styles = {
            backgroundColor: props.details.selected[index] ? "#D6DBF5" : "#F5F7FB",
        }
        return <div key={index} style={styles} className="answer" onClick={() => props.selectAnswer(props.details.id, index)}>{answer}</div>
})
    return (
        <div className="question">
            <h1>{(props.details.question).replace(/&quot;/gi,'"').replace(/&#039;/gi, "'")}</h1>
            <div className="answer-choices">
                {answerElement}
            </div>
        </div>
    )
}