# Public Assets Folder

This folder contains static assets that are served as-is without processing by Vite.

## Usage

Place your static files here (logos, favicons, robots.txt, etc.) and reference them with absolute paths:

```tsx
// For a logo at public/logo.png
<img src="/logo.png" alt="Logo" />

// For a favicon at public/favicon.ico
<link rel="icon" href="/favicon.ico" />
```

## Folder Structure

```
public/
├── logo.png              # Main logo
├── logo-light.png        # Light theme variant (optional)
├── favicon.ico           # Favicon
└── README.md             # This file
```

## Notes

- Files in this folder are **not** processed by Vite
- Use absolute paths starting with `/` to reference these files
- These files will be copied to the root of your build output
- Good for assets that need predictable URLs or are referenced externally

