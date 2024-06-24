import axios from 'axios'

export default function LiveSuccess({scenarioId}) {

    const handleEndLive = () => {
        axios.post('http://localhost:2700/live/stop', {scenarioId}).then(res => console.log(res.data))
    }

    return (
        <section>
            <h1>Live Simulator is up!</h1>
            <h3>Keep your simulator live ID: {scenarioId}</h3>
            <button onClick={handleEndLive}>End Live Simulator</button>
        </section>
    )
}
