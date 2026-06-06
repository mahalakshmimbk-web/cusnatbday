# Photo Upload Folder

Put your custom photos for the **Memory Dome** in this directory. 

## How to use:
1. Copy your JPEG/PNG/WebP images into this folder (e.g. `public/photos/us_at_beach.jpg`).
2. Open [App.jsx](file:///e:/cusnat-bda/src/App.jsx) and locate the `PHOTOS` array around line 1419.
3. Replace the placeholder `"PHOTO_X_BASE64_OR_URL"` with the relative path to your file in the public folder, for example:
   ```js
   src: "/photos/us_at_beach.jpg",
   ```
4. Save the file, and your photos will instantly appear as beautiful high-quality cards inside the 3D rotating Memory Dome!
