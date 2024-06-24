import { useState } from 'react'


export default function HistorySimulatorForm ({generators, sensorsTypes, scenarios, handleSuccessMessage}) {
    const [userScenario, setUserScenario] = useState({
        generator: '1',
        sensorType: 'temperature',
        scenario: 'normal',
        time: 'day'
      })

      const timeOptions = ['day', 'week', 'month']

      const handleSubmit = (e) => {
        e.preventDefault()
        console.log(userScenario)
        // axios request
        handleSuccessMessage('history')
      }

    return (
        <section className='history-simulator'>
            <h1>History simulator</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="generator">Generator</label>
        <select name="generator" id="generator" onChange={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: (e.target.value) }))}>
          {generators.map(gen => <option value={gen.id} key={gen.id}>{gen.name}</option>)}
        </select>

        <label htmlFor="sensorType">Sensor Type</label>
        <select name="sensorType" id="sensorType" onChange={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: e.target.value }))} >
          {Object.keys(sensorsTypes).map(st => <option value={st} key={st}>{st.charAt(0).toUpperCase() + st.slice(1)}</option>)}
        </select>        

        <label htmlFor="scenario">Scenario</label>
        <select name="scenario" id="scenario" onChange={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: e.target.value }))} >
          {scenarios.map(sc => <option value={sc.toLowerCase()} key={sc.toLowerCase()}>{sc}</option>)}
        </select>

        <label htmlFor="time">Time</label>
        <select name="time" id="time" onChange={(e) => setUserScenario((prev) => ({ ...prev, [e.target.name]: e.target.value }))} >
          {timeOptions.map(time => <option value={time} key={time}>{time}</option>)}
        </select>    

        <button type='submit'>Display</button>
      </form>
      </section>
    )
}