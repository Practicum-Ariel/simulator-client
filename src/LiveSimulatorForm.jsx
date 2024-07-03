import { useState } from 'react'
// import Checkbox from './Checkbox'
import axios from 'axios'
import capitalizeFirstLetter from './helpers'

export default function LiveSimulatorForm({ generators, sensorsTypes, scenarios, handleSuccessMessage, setScenarioId }) {

    const apiUrl = import.meta.env.VITE_SERVER_URL

    const [userScenario, setUserScenario] = useState({
        generator: '1',
        temperature: 'normal',
        vibration: 'normal',
        sound: 'normal',
        // sensors: [],
        // scenario: 'normal',
        durationInMinutes: 1,
        intervalInSeconds: 1
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(userScenario)
        // if (userScenario.sensors.length === 0) {
        //     alert('Choose at least one sensor for Live Simulator')
        //     return
        // }

        const numOfEvents = (userScenario.durationInMinutes * 60) / userScenario.intervalInSeconds
        const scenarioId = axios.post(`${apiUrl}/live/start`, { temperature: userScenario.temperature, vibration: userScenario.vibration, sound: userScenario.sound, numOfEvents, interval: userScenario.intervalInSeconds }).then(res => {
            setScenarioId(res.data)
            if (res.data) handleSuccessMessage('live')
        })
    }

    // const setSelectedSens = (sens) => {
    //     setUserScenario((prev) => ({ ...prev, sensors: [...prev.sensors, sens] }))
    // }

    return (
        <section className='live-simulator'>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="generator">Generator</label>
                <select name="generator" id="generator" onChange={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: (e.target.value) }))}>
                    {generators.map(gen => <option value={gen.id} key={gen.id}>{gen.name}</option>)}
                </select>

                {/* <label htmlFor="scenarios">Scenario per sensor type</label> */}
                <section className="sensors-scenarios">
                    {Object.keys(sensorsTypes).map(st =>
                        <div className='scenario' key={st}>
                            <p htmlFor={st}>{capitalizeFirstLetter(st)}</p>
                            <select name={st} id={st} value={userScenario[st]} onChange={(e) => setUserScenario(prev => ({ ...prev, [e.target.name]: e.target.value.toLowerCase() }))}>
                                {scenarios.map(sc => <option key={sc}>{capitalizeFirstLetter(sc)}</option>)}
                            </select>
                        </div>)}
                </section>

                {/* <label htmlFor="sensorType">Sensor Type</label>
                <select name="sensorType" id="sensorType" onChange={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: e.target.value, sensors: [] }))} >
                    {Object.keys(sensorsTypes).map(st => <option value={st} key={st}>{st.charAt(0).toUpperCase() + st.slice(1)}</option>)}
                </select> */}

                {/* <label>Sensors</label>
                <div className="sensors">
                    {sensorsTypes[userScenario.sensorType].map(sens => {
                        return <div key={sens.toLowerCase()}>
                            <Checkbox sens={sens.toLowerCase()} setSelectedSens={setSelectedSens} />
                            <label htmlFor={sens.toLowerCase()} >{sens}</label>
                        </div>
                    })}
                </div> */}


                {/* <label htmlFor="scenario">Scenario</label>
                <select name="scenario" id="scenario" onChange={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: e.target.value }))} >
                    {scenarios.map(sc => <option value={sc.toLowerCase()} key={sc.toLowerCase()}>{sc}</option>)}
                </select> */}

                <div className="duration">
                    <label htmlFor="durationInMinutes">Duration (minutes)</label>
                    <input type="number" name="durationInMinutes" id="durationInMinutes" min='1' max='60' value={userScenario.durationInMinutes} onInput={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: +e.target.value }))} />
                </div>

                <div className="interval">
                    <label htmlFor="intervalInSeconds">Interval (seconds)</label>
                    <input type="number" name="intervalInSeconds" id="intervalInSeconds" min='1' max='60' value={userScenario.intervalInSeconds} onInput={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: +e.target.value }))} />
                </div>

                <button type='submit'>Display</button>
            </form>
        </section>
    )
}