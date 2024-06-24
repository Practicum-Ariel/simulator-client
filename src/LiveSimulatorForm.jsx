import { useState } from 'react'
import Checkbox from './Checkbox'
import axios from 'axios'

export default function LiveSimulatorForm({ generators, sensorsTypes, scenarios, handleSuccessMessage, setScenarioId }) {
    const [userScenario, setUserScenario] = useState({
        generator: '1',
        sensorType: 'temperature',
        sensors: [],
        scenario: 'normal',
        durationInMinutes: '1',
        intervalInSeconds: '1'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userScenario.sensors.length === 0) {
            alert('Choose at least one sensor for Live Simulator')
            return
        }
        console.log(userScenario)

        const numOfEvents = (+userScenario.durationInMinutes * 60) / +userScenario.intervalInSeconds
        const scenarioId = axios.post('http://localhost:2700/live/start', {sensorType: userScenario.sensorType, numOfEvents, scenario: userScenario.scenario, interval: userScenario.intervalInSeconds}).then(res => {
            console.log(res.data)
            setScenarioId(res.data)
            if (res.data) handleSuccessMessage('live')
        })
    }

    const setSelectedSens = (sens) => {
        setUserScenario((prev) => ({ ...prev, sensors: [...prev.sensors, sens] }))
    }

    return (
        <section className='live-simulator'>
            <h1>Live simulator</h1>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="generator">Generator</label>
                <select name="generator" id="generator" onChange={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: (e.target.value) }))}>
                    {generators.map(gen => <option value={gen.id} key={gen.id}>{gen.name}</option>)}
                </select>

                <label htmlFor="sensorType">Sensor Type</label>
                <select name="sensorType" id="sensorType" onChange={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: e.target.value, sensors: [] }))} >
                    {Object.keys(sensorsTypes).map(st => <option value={st} key={st}>{st.charAt(0).toUpperCase() + st.slice(1)}</option>)}
                </select>

                <p>Sensors</p>
                {sensorsTypes[userScenario.sensorType].map(sens => {
                    return <div key={sens.toLowerCase()}>
                        <Checkbox sens={sens.toLowerCase()} setSelectedSens={setSelectedSens} />
                        <label htmlFor={sens.toLowerCase()} >{sens}</label>
                    </div>
                })}


                <label htmlFor="scenario">Scenario</label>
                <select name="scenario" id="scenario" onChange={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: e.target.value }))} >
                    {scenarios.map(sc => <option value={sc.toLowerCase()} key={sc.toLowerCase()}>{sc}</option>)}
                </select>

                <label htmlFor="durationInMinutes">Duration (minutes)</label>
                <input type="number" name="durationInMinutes" id="durationInMinutes" min='1' max='60' value={userScenario.durationInMinutes} onInput={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: e.target.value }))} />

                <label htmlFor="intervalInSeconds">Interval (seconds)</label>
                <input type="number" name="intervalInSeconds" id="intervalInSeconds" min='1' max='60' value={userScenario.intervalInSeconds} onInput={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: e.target.value }))} />

                <button type='submit'>Display</button>
            </form>
        </section>
    )
}