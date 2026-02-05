**Issues identified**

- Library takes a lot of time to load. 
  - looks like Big note component has. alot of text, loading this will take a lot of time, so we add virtualisation to this.
  - used react window for virtualisation (this is already present in package.json).

- removed external script from index.html
- implemented redux for cart management as part of the assignment
  - react redux was not installed in dependencies and so had to add them.
- implemented a Table Of Contents as a extra feature for Ebook

- cleared up intervals and even listeners.
- added auto rotation for gallery and adjusted image container styling
- Refactor LiveDataStreamingSvc to use state for persistentArray and fixing the memory leak and clearing the interval.
- removed common components and moved them to routes.jsx
- fixed issues in home page
- removed error boundary in routes.tsx
- fixed issue in useeffect and removed unnecessary renders