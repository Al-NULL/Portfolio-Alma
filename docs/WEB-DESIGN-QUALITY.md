# Web Design Quality Checklist

Use this checklist before and after implementing a significant page or flow.

## Before implementation

- [ ] Identify the intended user, primary task, and success state.
- [ ] Define the information hierarchy before choosing decorative elements.
- [ ] Establish a visual direction that fits the product rather than copying a generic template.
- [ ] Identify required content, real assets, empty states, loading states, and error states.
- [ ] Define responsive behavior for narrow, medium, and wide viewports.

## Visual design

- [ ] Typography has a clear hierarchy and a controlled number of font styles.
- [ ] Color tokens have semantic roles and sufficient contrast.
- [ ] Spacing follows a consistent scale.
- [ ] Layout uses alignment and whitespace intentionally.
- [ ] Cards, borders, shadows, gradients, and animations exist only when they improve comprehension or interaction.
- [ ] Images and illustrations are relevant, correctly sized, and not used as filler.
- [ ] The page has a recognizable visual identity without relying on fashionable effects.

## Interaction and accessibility

- [ ] All interactive elements have clear states: default, hover, focus, active, disabled, and loading where relevant.
- [ ] Keyboard users can complete the primary task.
- [ ] Focus is visible and logical.
- [ ] Forms have associated labels and useful validation messages.
- [ ] Motion is restrained and respects `prefers-reduced-motion`.
- [ ] Content remains usable at small widths and with zoom.

## Engineering

- [ ] Components have clear responsibilities and are not abstracted prematurely.
- [ ] Server Components remain the default unless client behavior is required.
- [ ] Data fetching and mutations have explicit loading and error handling.
- [ ] No fake data, dead buttons, or unexplained placeholder interactions remain.
- [ ] Lint, type checks, and production build have been run where available.
