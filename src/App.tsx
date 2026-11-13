import { ThemeProvider } from './context/ThemeContext'
import Navigation from './components/Navigation'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Timeline from './components/sections/Timeline'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Education from './components/sections/Education'
import Languages from './components/sections/Languages'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Timeline />
          <Skills />
          <Projects />
          <Education />
          <Languages />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
