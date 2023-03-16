export default function Result(props) {
    const answerElement = props.details.answers.map((answer, index) => {
        let color, border, weight, opacity
        if (props.details.correct_answer === answer) {
            color = "#94D7A2"
            border = "none"
            weight = "500"
        } else {
            if (props.details.selected[index]) {
                color = "#F8BCBC"
                border = "none"
                opacity = "60%"
            } else {
                color = "#F5F7FB"
                opacity = "50%"
            }
        }
        const styles = {
            backgroundColor: color,
            border: border,
            fontWeight: weight,
            opacity: opacity
        }
        return <div key={index} style={styles} className="answer-result">{answer}</div>
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