# Porulon Technologies — React + Tailwind rebuild

This is the Stitch "Quantum Aurora" redesign of porulontech.com, rebuilt as a
real React + Tailwind CSS codebase with reusable components, dark/light theme,
glow effects, and animated section backgrounds. This drop includes the
**Navbar**, **Footer**, and **Homepage** — every other page can be built the
same way, reusing the same components (see "Next pages" below).

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build -> /dist
npm run preview    # preview the production build
```

Requires Node 18+.

## Structure

```
src/
  components/
    Logo.jsx             reusable brand mark (SVG, recreated from your reference)
    Navbar.jsx            sticky nav, Services + Training dropdown menus, mobile menu
    Footer.jsx             matches the footer reference image, real contact details
    ThemeToggle.jsx        dark/light switch (persists to localStorage)
    SectionBackground.jsx  animated "hero" background — WebGL aurora shader that
                            behaves like a looping background video, drifting
                            gradient blobs for light theme, and a slot for a real
                            .mp4 if you have one
    GlowImage.jsx           wraps any image with the ambient light-glow effect
  context/
    ThemeContext.jsx        theme provider/hook
  pages/
    Home.jsx                the homepage, built from all the components above
  App.jsx                    Navbar + routed pages + Footer shell
  index.css                  Tailwind layers + the two theme token sets
public/
  images/                    generated placeholder art (violet/teal, on-brand) —
                              swap these for real photography whenever you have it
  videos/                    drop a real .mp4 here for the hero (see below)
```

## Theme system

Both themes are defined as CSS variables in `src/index.css` (`:root/.dark` and
`.light`), so every component just uses classes like `bg-bg`, `text-text`,
`border-border`, `text-primary-strong` — no per-component dark: overrides
needed. `ThemeToggle` flips the `dark`/`light` class on `<html>`.

- **Dark** = the original Stitch "Quantum Aurora" palette (near-black surfaces,
  electric-violet primary, aurora-teal secondary).
- **Light** = a matching palette with the same brand hues, deepened for
  contrast (violet `#6D28D9`, teal `#0D9488`) on soft off-white surfaces, with
  font colors, borders, and glass panels all remapped for readability.

## Section-1 background video

`SectionBackground` currently renders a live WebGL "aurora" animation as the
hero backdrop for both themes — this is the video-like animated background
requested for section 1, without depending on an external file. If you have an
actual video file (drone shot, product reel, etc.):

1. Put it at `public/videos/hero.mp4` (and an optional poster image in
   `public/images/`).
2. In `src/pages/Home.jsx`, uncomment the `videoSrc="/videos/hero.mp4"` line on
   the `<SectionBackground />` call.

Do this per-page for any other page's section 1.

## Glow effect on images

Wrap any image with `<GlowImage src="..." alt="..." />` instead of a bare
`<img>` to get the ambient light-glow + hover treatment used throughout the
homepage (about photo, service cards, "why choose us" orb).

## Images

`public/images/*.jpg` are generated abstract violet/teal tech-art placeholders
(circuit lines + glow orbs) so the site looks complete and on-brand out of the
box. Swap them for real photography/screenshots — same filenames, same spot.

## Next pages

Build Services, About, Industries, Academy, Careers, Contact the same way:
new file in `src/pages/`, wired into the `<Routes>` in `App.jsx` (there are
already placeholder routes there to replace), reusing `SectionBackground` for
each page's section 1 and `GlowImage` for photography.
