
// Schema Loader for schmitten-luxury-nuvanax_vercel_app
// Generated on 2025-06-14T08:59:42.408245
// Job ID: 8714ad1b-2f7c-4f73-8db3-ff7e83925cd4

(function() {
    'use strict';
    
    const SCHEMA_BASE_URL = 'https://cdn.jsdelivr.net/gh/Aaditya17032002/webloom@main/schema_repo/schmitten-luxury-nuvanax_vercel_app/';
    const PAGE_SCHEMAS = [
    {
        "filename": "homepage.json",
        "url": "https://schmitten-luxury-nuvanax.vercel.app/",
        "title": "Schmitten Luxury Chocolates | Indulge in Exquisite Flavors"
    },
    {
        "filename": "terms-of-service.json",
        "url": "https://schmitten-luxury-nuvanax.vercel.app/terms-of-service",
        "title": "404: This page could not be found."
    },
    {
        "filename": "privacy-policy.json",
        "url": "https://schmitten-luxury-nuvanax.vercel.app/privacy-policy",
        "title": "404: This page could not be found."
    },
    {
        "filename": "contact.json",
        "url": "https://schmitten-luxury-nuvanax.vercel.app/contact",
        "title": "Schmitten Luxury Chocolates | Indulge in Exquisite Flavors"
    },
    {
        "filename": "schmitten-world_our-story.json",
        "url": "https://schmitten-luxury-nuvanax.vercel.app/schmitten-world/our-story",
        "title": "Schmitten Luxury Chocolates | Indulge in Exquisite Flavors"
    },
    {
        "filename": "shipping-policy.json",
        "url": "https://schmitten-luxury-nuvanax.vercel.app/shipping-policy",
        "title": "404: This page could not be found."
    },
    {
        "filename": "gifting.json",
        "url": "https://schmitten-luxury-nuvanax.vercel.app/gifting",
        "title": "Schmitten Luxury Chocolates | Indulge in Exquisite Flavors"
    },
    {
        "filename": "stores.json",
        "url": "https://schmitten-luxury-nuvanax.vercel.app/stores",
        "title": "Schmitten Luxury Chocolates | Indulge in Exquisite Flavors"
    },
    {
        "filename": "collections_assortments.json",
        "url": "https://schmitten-luxury-nuvanax.vercel.app/collections/assortments",
        "title": "Schmitten Luxury Chocolates | Indulge in Exquisite Flavors"
    },
    {
        "filename": "gifting_corporate.json",
        "url": "https://schmitten-luxury-nuvanax.vercel.app/gifting/corporate",
        "title": "404: This page could not be found."
    }
];
    
    function getCurrentPageSchema() {
        const currentUrl = window.location.href;
        const currentPath = window.location.pathname;
        
        // Find matching schema based on URL or path
        for (const page of PAGE_SCHEMAS) {
            const pageUrl = new URL(page.url);
            const pagePath = pageUrl.pathname;
            
            // Exact URL match
            if (currentUrl === page.url) {
                return page.filename;
            }
            
            // Path match
            if (currentPath === pagePath) {
                return page.filename;
            }
            
            // Homepage match
            if ((currentPath === '/' || currentPath === '') && 
                (pagePath === '/' || page.filename === 'homepage.json')) {
                return page.filename;
            }
        }
        
        // Default to homepage schema if no match found
        return PAGE_SCHEMAS.find(p => p.filename === 'homepage.json')?.filename || PAGE_SCHEMAS[0]?.filename;
    }
    
    async function loadAndInjectSchema() {
        try {
            const schemaFile = getCurrentPageSchema();
            if (!schemaFile) {
                console.warn('No schema file found for current page');
                return;
            }
            
            const response = await fetch(SCHEMA_BASE_URL + schemaFile);
            if (!response.ok) {
                throw new Error(`Failed to load schema: ${response.status}`);
            }
            
            const schemaData = await response.json();
            const jsonLd = schemaData.json_ld;
            
            // Create and inject script tag
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(jsonLd, null, 2);
            
            // Remove existing schema if any
            const existing = document.querySelector('script[type="application/ld+json"][data-crawler-generated]');
            if (existing) {
                existing.remove();
            }
            
            script.setAttribute('data-crawler-generated', 'true');
            document.head.appendChild(script);
            
            console.log('Schema loaded successfully:', schemaFile);
            
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('schemaLoaded', {
                detail: { schemaFile, jsonLd, pageInfo: schemaData.page_info }
            }));
            
        } catch (error) {
            console.error('Error loading schema:', error);
        }
    }
    
    // Load schema when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAndInjectSchema);
    } else {
        loadAndInjectSchema();
    }
    
    // Expose utility functions
    window.SchemaLoader = {
        reload: loadAndInjectSchema,
        getAvailableSchemas: () => PAGE_SCHEMAS,
        getCurrentSchema: getCurrentPageSchema,
        baseUrl: SCHEMA_BASE_URL
    };
    
})();
