# Guidelines for Utilizing Tailwind CSS Layers

In our projects, we often encounter situations where multiple elements on a webpage share a common style. Tailwind CSS provides a utility-first approach that can sometimes lead to repetition of class names. To maintain consistency and reduce redundancy, we can use Tailwind's layering system or Vue components.

Here are the conventions we should follow:

## Vue Component Abstraction

**When:**
Use this approach when the common style applies to a complex element that is repeated across different parts of the application, such as buttons, cards, or form elements.

**How:**
Create a Vue component that encapsulates all the common Tailwind CSS classes. Then, reuse this Vue component wherever needed. This not only promotes DRY (Don't Repeat Yourself) principles but also simplifies future updates.

**Example:**
If all buttons have a border of 1px and a specific padding, create a `BaseButton` component with these styles predefined.

## Tailwind CSS Layers

**When:**
Use layers when the style applies to basic HTML elements (e.g., `h1`, `p`) or when you need to define global defaults for spacing, theming, or typography that are not suitable for component abstraction.

**How:**
Utilize Tailwind's `@layer` directive to define your custom styles. This can be done in your Tailwind CSS configuration file or within a CSS file that uses Tailwind's `@apply` directive.

**Example:**
For setting a default padding across all `h1` tags, you can create a layer like this:

```css
@layer components {
  h1 {
    @apply p-4;
  }
}
```

# Spacing and colors

## Spacing

When possible, use the spacing classes like `.space-x-lg`, `.py-xs`, `.mx-lg` etc. to define spaces. These classes will automatically adjust size depending on whether we're on Desktop or Mobile.

If the spacing doesn't match any of the pre-defined spacings, please confirm with Leticia that this is intended.

## Colors

Use pre-defined colors (e.g. `bg-primary`) and their shades (e.g. `bg-primary-400`) when possible. Normally colors from the Horse24 theme should be used. In rare cases it's fine to use predefined tailwindcss colors, but only for colors that should look the same for every child site.

# Directory structure

1. Follow nuxt 3 directory structure unless otherwise stated
2. Put a story for a component next to the component, for example `components/shared/Button.vue` -> `components/shared/Button.story.vue`
3. Components that are very basic and reused in many places should go in `components/shared/<ComponentName>.vue` or `components/shared/<ComponentName>/<ComponentName>.vue`