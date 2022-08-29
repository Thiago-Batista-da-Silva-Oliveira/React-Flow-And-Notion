
import { Route, Routes } from 'react-router-dom'
import {Flow, FlowDomain} from '../components'

export const FlowRoute = (): JSX.Element=> {
    return (
      <Routes>
        <Route path="/:id" element={<Flow />} />
        <Route path="/" element={<FlowDomain />} />
      </Routes>

    )
}