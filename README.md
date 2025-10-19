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
