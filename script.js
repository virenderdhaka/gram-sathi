document.addEventListener('DOMContentLoaded', () => {

    // Helper function to create HTML elements
    const createElement = (tag, attributes = {}, ...children) => {
        const element = document.createElement(tag);
        for (const key in attributes) {
            if (key === 'className') {
                element.className = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        }
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        return element;
    };

    // --- Data (This would typically come from a backend API) ---
    const schemesData = [
        {
            name: "प्रधानमंत्री आवास योजना",
            description: "गरीबों को पक्के घर उपलब्ध कराने के लिए।",
            details: "यह योजना शहरी और ग्रामीण दोनों क्षेत्रों में लागू है। पात्रता मानदंड, आवेदन प्रक्रिया और आवश्यक दस्तावेज़ों के बारे में जानकारी प्राप्त करें।",
            eligibility: "भारत का नागरिक होना, कच्चा मकान होना, आदि।",
            documents: "आधार कार्ड, आय प्रमाण पत्र, निवास प्रमाण पत्र, आदि।"
        },
        {
            name: "किसान सम्मान निधि योजना",
            description: "किसानों को वित्तीय सहायता प्रदान करने के लिए।",
            details: "प्रत्येक पात्र किसान परिवार को प्रति वर्ष ₹6,000 की वित्तीय सहायता तीन समान किस्तों में दी जाती है।",
            eligibility: "छोटे और सीमांत किसान।",
            documents: "आधार कार्ड, बैंक खाता पासबुक, भूमि रिकॉर्ड।"
        },
        {
            name: "आयुष्मान भारत योजना",
            description: "स्वास्थ्य बीमा कवर प्रदान करने के लिए।",
            details: "यह दुनिया का सबसे बड़ा सरकारी वित्त पोषित स्वास्थ्य सेवा कार्यक्रम है जो प्रति परिवार ₹5 लाख तक का स्वास्थ्य कवर प्रदान करता है।",
            eligibility: "सामाजिक-आर्थिक जाति जनगणना (SECC) में सूचीबद्ध परिवार।",
            documents: "SECC कार्ड, आधार कार्ड।"
        },
    ];

    const mandiRatesData = [
        { crop: "गेहूं", min: "₹2,250", max: "₹2,400", avg: "₹2,325", mandi: "गाँव की मंडी" },
        { crop: "चना", min: "₹5,200", max: "₹5,500", avg: "₹5,350", mandi: "गाँव की मंडी" },
        { crop: "सरसों", min: "₹5,700", max: "₹6,000", avg: "₹5,850", mandi: "गाँव की मंडी" },
    ];

    const newsData = [
        { title: "गाँव में सोलर लाइट लगाने का कार्य शुरू", image: "https://via.placeholder.com/350x200.png?text=Solar+Lights", summary: "यह पहल गाँव में बिजली की समस्या को कम करेगी।" },
        { title: "कृषि मेले का आयोजन, किसानों को मिली नई जानकारी", image: "https://via.placeholder.com/350x200.png?text=Krishi+Mela", summary: "मेले में विशेषज्ञों ने उन्नत खेती के तरीकों पर चर्चा की।" },
        { title: "स्वच्छता अभियान में गाँव ने लिया बढ़-चढ़कर भाग", image: "https://via.placeholder.com/350x200.png?text=Clean+Village", summary: "यह अभियान गाँव को स्वच्छ और सुंदर बनाने के लिए चलाया गया।" },
    ];

    // --- Render Functions ---

    // Render Government Schemes
    const renderSchemes = (schemes) => {
        const schemesList = document.getElementById('schemes-list');
        schemesList.innerHTML = '';
        if (schemes.length === 0) {
            schemesList.innerHTML = `<p style="text-align: center;">कोई योजना नहीं मिली।</p>`;
            return;
        }
        schemes.forEach(scheme => {
            const card = createElement('div', { className: 'scheme-card' },
                createElement('h3', {}, scheme.name),
                createElement('p', {}, scheme.description),
                createElement('a', { href: '#', className: 'cta-button' }, "अधिक जानें")
            );
            schemesList.appendChild(card);
        });
    };

    // Render Mandi Rates
    const renderMandiRates = (rates) => {
        const mandiRatesBody = document.getElementById('mandi-rates-body');
        mandiRatesBody.innerHTML = '';
        rates.forEach(rate => {
            const row = createElement('tr', {},
                createElement('td', {}, rate.crop),
                createElement('td', {}, rate.min),
                createElement('td', {}, rate.max),
                createElement('td', {}, rate.avg),
                createElement('td', {}, rate.mandi)
            );
            mandiRatesBody.appendChild(row);
        });
    };

    // Render News
    const renderNews = (news) => {
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = '';
        news.forEach(item => {
            const card = createElement('div', { className: 'news-card' },
                createElement('img', { src: item.image, alt: item.title }),
                createElement('h3', {}, item.title),
                createElement('p', {}, item.summary)
            );
            newsList.appendChild(card);
        });
    };

    // --- Event Listeners ---

    // Scheme Search
    const schemeSearch = document.getElementById('scheme-search');
    schemeSearch.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredSchemes = schemesData.filter(scheme =>
            scheme.name.toLowerCase().includes(searchTerm) ||
            scheme.description.toLowerCase().includes(searchTerm)
        );
        renderSchemes(filteredSchemes);
    });

    // Modal functionality
    const registerModal = document.getElementById('register-modal');
    const ctaButton = document.querySelector('.cta-button');
    const closeButton = document.querySelector('.close-button');

    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });

    // Form Submissions (for demonstration purposes, shows an alert)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('फॉर्म जमा हो गया है। आपका धन्यवाद!');
            form.reset();
        });
    });

    // Initial render of all sections
    renderSchemes(schemesData);
    renderMandiRates(mandiRatesData);
    renderNews(newsData);
});