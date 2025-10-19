# Figma UI Design Editor (React + Vite + Tailwind)

A responsive, lightweight web-based design editor inspired by Figma — built using **React**, **Vite**, and **Tailwind CSS**.  
It allows users to create, edit, and manage design components directly in the browser with smooth UI interactions and configurable tools.

**Deployed Link**
Live Demo on Vercel: (figma-ui-design-3-1zydqbm9t-mmahajan-be22-1481s-projects.vercel.app)

# Project Overview
This project replicates a simplified version of a design editor like Figma, focusing on:
- Interactive canvas editing.
- Customizable components.
- Smooth real-time UI rendering.
- Modular structure with reusable components and configuration options.

# Tech Stack
 Frontend Framework: React (Vite)
 Styling: Tailwind CSS
 Deployment: Vercel
 State Management: React Hooks / useState / useEffect
 Editor Functionality: Custom Canvas + Controlled Components

## Component API & Configurable Props
 1. Editor Component
File: `src/components/Editor.jsx`

 Prop : Type : Description 
 `initialElements` ; `Array` ; Array of design elements to pre-load on canvas.
 `onChange` ; `Function` ; Callback triggered when any element changes.
 `theme` ; `String` ; Optional theme mode ("light" / "dark").
 `readOnly` ; `Boolean` ; Whether editing is disabled.

Example Usage:
<Editor
  initialElements={[]}
  theme="light"
  onChange={(updatedElements) => console.log(updatedElements)}
/>

1. Toolbar Component
The set of buttons and tools you use to create and manage shapes.

Prop	             Type	                 Description
selectedTool	    String	        Currently active tool (e.g., "rectangle", "circle").
onAddShape	      Function	      Called when adding a new shape to the canvas.
onUndo/onRedo	   Function	      Undo or redo the last action.
onSave	          Function	      Optional save or export handler.

2. Sidebar/Properties Panel
Displays and edits properties of the currently selected element.

Prop	              Type	              Description
selectedElement	  Object	      The active shape selected on canvas.
onChange	         Function	    Updates shape properties like color, size, or position.

3. Canvas Component
Handles the actual drawing surface and renders elements in real time.

Prop	              Type	              Description
elements	         Array	         All elements currently on the canvas.
onElementSelect	  Function	      Fired when an element is selected.
onElementUpdate	  Function	      Fired when a shape’s size, position, or color changes.

4. How the Editor Works (Behind the Scenes)
Here’s a quick look at what happens under the hood:

  1.Canvas Setup:
When the app loads, the Editor component initializes the workspace and draws all existing elements (if any).
  2.User Interactions:
Users pick a tool (rectangle, circle, etc.), then draw or move shapes using simple drag actions.
  3.State Management:
Each element (like a shape or text block) is stored in React state.
When a user edits something, the state updates instantly — React re-renders the canvas smoothly.
  4.Undo/Redo:
Every edit saves a snapshot of the state, allowing users to undo or redo their actions easily.
  5.Rendering & Performance:
The canvas updates only the parts that change — ensuring fast, responsive updates even with multiple elements.

5. Design & UX Choices
Area	                      Decision	                             Why
Clean Interface	       Focused on simplicity,       	Keeps users focused on the canvas.
                        minimal distractions.
Interactive Feedback 	Hover effects and borders      Makes editing feel visual and 
                      for selected shapes.           intuitive
Dark/Light Themes	    Easy toggle between themes.	   Comfort for long editing sessions.
Undo/Redo Support	    Built with custom history      Gives a real design-tool experience.
                      logic.
Responsive Design	    Works on tablets and laptops.	 Keeps the editor flexible.
SPA Routing (Vercel)	 Added fallback routes via      Fixes refresh issues on /editor 
                      vercel.json.                   page.

6. Project Structure

📂 Figma-ui-design-3
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 Editor.jsx
 ┃ ┃ ┣ 📜 Toolbar.jsx
 ┃ ┃ ┣ 📜 Sidebar.jsx
 ┃ ┃ ┗ 📜 Canvas.jsx
 ┃ ┣ 📂 assets
 ┃ ┣ 📜 App.jsx
 ┃ ┣ 📜 main.jsx
 ┣ 📜 index.html
 ┣ 📜 package.json
 ┣ 📜 tailwind.config.js
 ┣ 📜 vite.config.js
 ┗ 📜 vercel.json

6. Run Locally
# Clone the repository
git clone https://github.com/Madhur861/Figma-ui-design-3.git

# Go to the folder
cd Figma-ui-design-3

# Install dependencies
npm install

# Start local server
npm run dev

Then open http://localhost:5173 in your browser.

7. Build & Deploy
# Build for production
npm run build

# Preview the build
npm run preview

Deploy on Vercel:

Push your code to GitHub

Connect your repo on Vercel

It auto-builds and hosts your app instantly.

8. Future Plans
- Add grouping and layer management
- Introduce text editing and font controls
- Export to PNG, SVG, or JSON
- Implement auto-save & version history
- Add real-time collaboration (multi-user)
- Improve drag and resize handles
