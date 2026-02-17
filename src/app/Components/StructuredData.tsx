import Script from 'next/script'

export default function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "FinancialService",
        "name": "Stockology Securities Private Limited",
        "alternateName": "Stockology",
        "url": "https://stockology.in",
        "logo": "https://stockology.in/stklogo.png",
        "description": "India's leading stock broker offering zero brokerage trading, free demat account, mutual funds, and IPO investments.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "111, Krishna Business Center, Vijay Nagar",
            "addressLocality": "Indore",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "452010",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-731-4258021",
            "contactType": "customer service",
            "email": "support@stockologysecurities.com",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
        },
        "sameAs": [
            "https://www.facebook.com/stockology",
            "https://twitter.com/stockology",
            "https://www.linkedin.com/company/stockology",
            "https://www.instagram.com/stockology"
        ],
        "foundingDate": "2021",
        "legalName": "Stockology Securities Private Limited",
        "taxID": "U65929MP2021PTC058908",
        "memberOf": {
            "@type": "Organization",
            "name": "National Stock Exchange of India",
            "alternateName": "NSE"
        }
    }

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Stock Broking Services",
        "provider": {
            "@type": "FinancialService",
            "name": "Stockology Securities Private Limited"
        },
        "areaServed": {
            "@type": "Country",
            "name": "India"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Stock Trading Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Equity Trading",
                        "description": "Trade in stocks with zero brokerage charges"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Mutual Funds",
                        "description": "Invest in mutual funds with expert guidance"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "IPO Investment",
                        "description": "Apply for IPOs and invest in emerging companies"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Demat Account",
                        "description": "Free demat account with lowest maintenance charges"
                    }
                }
            ]
        }
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://stockology.in"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://stockology.in/Service"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Pricing",
                "item": "https://stockology.in/Pricing"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Open Demat Account",
                "item": "https://stockology.in/Open-demate"
            }
        ]
    }

    return (
        <>
            <Script
                id="organization-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <Script
                id="service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceSchema),
                }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
        </>
    )
}
