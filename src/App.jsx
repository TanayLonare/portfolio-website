import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Github, Linkedin, Mail, ExternalLink, Download, Send } from 'lucide-react';
import { FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiJavascript, SiMysql } from 'react-icons/si';

// Main App Component
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Apply dark class to the html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <div style={{
      backgroundColor: darkMode ? '#111827' : '#f9fafb',
      color: darkMode ? '#f9fafb' : '#111827',
      minHeight: '100vh',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={toggleDarkMode}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
      />
      <Home scrollToSection={scrollToSection} darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Resume darkMode={darkMode} />
      <Contact darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}


// Navbar Component
function Navbar({ darkMode, setDarkMode, menuOpen, setMenuOpen, scrollToSection, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Projects', 'Resume', 'Contact'];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-lg' : ''
    }`} style={{
      backgroundColor: scrolled 
        ? (darkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)')
        : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={scrollToTop}
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:scale-110 transition-transform duration-200 cursor-pointer"
          >
            Portfolio
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => item === 'Home' ? scrollToTop() : scrollToSection(item.toLowerCase())}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                className="text-sm font-medium transition-all duration-200 relative py-2"
                style={{
                  color: activeSection === item.toLowerCase() || (item === 'Home' && activeSection === 'home')
                    ? (darkMode ? '#60a5fa' : '#3b82f6')
                    : (darkMode ? '#e5e7eb' : '#111827'),
                  transform: hoveredItem === item ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                {item}
                <span 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                  style={{
                    width: (activeSection === item.toLowerCase() || (item === 'Home' && activeSection === 'home')) ? '100%' : (hoveredItem === item ? '100%' : '0%')
                  }}
                ></span>
              </button>
            ))}
            <button
              onClick={setDarkMode}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110 hover:rotate-12"
              style={{
                backgroundColor: darkMode ? '#374151' : '#e5e7eb',
                color: darkMode ? '#f9fafb' : '#111827'
              }}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={setDarkMode}
              className="p-2 rounded-lg hover:scale-110 hover:rotate-12 transition-all duration-200"
              style={{
                backgroundColor: darkMode ? '#374151' : '#e5e7eb',
                color: darkMode ? '#f9fafb' : '#111827'
              }}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="p-2 hover:scale-110 transition-transform duration-200"
              style={{ color: darkMode ? '#f9fafb' : '#111827' }}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t" style={{
          backgroundColor: darkMode ? '#111827' : '#ffffff',
          borderColor: darkMode ? '#374151' : '#e5e7eb'
        }}>
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => item === 'Home' ? scrollToTop() : scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
                style={{
                  backgroundColor: activeSection === item.toLowerCase() || (item === 'Home' && activeSection === 'home')
                    ? '#3b82f6'
                    : (darkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(243, 244, 246, 0.5)'),
                  color: activeSection === item.toLowerCase() || (item === 'Home' && activeSection === 'home')
                    ? '#ffffff'
                    : (darkMode ? '#e5e7eb' : '#111827')
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// Home Component with Typing Effect
function Home({ scrollToSection, darkMode }) {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "I build amazing web experiences";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      paddingTop: '4rem',
      backgroundColor: darkMode ? '#111827' : '#f9fafb',
      transition: 'background-color 0.3s'
    }}>
      <ScrollAnimation>
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold">
              TL
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: darkMode ? '#fff' : '#111827' }}>
            Hi, I'm <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Tanay Lonare
            </span>
          </h1>
          <div className="text-2xl md:text-3xl mb-8 h-12" style={{ color: darkMode ? '#e5e7eb' : '#374151' }}>
            {text}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
          </div>
          <p className="text-lg mb-12 max-w-2xl mx-auto" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
            Full Stack Developer | UI/UX Enthusiast | Problem Solver
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-all duration-200"
            >
              Get In Touch
            </button>
          </div>
          <div className="flex gap-6 justify-center mt-12">
            <a href="https://github.com/TanayLonare" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-all duration-200 transform hover:scale-110 text-gray-900 dark:text-white">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/tanay-lonare1/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-all duration-200 transform hover:scale-110 text-gray-900 dark:text-white">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:tanaylonare1@gmail.com" className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-all duration-200 transform hover:scale-110 text-gray-900 dark:text-white">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
}

// About Component
function About({ darkMode }) {
  const skills = [
    { name: 'React', icon: <FaReact className="w-12 h-12" /> },
    { name: 'JavaScript', icon: <SiJavascript className="w-12 h-12" /> },
    { name: 'HTML', icon: <FaHtml5 className="w-12 h-12" /> },
    { name: 'CSS', icon: <FaCss3Alt className="w-12 h-12" /> },
    { name: 'SQL', icon: <SiMysql className="w-12 h-12" /> }
  ];

  return (
    <section id="about" style={{
      minHeight: '100vh',
      padding: '5rem 1rem',
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      transition: 'background-color 0.3s'
    }}>
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: darkMode ? '#fff' : '#111827' }}>
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-16"></div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollAnimation delay={200}>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                I'm a passionate Full Stack Developer with a love for creating beautiful, functional web applications. 
                As a fresher, I'm eager to apply my knowledge and skills to real-world projects and continue learning.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                I believe in writing clean, maintainable code and staying up-to-date with the latest technologies. 
                When I'm not coding, you can find me exploring new frameworks, working on personal projects, or learning something new.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: darkMode ? '#fff' : '#111827' }}>My Skills</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="group relative rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                    style={{
                      background: darkMode 
                        ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
                        : 'linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%)'
                    }}
                  >
                    <div className="text-center">
                      <div 
                        className="mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                        style={{ 
                          color: darkMode ? '#60a5fa' : '#3b82f6'
                        }}
                      >
                        {skill.icon}
                      </div>
                      <h4 className="font-bold text-lg" style={{ color: darkMode ? '#fff' : '#111827' }}>{skill.name}</h4>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

// Projects Component
function Projects({ darkMode }) {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      link: '#',
      github: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, drag-and-drop interface, and team features.',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      link: '#',
      github: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather application with location-based forecasts, interactive maps, and detailed analytics.',
      technologies: ['React', 'OpenWeather API', 'Chart.js'],
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
      link: '#',
      github: '#'
    }
  ];

  return (
    <section id="projects" style={{
      minHeight: '100vh',
      padding: '5rem 1rem',
      backgroundColor: darkMode ? '#111827' : '#f9fafb',
      transition: 'background-color 0.3s'
    }}>
      <div className="max-w-7xl mx-auto">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: darkMode ? '#fff' : '#111827' }}>
            My Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-center mb-16 max-w-2xl mx-auto" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollAnimation key={index} delay={index * 200}>
              <ProjectCard project={project} darkMode={darkMode} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, darkMode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      style={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4 flex gap-3">
            <a
              href={project.link}
              className="flex-1 bg-white text-gray-900 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
            <a
              href={project.github}
              className="flex-1 bg-gray-800 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2" style={{ color: darkMode ? '#fff' : '#111827' }}>{project.title}</h3>
        <p className="mb-4" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.2)' : '#dbeafe',
                color: darkMode ? '#60a5fa' : '#2563eb'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Resume({ darkMode }) {
  return (
    <section id="resume" style={{
      minHeight: '100vh',
      padding: '5rem 1rem',
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      transition: 'background-color 0.3s'
    }}>
      <div className="max-w-4xl mx-auto text-center">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: darkMode ? '#fff' : '#111827' }}>
            Resume
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-lg mb-12" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
            Download my resume to learn more about my experience, skills, and achievements
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={200}>
          <div className="relative rounded-2xl p-8 md:p-12 shadow-2xl mx-auto max-w-2xl" style={{
            background: darkMode 
              ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
              : 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
            border: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb'
          }}>
            <div className="relative mb-8">
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <Download className="w-16 h-16 md:w-20 md:h-20 text-white animate-bounce" style={{ animationDuration: '2s' }} />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: darkMode ? '#fff' : '#111827' }}>
              Tanay Lonare
            </h3>
            <p className="text-lg mb-2" style={{ color: darkMode ? '#60a5fa' : '#3b82f6' }}>
              Full Stack Developer
            </p>
            <p className="mb-8 text-base" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
              View my complete professional background, technical skills, and project portfolio
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-2xl transform hover:scale-105 transition-all duration-200 text-lg"
            >
              <Download className="w-6 h-6" />
              Download Resume
            </a>
            
            <div className="mt-6 flex items-center justify-center gap-2" style={{ color: darkMode ? '#6b7280' : '#9ca3af' }}>
              <span className="text-sm">PDF Format</span>
              <span className="text-sm">•</span>
              <span className="text-sm">250 KB</span>
            </div>

            <div className="absolute top-4 right-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={400}>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105" style={{ 
              backgroundColor: darkMode ? '#374151' : '#f9fafb',
              border: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb'
            }}>
              <div className="text-4xl mb-3">🎓</div>
              <h4 className="font-bold mb-2 text-lg" style={{ color: darkMode ? '#fff' : '#111827' }}>Education</h4>
              <p className="text-sm" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Bachelor of Technology (B.Tech.)</p>
            </div>
            
            <div className="p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105" style={{ 
              backgroundColor: darkMode ? '#374151' : '#f9fafb',
              border: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb'
            }}>
              <div className="text-4xl mb-3">💼</div>
              <h4 className="font-bold mb-2 text-lg" style={{ color: darkMode ? '#fff' : '#111827' }}>Status</h4>
              <p className="text-sm" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Fresher & Job Ready</p>
            </div>

            <div className="p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105" style={{ 
              backgroundColor: darkMode ? '#374151' : '#f9fafb',
              border: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb'
            }}>
              <div className="text-4xl mb-3">🚀</div>
              <h4 className="font-bold mb-2 text-lg" style={{ color: darkMode ? '#fff' : '#111827' }}>Available</h4>
              <p className="text-sm" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Open to Opportunities</p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

// Contact Component
function Contact({ darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(false);
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contact" style={{
      minHeight: '100vh',
      padding: '5rem 1rem',
      backgroundColor: darkMode ? '#111827' : '#f9fafb',
      transition: 'background-color 0.3s'
    }}>
      <div className="max-w-4xl mx-auto">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: darkMode ? '#fff' : '#111827' }}>
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-center mb-12" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
            Have a project in mind? Let's work together to bring your ideas to life
          </p>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-8">
          <ScrollAnimation delay={200}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6" style={{ color: darkMode ? '#fff' : '#111827' }}>
                Let's Connect
              </h3>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.2)' : '#dbeafe' }}>
                  <Mail className="w-6 h-6" style={{ color: darkMode ? '#60a5fa' : '#2563eb' }} />
                </div>
                <div>
                  <h4 className="font-medium" style={{ color: darkMode ? '#fff' : '#111827' }}>Email</h4>
                  <a href="mailto:tanaylonare1@gmail.com" className="hover:underline" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>tanaylonare1@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: darkMode ? 'rgba(168, 85, 247, 0.2)' : '#f3e8ff' }}>
                  <Linkedin className="w-6 h-6" style={{ color: darkMode ? '#a78bfa' : '#9333ea' }} />
                </div>
                <div>
                  <h4 className="font-medium" style={{ color: darkMode ? '#fff' : '#111827' }}>LinkedIn</h4>
                  <a href="https://www.linkedin.com/in/tanay-lonare1/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>linkedin.com/in/tanay-lonare1</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7' }}>
                  <Github className="w-6 h-6" style={{ color: darkMode ? '#4ade80' : '#16a34a' }} />
                </div>
                <div>
                  <h4 className="font-medium" style={{ color: darkMode ? '#fff' : '#111827' }}>GitHub</h4>
                  <a href="https://github.com/TanayLonare" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>github.com/TanayLonare</a>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitted && (
                <div className="p-4 rounded-lg" style={{ 
                  backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7',
                  color: darkMode ? '#4ade80' : '#16a34a'
                }}>
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: darkMode ? '#d1d5db' : '#374151' }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
                  style={{
                    borderColor: errors.name ? '#ef4444' : (darkMode ? '#4b5563' : '#d1d5db'),
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    color: darkMode ? '#fff' : '#111827'
                  }}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: darkMode ? '#d1d5db' : '#374151' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
                  style={{
                    borderColor: errors.email ? '#ef4444' : (darkMode ? '#4b5563' : '#d1d5db'),
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    color: darkMode ? '#fff' : '#111827'
                  }}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: darkMode ? '#d1d5db' : '#374151' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
                  style={{
                    borderColor: errors.message ? '#ef4444' : (darkMode ? '#4b5563' : '#d1d5db'),
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    color: darkMode ? '#fff' : '#111827'
                  }}
                  placeholder="Your message..."
                />
                {errors.message && <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer({ darkMode }) {
  return (
    <footer className="border-t py-8 transition-colors duration-300" style={{
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      borderColor: darkMode ? '#374151' : '#e5e7eb'
    }}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
          © 2025 Tanay Lonare. All rights reserved.
        </p>
        <p className="text-sm mt-2" style={{ color: darkMode ? '#6b7280' : '#9ca3af' }}>
          Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}

// Scroll Animation Component
function ScrollAnimation({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
}