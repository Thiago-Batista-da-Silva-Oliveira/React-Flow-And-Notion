import { Route, Routes } from 'react-router-dom'
import { NotionComponent, NotionDomain } from '../components'

export const NotionRoute = (): JSX.Element=> {
    return (
      <Routes>
        <Route path="" element={<NotionDomain />} />
        <Route path="/:id" element={<NotionComponent />} />
      </Routes>

    )
}