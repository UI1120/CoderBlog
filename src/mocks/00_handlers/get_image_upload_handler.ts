
import { http, HttpResponse } from 'msw';

export const get_image_upload_handler = [
    http.post('/api/upload/image', async ({ request }) => {
        // In a real app, we would process the formData here.
        // For now, we simulate a successful upload and return a fake URL.
        // Since we can't write to disk in the browser, 
        // we'll return a placeholder URL or a data URL if we wanted to echo it back.
        // The user requested a URL format like https://.../image.png

        // Simulating processing delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // We'll return a lorem picsum URL or similar to simulate a hosted image
        // OR we can return a local path if we had a way to serve it.
        // Let's use a placeholder image for the prototype as requested.
        // "src/imgsrc" usage on client side implies serving static assets.
        // If the user puts files in public/ or src/assets, Vite serves them.
        // But dynamic uploads won't appear there. 

        // Let's return a unique ID based URL that we can ALSO mock if needed,
        // or just return a static placeholder for visual confirmation.

        // To prove the "upload" feeling, let's use a unique timestamp.
        const timestamp = new Date().getTime();

        // NOTE: This URL is fake. The browser will try to load it. 
        // To make it show up, we need a corresponding GET handler.
        const imageUrl = `/api/images/uploaded-${timestamp}.png`;

        return HttpResponse.json({ url: imageUrl });
    }),

    // Handler to serve the uploaded image (Echoing a placeholder for now, 
    // or we could use the request body from the upload if we shared state,
    // but keeping it simple: return a placeholder image).
    http.get('/api/images/:filename', () => {
        // Return a redirect to a random placeholder image or a static asset
        return HttpResponse.redirect('https://picsum.photos/400/300');
    })
];
