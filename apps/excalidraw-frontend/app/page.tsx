import React from 'react';
import { 
  Pencil, 
  Share2, 
  Users, 
  Shapes, 
  Cloud,
  ArrowRight,
  Github
} from 'lucide-react';
import Button from '@repo/ui/Button';
import Link from 'next/link';
// import "@/styles/globals.css";
import './globals.css';


function FeatureCard({ icon: Icon, title, description }: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shapes className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-800">GITDRAW APP</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Docs</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Blog</a>
            <a href="https://github.com" 
               className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Create Beautiful Diagrams with Ease
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A simple yet powerful drawing tool for creating diagrams, wireframes, and illustrations. 
              Perfect for teams and individuals.
            </p>
            <div className="flex space-x-4">
              <Link href="/signin">
                <Button  variant={"primary"} size="lg" className='bg-blue-600'>
                  SignIn
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant={"outline"} size="lg" className='bg-white-600'>
                  SignUp
                </Button>
              </Link>
              
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1000&q=80" 
              alt="Collaborative Drawing" 
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything you need to create amazing diagrams
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Pencil}
              title="Intuitive Drawing"
              description="Simple and powerful drawing tools that feel natural and responsive."
            />
            <FeatureCard 
              icon={Share2}
              title="Easy Sharing"
              description="Share your drawings with a single click. Collaborate in real-time."
            />
            <FeatureCard 
              icon={Users}
              title="Team Collaboration"
              description="Work together with your team in real-time on the same drawing."
            />
            <FeatureCard 
              icon={Cloud}
              title="Cloud Storage"
              description="Your drawings are automatically saved and synced across devices."
            />
            <FeatureCard 
              icon={Shapes}
              title="Rich Components"
              description="Access a wide library of shapes, icons, and pre-made components."
            />
            <FeatureCard 
              icon={Github}
              title="Open Source"
              description="Built with transparency. Contribute and make it better for everyone."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Shapes className="h-8 w-8" />
                <span className="text-2xl font-bold">Excalidraw Clone</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                A simple yet powerful drawing tool for creating diagrams, 
                wireframes, and illustrations.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">GitHub</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Discord</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Excalidraw Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;