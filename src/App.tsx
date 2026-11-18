import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/About'
import { HomePage } from './pages/Home'
import { LessonPage } from './pages/LessonPage'
import { NotFoundPage } from './pages/NotFound'
import { ScoresPage } from './pages/Scores'
import { SubjectPage } from './pages/SubjectPage'
import { VocabIndexPage } from './pages/VocabIndex'
import { WeakPointsPage } from './pages/WeakPoints'
import { WrongBookPage } from './pages/WrongBook'
import { StoreProvider } from './state'

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="subject/:subjectId" element={<SubjectPage />} />
          <Route path="vocab" element={<VocabIndexPage />} />
          <Route path="vocab/:unitId" element={<LessonPage />} />
          <Route path="lesson/:lessonId" element={<LessonPage />} />
          <Route path="wrong-book" element={<WrongBookPage />} />
          <Route path="weak-points" element={<WeakPointsPage />} />
          <Route path="scores" element={<ScoresPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </StoreProvider>
  )
}
