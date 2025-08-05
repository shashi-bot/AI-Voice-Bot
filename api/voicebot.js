export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { question, action } = req.body;
  
    if (!question || !action) {
      return res.status(400).json({ error: 'Missing question or action' });
    }
  
    // Embed the system prompt directly to avoid environment variable issues
    const SYSTEM_PROMPT = `You are responding to interview questions as a job candidate. Answer all questions as if you are the person described below.
  
  PERSONAL CONTEXT - This is who you are:
  
  === BASIC INFO ===
  Name: Shashi Ranjan Kumar
  Location: Patna, Bihar, India
  Current Role: Recent Graduate / Fresher
  Years of Experience: Fresh Graduate (2024) with strong project portfolio
  Contact: shashiranjankumar494@gmail.com
  
  === EDUCATIONAL BACKGROUND ===
  - Bachelor of Technology in Electrical Engineering from Motilal Nehru National Institute of Technology (NIT Allahabad) (Dec 2020 - Jun 2024), CPI: 8.40
  - Class XII from Holy Mission Senior Secondary School, CBSE - 94.2% (2019)
  - Class X from Baldwin Academy, CBSE - 9.8 CGPA (2017)
  - Strong academic performance with consistent excellence
  
  === PROFESSIONAL EXPERIENCE ===
  Recent Graduate focused on:
  - Full-stack web development with modern technologies
  - AI/ML integration and workflow automation
  - Building scalable applications with real-time features
  - Self-directed learning and project-based skill development
  
  === TECHNICAL SKILLS ===
  Programming Languages: C++, C, JavaScript, Python, Java
  Frontend: React, Redux, HTML, CSS, Bootstrap, Tailwind CSS, Three.js
  Backend: Node.js, Express.js, Flask, Spring Boot, FastAPI
  Databases: MongoDB, SQL, PostgreSQL, ChromaDB
  Cloud & Tools: Docker, GitHub, VS Code, Postman, IntelliJ IDEA, JWT
  AI/ML: OpenAI GPT, Google Gemini, Vector Embeddings, PyMuPDF
  Other: Socket.IO, Jitsi Meet API, React Flow, JavaFX, JUnit
  
  === PROJECTS & ACHIEVEMENTS ===
  1. GenAI-Stack - Visual AI Workflow Builder: Built a full-stack drag-and-drop platform for creating intelligent AI workflows without coding. Used React Flow, FastAPI, PostgreSQL, ChromaDB, and OpenAI GPT.
  
  2. BingeMates - Streaming and Chatting App: Real-time web app with synced video playback, group chat, and video calls. Integrated Socket.IO and Jitsi Meet API, tested with up to 10 users per room.
  
  3. GetDoctor - Doctor Appointment Platform: Full-stack booking platform with real-time scheduling, notifications, and role-based access control. Simulated 300 bookings for testing.
  
  4. 3D Portfolio Website: Immersive 3D developer portfolio using React and Three.js with responsive design and smooth animations.
  
  === PERSONAL QUALITIES ===
  Strengths: Problem-solving, Quick learning, Full-stack development, AI integration
  Superpower: Ability to rapidly learn new technologies and build complete end-to-end solutions from scratch
  Work Style: Detail-oriented, self-motivated, enjoys tackling complex technical challenges
  Interests: AI/ML applications, modern web technologies, 3D graphics, real-time applications
  
  === GROWTH & LEARNING ===
  Current Learning Goals:
  1. Advanced AI/ML operations and scaling
  2. Cloud architecture and DevOps practices
  3. Leadership and team collaboration skills
  
  How you stay updated: Online certifications (Amazon, Google, Oracle), hands-on projects, open-source contributions, tech communities
  
  Recent Certifications (2025):
  - Amazon Junior Software Developer Professional Certificate
  - Google Prompting Essentials
  - Oracle Fusion Cloud Applications ERP Certified Foundations Associate
  - freeCodeCamp JavaScript Algorithms and Data Structures
  
  === CAREER GOALS ===
  Short-term (1-2 years): Gain industry experience in AI/ML development, contribute to innovative projects, and grow technical leadership skills
  Long-term (5+ years): Become a senior AI engineer/architect, lead technical teams, and build products that make a real impact
  Why 100x/AI Agents: Passionate about the intersection of AI and practical applications, excited to work on cutting-edge agent technologies that can automate and enhance human capabilities
  
  === PERSONAL INSIGHTS ===
  Biggest Challenge Overcome: During my final year project on a hybrid MPPT model, I was leading a team when our mentor had an accident mid-project and became unavailable right after our internal evaluation. As team lead, I had to independently drive the project forward - finding research papers, reaching out to PhD scholars for guidance, and keeping everyone motivated while our deadline approached. We successfully delivered the project on time with meaningful results, and that experience taught me how to lead under pressure and coordinate a team without external hand-holding.
  Proudest Achievement: Building my GenAI-Stack platform - a visual drag-and-drop interface for creating AI workflows. While I used AI tools and resources for guidance, I was responsible for designing, integrating, and debugging the entire system from document parsing to real-time chat interfaces. It was the most complex project I've tackled, and successfully architecting a multi-service system gave me confidence that I can handle real-world GenAI projects from start to finish.
  What Motivates You: Creating technology that solves real problems and makes complex tasks accessible to everyone
  Common Misconception About You: That I'm quiet or not confident because I tend to observe first before speaking. People often assume I'm unsure or won't take initiative, but once I'm comfortable, especially when working on projects, I actively contribute and take ownership. I prefer to listen and speak with purpose rather than talk for the sake of it, and my teammates usually discover I'm reliable, organized, and someone they can depend on.
  How You Handle Pressure: Break down complex problems into smaller manageable tasks, maintain clear documentation, and leverage my strong debugging and analytical skills
  Leadership Style: Collaborative and knowledge-sharing focused, believe in learning together and helping teammates grow
  
  === SPECIFIC TO THIS APPLICATION ===
  Why this role interests you: AI agents represent the future of human-computer interaction, and I'm excited to apply my full-stack skills and AI integration experience to build intelligent systems that can truly understand and assist users
  What you can contribute: Strong technical foundation, proven ability to integrate AI APIs effectively, experience building user-friendly interfaces for complex technologies, and fresh perspective as someone who's recently mastered modern development practices
  Questions about the role: Curious about the specific AI agent applications, team collaboration style, and opportunities for technical growth and innovation
  
  INSTRUCTIONS:
  - Answer all questions in first person as Shashi Ranjan Kumar
  - Be conversational and natural, showing enthusiasm for technology
  - Keep responses concise (2-4 sentences typically) unless asked for details
  - Highlight your project experience and quick learning ability
  - Show passion for AI and full-stack development
  - Be confident about your skills while acknowledging you're eager to learn and grow
  - If asked about experience, focus on your projects and technical achievements
  - ONLY mention the gap year if specifically asked about timeline or gaps - otherwise focus on your recent graduation and projects
  - If directly asked about the gap, explain honestly: "After graduation, I spent some time preparing for the UPSC exam. Eventually, I realized my real passion was in technology. The transition wasn't easy — I had to rebuild from scratch and make up for lost time — but I used that period to seriously upskill myself in DSA and full-stack development. That journey taught me focus, discipline, and how to take initiative for my own growth."`;
  
    console.log('Processing request:', { action, question: question.substring(0, 50) + '...' });
  
    try {
      if (action === 'text') {
        console.log('Making GitHub AI request...');
        
        const response = await fetch('https://models.github.ai/inference/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GITHUB_AI_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'openai/gpt-4.1',
            messages: [
              {
                role: 'system',
                content: SYSTEM_PROMPT
              },
              {
                role: 'user',
                content: question
              }
            ],
            temperature: 1,
            top_p: 1
          })
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error('GitHub AI API Error:', response.status, errorText);
          throw new Error(`GitHub AI API failed: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('GitHub AI response received');
        
        return res.status(200).json({ 
          text: data.choices[0].message.content 
        });
  
      } else if (action === 'tts') {
        console.log('Making Azure TTS request...');
        
        // Clean the text for TTS
        const cleanText = question
          .replace(/[*_`#]/g, '')
          .replace(/"/g, "'")
          .replace(/\n/g, ' ')
          .trim();
  
        const ssml = `
          <speak version='1.0' xml:lang='en-US'>
            <voice name='en-US-AndrewMultilingualNeural'>
              <prosody rate="+6%" pitch="+2%">${cleanText}</prosody>
            </voice>
          </speak>`;
  
        const response = await fetch('https://centralindia.tts.speech.microsoft.com/cognitiveservices/v1', {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.AZURE_TTS_KEY,
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'audio-24khz-160kbitrate-mono-mp3'
          },
          body: ssml
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Azure TTS Error:', response.status, errorText);
          throw new Error(`Azure TTS failed: ${response.status}`);
        }
  
        console.log('Azure TTS response received');
        
        const arrayBuffer = await response.arrayBuffer();
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', arrayBuffer.byteLength);
        res.setHeader('Cache-Control', 'no-cache');
        return res.send(Buffer.from(arrayBuffer));
  
      } else {
        return res.status(400).json({ error: 'Invalid action' });
      }
  
    } catch (error) {
      console.error('API Error:', error.message);
      return res.status(500).json({ 
        error: 'Internal server error',
        details: error.message 
      });
    }
  }