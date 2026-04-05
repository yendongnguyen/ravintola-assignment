# Troubleshooting BMAD Slash Commands in GitHub Copilot Chat

## Problem
Slash commands like `/bmad-help` are not working in GitHub Copilot Chat within VS Code.

## Root Causes & Solutions

### Solution 1: Ensure GitHub Copilot Chat Extension is Installed and Enabled

**Steps:**
1. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac) to open Extensions
2. Search for "GitHub Copilot Chat"
3. Click "Install" if not installed
4. Make sure it's enabled (not disabled)
5. Restart VS Code completely

**Verify it's working:**
- Open GitHub Copilot Chat: Press `Ctrl+Shift+I` (or the Chat icon in sidebar)
- You should see the chat panel open

---

### Solution 2: Try Using `@` Mention Syntax Instead of `/`

In GitHub Copilot Chat, try this format:

```
@bmad-help What skills are available?
```

Or mention a specific BMAD agent:

```
@bmad-agent-analyst I need market research for a restaurant
```

---

### Solution 3: Reference Skills in Natural Language

Instead of slash commands, use natural language:

```
Help me with my BMAD workflow
```

```
Use the brainstorming skill to help me ideate
```

```
I want to use the advanced elicitation technique
```

---

### Solution 4: Use Chat-Based Skill Invocation

Type in chat:

```
Can you help me run the bmad-create-prd skill?
```

Or provide the skill path directly:

```
Follow the instructions in .github/skills/bmad-create-prd/SKILL.md
```

---

### Solution 5: Check VS Code Settings

Make sure GitHub Copilot is enabled for your workspace:

1. Open Settings: `Ctrl+,` (or `Cmd+,` on Mac)
2. Search for "github.copilot"
3. Verify:
   - ✅ `github.copilot.enable` is checked/true
   - ✅ `github.copilot.chat` is enabled
4. Restart VS Code

---

### Solution 6: Register Skills Manually via Chat

If slash commands aren't auto-recognized, you can still use the skills by:

1. Opening Copilot Chat: `Ctrl+Shift+I`
2. Type: `Load the SKILL.md file from .github/skills/[skill-name]/SKILL.md`
3. Then ask the AI to follow those instructions

Example:
```
Load the SKILL.md file from .github/skills/bmad-help/SKILL.md and follow its instructions
```

---

### Solution 7: Update GitHub Copilot Extension

1. Open Extensions: `Ctrl+Shift+X`
2. Click on "GitHub Copilot Chat"
3. Click "Update" if available
4. Restart VS Code

---

### Solution 8: Check If Extension is Properly Authenticated

1. Open Copilot Chat: `Ctrl+Shift+I`
2. You should see your GitHub username
3. If you see "Sign in" button, click it and authenticate with GitHub
4. Restart VS Code after authentication

---

## Quick Workaround: Direct Skill Execution

Until slash commands work, use this workaround in Copilot Chat:

```
I'm using BMAD for my Maido Ravintola restaurant website project.

Here's the skill I want to use:
[Copy the content from .github/skills/bmad-help/SKILL.md]

Please follow this skill's instructions.
```

---

## Verification Checklist

- [ ] GitHub Copilot extension is installed
- [ ] GitHub Copilot Chat extension is installed
- [ ] Both extensions are enabled (not grayed out)
- [ ] You're signed in with GitHub account
- [ ] VS Code has been restarted after each change
- [ ] Chat panel opens with `Ctrl+Shift+I`
- [ ] You can see your GitHub username in chat

---

## Still Not Working?

If none of the solutions work, try this diagnostic:

1. Press `Ctrl+Shift+P`
2. Type "Developer: Toggle Developer Tools"
3. Look for any error messages related to Copilot
4. Share the errors for further diagnosis

---

## Alternative: Use GitHub CLI

If VS Code integration isn't working, you can potentially use GitHub CLI:

```powershell
# (If GitHub CLI is installed)
gh copilot explain "your code"
gh copilot suggest "what you want to do"
```

But this won't directly access `.github/skills/` definitions.

---

## Most Likely Working Solution

Based on current GitHub Copilot functionality, the **most reliable method** is:

**In GitHub Copilot Chat panel, use natural language:**

```
I'm working on a restaurant website using BMAD methodology.
What should be my next steps?
(This uses the bmad-help skill's intent)
```

Or use `@` mentions:

```
@bmad-agent-pm I need to create a PRD for my restaurant booking feature
```

This allows Copilot to understand your intent and guide you through the appropriate BMAD workflow.
