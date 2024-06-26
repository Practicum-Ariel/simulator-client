import axios from 'axios'
import { useState } from 'react'

export default function LiveSuccess({scenarioId}) {
    const apiUrl = import.meta.env.VITE_SERVER_URL

    const [isSimulatorRun, setIsSimulatorRun] = useState(true)
    const handleEndLive = () => {
        axios.post(`${apiUrl}/live/stop`, {scenarioId})
        setIsSimulatorRun(false)
    }

    return (
        <section className='live-success'>
            <h1>Live Simulator is up!</h1>
            <p><span>Keep your simulator live ID:</span> {scenarioId}</p>
            <button onClick={handleEndLive}>End Live Simulator</button>
            {!isSimulatorRun && <p>Simulator Stopped</p>}
        </section>
    )
}
