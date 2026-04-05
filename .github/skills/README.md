# GitHub Copilot Skills

This directory contains GitHub Copilot Chat skill definitions for the Maido Ravintola project.

## Available BMAD Skills

### Core Skills
- `/bmad-help` - Get guidance on your BMAD workflow
- `/bmad-brainstorming` - Facilitate brainstorming sessions
- `/bmad-distillator` - Compress documents for LLM context
- `/bmad-party-mode` - Multi-agent collaboration

### Review & Analysis Skills
- `/bmad-advanced-elicitation` - Deep critique and refinement
- `/bmad-editorial-review-prose` - Polish written content
- `/bmad-editorial-review-structure` - Improve document structure
- `/bmad-review-adversarial-general` - Critical quality review
- `/bmad-review-edge-case-hunter` - Exhaustive edge-case analysis

### Workflow Skills (BMM - Business Method Module)
- `/bmad-create-prd` - Create Product Requirements Document
- `/bmad-create-ux-design` - Design UX patterns and specifications
- `/bmad-create-architecture` - Design technical architecture
- `/bmad-create-epics-and-stories` - Break requirements into stories
- `/bmad-sprint-planning` - Plan implementation sprints

### Agent Skills (Talk to Named Personas)
- `/bmad-agent-analyst` - Mary (Business Analyst)
- `/bmad-agent-tech-writer` - Paige (Technical Writer)
- `/bmad-agent-pm` - John (Product Manager)
- `/bmad-agent-ux-designer` - Sally (UX Designer)
- `/bmad-agent-architect` - Winston (Architect)
- `/bmad-agent-dev` - Amelia (Developer)
- `/bmad-agent-qa` - Quinn (QA Engineer)

## How to Use

In the GitHub Copilot Chat panel, type any of the slash commands above to invoke the corresponding skill.

Example:
```
/bmad-help
```

Or reference a skill in natural language:
```
@bmad-help What should I do next?
```

## Skill Structure

Each skill is located in `.github/skills/[skill-name]/SKILL.md` and contains:
- Frontmatter with skill metadata (name, description)
- Purpose and desired outcomes
- Implementation instructions
- Response format guidelines
