/**
 * Shared easing curves for Framer Motion.
 *
 * EASE_OUT / EASE_IN: standard expo in/out (easings.net). Used as an asymmetric
 * pair — entrances decelerate (EASE_OUT), exits accelerate away (EASE_IN) — so
 * appearing and disappearing don't feel like the same animation played backwards.
 *
 * EASE_SNAP: the cubic-bezier Emil Kowalski ships in vaul/sonner for drag and
 * press feedback. Reserved for direct-manipulation interactions (hover, tap),
 * not passive entrances.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN = [0.64, 0, 0.78, 0] as const;
export const EASE_SNAP = [0.32, 0.72, 0, 1] as const;
