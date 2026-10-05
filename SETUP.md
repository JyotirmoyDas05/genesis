# Genesis Frontend - Mock Mode Quickstart Guide

This guide provides step-by-step, handholding instructions to get the **Genesis Frontend** running locally in **Mock Mode**. Both **pnpm** and **npm** commands are provided for every step.

> [!NOTE]
> **No backend, Java, Docker, or database setup is needed!**
> Mock Mode bypasses authentication, provides realistic mock data (workspaces, documents, team members, and notifications), and lets you test and design the UI immediately.

---

## 📋 Step 0: Check Prerequisites

Before starting, make sure you have **Node.js** installed along with either **pnpm** or **npm**.

### Open your Terminal / PowerShell / Command Prompt
Run these commands to verify:

```bash
node -v
```
- **Node.js**: Should be version `20.x` or `22.x` (e.g., `v22.21.0`).

Check your package manager:
- If using **pnpm** (recommended):
  ```bash
  pnpm -v
  ```
- If using **npm**:
  ```bash
  npm -v
  ```

> [!TIP]
> If you prefer using `pnpm` and do not have it installed yet:
> ```bash
> npm install -g pnpm
> ```

---

## 🚀 Step 1: Open the Project Directory

Navigate to the project root directory in your terminal:

```bash
cd D:/temp_prs/genesis
```
*(Replace with your actual folder path if different)*

---

## 📦 Step 2: Install Project Dependencies

Run the install command from the root directory:

#### Option A: Using `pnpm` (Recommended)
```bash
pnpm install
```

#### Option B: Using `npm`
```bash
npm install
```

Wait until the installation completes successfully.

---

## 💻 Step 3: Start the Application in Mock Mode

Run the mock development server:

#### Option A: Using `pnpm`
```bash
pnpm dev:mock
```

#### Option B: Using `npm`
From the project root:
```bash
npm --prefix apps/web run dev:mock
```
*(Or navigate into `apps/web` and run `npm run dev:mock`)*

You will see output similar to:
```text
> cross-env NEXT_PUBLIC_MOCK_MODE=true next dev
   ▲ Next.js 15.5.9
   - Local:        http://localhost:3000
   - Network:      http://...:3000

 ✓ Ready in 2-3s
```

> [!IMPORTANT]
> Keep this terminal window open while you use the application. To stop the server later, press `Ctrl + C`.

---

## 🌐 Step 4: Open in Your Browser

Open your browser (Chrome, Edge, Firefox, or Safari) and go to:

👉 **[http://localhost:3000](http://localhost:3000)**

### What Happens Automatically:
1. **Login is bypassed**: You are not redirected to `/login`.
2. **Dashboard opens**: You are directly navigated to `/home`.
3. **Session loaded**: You are automatically logged in as:
   - **Name**: Alex Rivera
   - **Role**: Admin
   - **Organization**: Genesis NLP Research Lab
4. **Mock Workspaces Displayed**:
   - `Biomedical Entity Extraction (PubMed)` (NER — 80% progress)
   - `Financial Disclosures Coreference` (COREF — 60% progress)
   - `Legal Contracts Syntax & POS` (POS — 100% completed)
   - `Word Sense Disambiguation Pilot` (WSD — 20% progress)

---

## 🧪 What You Can Test Right Now

- **Click on Any Workspace Card**: Opens the workspace dashboard with sample uploaded documents and team members.
- **Create a New Workspace**: Click the **"+ New Workspace"** button, enter a name, description, and task type (e.g. NER), and click **Create**. It will instantly show up in the workspace list!
- **Notification Dropdown**: Click the bell icon in the header to view sample notifications.
- **Clean Console**: The background WebSocket (SockJS/STOMP) is silenced in Mock Mode so your browser dev tools stay free of network errors.

---

## 🔄 Two Modes: Mock vs Real Integration

| Mode | Using `pnpm` | Using `npm` | Requires Backend / Docker? |
|---|---|---|---|
| **Mock Mode** (UI dev & demo) | `pnpm dev:mock` | `npm --prefix apps/web run dev:mock` | ❌ No |
| **Integration Mode** (Real API) | `pnpm dev` | `npm --prefix apps/web run dev` | ✅ Yes (`localhost:8080`) |

---

## 🛠️ Customizing the Mock Data

If you want to add or modify sample users, workspaces, or documents:
- Edit the file: [`apps/web/src/server/mock-data.ts`](file:///D:/temp_prs/genesis/apps/web/src/server/mock-data.ts)
- Next.js will hot-reload your changes automatically without needing a server restart!

---

## ❓ Troubleshooting

### 1. `Port 3000 is already in use`
If port 3000 is occupied by another process, either close the other process or Next.js will automatically prompt to use `http://localhost:3001`.

### 2. PowerShell execution policy error
If PowerShell blocks running scripts:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
Then re-run the start command.

### 3. Clear Next.js cache if things look out of date
- **pnpm**:
  ```bash
  rm -rf apps/web/.next
  pnpm dev:mock
  ```
- **npm**:
  ```bash
  rm -rf apps/web/.next
  npm --prefix apps/web run dev:mock
  ```
