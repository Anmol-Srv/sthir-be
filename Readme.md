# Project Outline

## 1. Overview

The project aims to build a lightweight, web-based progression simulator where users set personal development goals and see their progress represented visually within a virtual room. Future versions may include multiple task categories and interactive elements, but the initial phase focuses exclusively on a coding-related task scenario.

---

## 2. Primary Objectives (Initial Phase)

### 2.1 Functional Objectives

* Enable users to select an avatar and enter a virtual room.
* Allow users to choose a single task category: **Coding**.
* Provide a structured form to capture:

  * Goal description (e.g., "Build a portfolio website")
  * Duration in days
  * Difficulty level (Easy, Medium, Hard)
* Automatically generate task parameters:

  * Required commits per day
  * XP awarded per day
  * Total duration
  * Verification rules
* Track daily progress via GitHub commit checks or manual verification.
* Update user XP and task progress as criteria are met.
* Unlock a new avatar or item upon task completion.
* Render visual changes in the room based on daily progress.

### 2.2 Non-Functional Objectives

* Maintain clean separation between backend (Fastify) and frontend (React).
* Ensure minimal latency in API responses.
* Provide a scalable backend schema for future task categories.
* Maintain lightweight visuals suitable for incremental updates.

---

## 3. Technology Stack

### 3.1 Backend

* **Node.js + Fastify** for API routing
* **Prisma ORM** with PostgreSQL (or SQLite for MVP)
* **Zod** for request validation
* **fastify-jwt** for authentication
* **node-fetch/Axios** for GitHub API integration
* Local CLI LLM integration via child processes

### 3.2 Frontend

* **React + Vite** for fast, modular development
* **TailwindCSS** for styling
* **Zustand** for global state management
* **Framer Motion** for lightweight animations
* Static assets for avatar and room

---

## 4. Core Features (Initial Release)

### 4.1 User Flow

1. User lands on the homepage and enters an empty virtual room.
2. User selects their avatar.
3. User chooses the Coding task category.
4. User fills the task setup form.
5. Backend generates the task conditions.
6. User returns daily to verify progress.
7. XP and task progress increase upon verification.
8. Completion triggers rewards and visual updates.

### 4.2 Backend Modules

* Authentication
* Task management
* Daily verification engine
* XP and progression logic
* Avatar reward system

### 4.3 Frontend Modules

* Avatar selector
* Room renderer
* Task setup form
* Progress dashboard
* Reward screen

---

## 5. Data Models

### 5.1 User

* ID
* Username
* Avatar
* XP
* Current Task ID

### 5.2 Task

* Task ID
* User ID
* Goal
* Duration
* Difficulty
* Required commits per day
* XP per day
* Progress days
* Status

### 5.3 Daily Progress

* Day index
* Date
* Commit count
* Requirement met flag

---

## 6. Milestones & Timeline

### Milestone 1: Backend Foundation (Week 1)

* Fastify setup
* Prisma schema
* Authentication endpoints
* Basic task creation API

### Milestone 2: Frontend Foundation (Week 2)

* React + Vite setup
* Avatar selector
* Room UI structure
* Task creation form

### Milestone 3: Verification & XP Engine (Week 3)

* GitHub commit integration
* Daily progress logic
* XP calculation
* Room visual updates

### Milestone 4: Completion & Rewards (Week 4)

* Reward unlocks
* Completion logic
* Final UI polish

---

## 7. Early Success Criteria

* A user can create a coding task.
* Progress is validated at least once daily.
* XP increases with correct verification.
* Room visuals update based on progress.
* Completing the task unlocks a new avatar.

---

## 8. Future Expansion (Post-MVP)

* Multiple task categories (fitness, reading, etc.)
* Multi-item room decoration system
* Streak bonuses
* Advanced LLM-based task decomposition
* Social or competitive elements

---

This outline defines the goals, scope, structure, and expectations for the initial phase of development, ensuring a clear path to a functional MVP.
