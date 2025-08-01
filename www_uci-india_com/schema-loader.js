
// Schema Loader for www_uci-india_com
// Generated on 2025-08-01T18:28:50.934786
// Job ID: f2c57749-3096-4561-ab97-8d6863363278

(function() {
    'use strict';
    
    const SCHEMA_BASE_URL = 'https://cdn.jsdelivr.net/gh/Aaditya17032002/webloom@main/schema_repo/www_uci-india_com/';
    const PAGE_SCHEMAS = [
    {
        "filename": "homepage.json",
        "url": "https://www.uci-india.com/",
        "title": "UCI-INDIA"
    },
    {
        "filename": "careers_html.json",
        "url": "https://www.uci-india.com/careers.html",
        "title": "Join the Team at UCI India Careers"
    },
    {
        "filename": "service_html.json",
        "url": "https://www.uci-india.com/service.html",
        "title": "UCI-INDIA"
    },
    {
        "filename": "contact_html.json",
        "url": "https://www.uci-india.com/contact.html",
        "title": "UCI-INDIA"
    },
    {
        "filename": "index_html.json",
        "url": "https://www.uci-india.com/index.html",
        "title": "UCI-INDIA"
    },
    {
        "filename": "Salesforce-Solutions_html.json",
        "url": "https://www.uci-india.com/Salesforce-Solutions.html",
        "title": "UCI-INDIA"
    },
    {
        "filename": "about_html.json",
        "url": "https://www.uci-india.com/about.html",
        "title": "UCI-INDIA"
    },
    {
        "filename": "Microsoft-Solutions_html.json",
        "url": "https://www.uci-india.com/Microsoft-Solutions.html",
        "title": "UCI"
    },
    {
        "filename": "terms-conditions_html.json",
        "url": "https://www.uci-india.com/terms-conditions.html",
        "title": "404 Not Found"
    },
    {
        "filename": "System-DevOps-Solutions_html.json",
        "url": "https://www.uci-india.com/System-DevOps-Solutions.html",
        "title": "404 Not Found"
    },
    {
        "filename": "System-Integration-Services_html.json",
        "url": "https://www.uci-india.com/System-Integration-Services.html",
        "title": "404 Not Found"
    },
    {
        "filename": "Google-AI-Solutions_html.json",
        "url": "https://www.uci-india.com/Google-AI-Solutions.html",
        "title": "404 Not Found"
    },
    {
        "filename": "privacy-policy_html.json",
        "url": "https://www.uci-india.com/privacy-policy.html",
        "title": "404 Not Found"
    },
    {
        "filename": "applicationForm_html.json",
        "url": "https://www.uci-india.com/applicationForm.html",
        "title": "UCI-INDIA"
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
