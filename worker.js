// Cloudflare Worker for CareTail Admin Panel
// This handles image uploads and admin functionality

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Routes
    if (url.pathname === '/api/admin/upload-image') {
      return handleImageUpload(request, env, corsHeaders);
    }
    
    if (url.pathname === '/api/admin/get-image') {
      return handleGetImage(request, env, corsHeaders);
    }
    
    if (url.pathname === '/api/admin/settings') {
      return handleSettings(request, env, corsHeaders);
    }

    if (url.pathname === '/api/admin/auth') {
      return handleAuth(request, env, corsHeaders);
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  }
};

// Handle image upload
async function handleImageUpload(request, env, corsHeaders) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image');
    const auth = formData.get('auth');

    // Simple auth check
    if (auth !== 'authenticated') {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders });
    }

    if (!file) {
      return new Response('No file provided', { status: 400, headers: corsHeaders });
    }

    // Convert file to base64 for KV storage
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    
    // Store in Cloudflare KV
    const imageData = {
      data: base64,
      type: file.type,
      name: file.name,
      updated: new Date().toISOString()
    };

    await env.CARETAIL_KV.put('app_image', JSON.stringify(imageData));

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Image uploaded successfully',
      url: `/api/admin/get-image?t=${Date.now()}`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Handle get image
async function handleGetImage(request, env, corsHeaders) {
  try {
    const imageData = await env.CARETAIL_KV.get('app_image');
    
    if (!imageData) {
      return new Response('Image not found', { status: 404, headers: corsHeaders });
    }

    const parsed = JSON.parse(imageData);
    const binaryString = atob(parsed.data);
    const bytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return new Response(bytes, {
      headers: {
        ...corsHeaders,
        'Content-Type': parsed.type,
        'Cache-Control': 'public, max-age=3600'
      }
    });

  } catch (error) {
    return new Response('Error retrieving image', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
}

// Handle settings
async function handleSettings(request, env, corsHeaders) {
  try {
    if (request.method === 'GET') {
      const settings = await env.CARETAIL_KV.get('site_settings');
      return new Response(settings || '{}', {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'POST') {
      const settings = await request.json();
      await env.CARETAIL_KV.put('site_settings', JSON.stringify(settings));
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Settings saved successfully' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Handle authentication
async function handleAuth(request, env, corsHeaders) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const { username, password } = await request.json();
    
    // Simple hardcoded auth (in production, use better authentication)
    if (username === 'root' && password === 'superadmin') {
      return new Response(JSON.stringify({ 
        success: true, 
        token: 'authenticated' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid credentials' 
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}