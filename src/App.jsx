import { useEffect, useState } from 'react'
import './App.css'
import HistorySimulatorForm from './HistorySimulatorForm'
import LiveSimulatorForm from './LiveSimulatorForm'
import HistorySuccess from './HistorySuccess'
import LiveSuccess from './LiveSuccess'

export default function App() {
  const [isHistorySimulator, setIsHistorySimulator] = useState(false)
  const [isLiveSimulator, setIsLiveSimulator] = useState(false)
  const [isHistorySuccess, setIsHistorySuccess] = useState(false)
  const [isLiveSuccess, setIsLiveSuccess] = useState(false)
  const [scenarioId, setScenarioId] = useState('')

  const generators = [{ name: 'Gen 1', id: '1' }, { name: 'Gen 2', id: '2' }, { name: 'Gen 3', id: '3' }, { name: 'Gen 4', id: '4' }]

  const sensorsTypes = {
    'temperature': ['T1', 'T2', 'T3', 'T4'],
    'vibration': ['V1', 'V2', 'V3', 'V4'],
    'sound': ['S1', 'S2', 'S3', 'S4']
  }

  const scenarios = ['Normal', 'Mild', 'Moderate', 'Severe']

  const chooseSimulator = (simulatorType) => {
    if (simulatorType === 'history') {
      setIsHistorySimulator(true)
      setIsLiveSimulator(false)
      setIsHistorySuccess(false)
      setIsLiveSuccess(false)
    }
    else {
      setIsHistorySimulator(false)
      setIsLiveSimulator(true)
      setIsHistorySuccess(false)
      setIsLiveSuccess(false)
    }
  }

  const handleSuccessMessage = (simulatorName) => {
    setIsLiveSimulator(false)
    setIsHistorySimulator(false)
    if (simulatorName === 'history') {
      setIsHistorySuccess(true)
      setIsLiveSuccess(false)
    } else {
      setIsHistorySuccess(false)
      setIsLiveSuccess(true)
    }
  }

  return (
    <section className="app">
      <h1>Kipat Barzel Simulator</h1>
      <div className="simulators-btns">
        <button onClick={() => chooseSimulator('history')}>History simulator</button>
        <button onClick={() => chooseSimulator('live')}>Live simulator</button>
      </div>

      {isHistorySimulator && <HistorySimulatorForm generators={generators} sensorsTypes={sensorsTypes} scenarios={scenarios} handleSuccessMessage={handleSuccessMessage} />}
      {isLiveSimulator && <LiveSimulatorForm generators={generators} sensorsTypes={sensorsTypes} scenarios={scenarios} handleSuccessMessage={handleSuccessMessage} setScenarioId={setScenarioId} />}
      {isHistorySuccess && <HistorySuccess />}
      {isLiveSuccess && <LiveSuccess scenarioId={scenarioId} />}
    </section>
  )
}