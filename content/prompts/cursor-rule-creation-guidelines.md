---
title: 'Cursor Rule Creation Guidelines'
description:
  'Meta guidelines for creating effective Cursor rules that directly influence
  code generation and automate development workflows.'
category: 'Development'
tags: ['cursor', 'rules', 'automation', 'meta', 'guidelines', 'ai-tools']
createdAt: '2024-01-28'
---

# Cursor Rule Creation Guidelines

Focus on creating rules that directly influence code generation. Rules should
only include instructions that can be automatically applied by Cursor's AI.
Avoid including general best practices or guidelines that require human judgment
or manual implementation.

## 1. Structure and Format

- Use MDC format with YAML frontmatter
- Required frontmatter fields:
  ```yaml
  ---
  description: Clear description of rule purpose
  globs: [file patterns this rule applies to]
  alwaysApply: true/false
  ---
  ```
- Keep rules under 500 lines for optimal performance
- Use clear, actionable language

## 2. Rule Types

- **Always**: Rules that should always be included in context
  ```yaml
  alwaysApply: true
  ```
- **Auto Attached**: Rules that match specific file patterns
  ```yaml
  globs: ['**/*.tsx', '**/use*.ts']
  alwaysApply: false
  ```
- **Agent Requested**: Rules available to AI for context-aware inclusion
  ```yaml
  description: Detailed description for AI decision-making
  alwaysApply: false
  ```
- **Manual**: Rules requiring explicit invocation
  ```yaml
  alwaysApply: false
  # No globs needed
  ```

## 3. Best Practices

- Keep rules focused and scoped to specific concerns
- Split large concepts into multiple composable rules
- Include concrete examples or referenced files using @filename syntax
- Write rules like clear internal documentation
- Avoid vague guidance
- Reuse rules instead of repeating prompts

## 4. Organization

- Place rules in `.cursor/rules` directories
- Global rules go in root `.cursor` directory
- Domain-specific rules live in their domain's `.cursor` directory
- Use nested directories for domain-specific rules
- Group related rules together
- Name rules descriptively

## 5. Content Guidelines

- Be specific and actionable
- Include examples where helpful
- Reference existing files using @filename syntax
- Document any assumptions or prerequisites
- Ensure examples are up-to-date
- Check rule scope is appropriate

## 6. File Pattern Matching For Auto Attached Rule Type

- Use specific glob patterns for different file types:

  ```yaml
  # React components
  globs: ['**/*.tsx']

  # React hooks
  globs: ['**/use*.ts']

  # API routes
  globs: ['**/api/**/*.ts']

  # Test files
  globs: ['**/*.test.ts']

  # Style files
  globs: ['**/*.css', '**/*.scss']
  ```

- Combine patterns for complex rules:

  ```yaml
  # React-specific
  globs: ['**/*.tsx', '**/use*.ts']

  # Backend-only
  globs: ['**/server/**/*.ts', '**/api/**/*.ts']

  # Frontend-only
  globs: ['**/client/**/*.ts', '**/*.tsx', '**/*.css']
  ```

- Use negation for exclusions:

  ```yaml
  # TypeScript files excluding tests
  globs: ['**/*.ts', '!**/*.test.ts']

  # React components excluding stories
  globs: ['**/*.tsx', '!**/stories/*.tsx']
  ```

Remember: Rules are meant to provide consistent guidance and automate workflows.
They should make development more efficient, not more complex.
