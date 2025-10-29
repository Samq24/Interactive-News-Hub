    function createNewsCard(news) {
        const card = document.createElement('a');
        card.href = "#";
        card.className = 'news-card';
        card.setAttribute('role', 'article');
        card.innerHTML = `
            <img src="${news.image}" alt="${news.title}" class="news-card-image">
            <div class="news-card-content">
                <h2>${news.title}</h2>
                <p>${news.summary}</p>
            </div>
        `;
        return card;
    }

    function createListNewsItem(news) {
    const container = document.createElement('div');
    container.className = 'more-news-item';

    container.innerHTML = `
        <img src="${news.image}" alt="${news.title}" class="more-news-img">
        <div class="more-news-text">
            <h3>${news.title}</h3>
            <p>${news.summary}</p>
        </div>
    `;
    return container;
    }

    function renderNewsSection(containerID, newsArray) {
        const container = document.getElementById(containerID);
        newsArray.forEach(news => {
            const card = createNewsCard(news);
            container.appendChild(card);
        });
    }

    async function loadNews() {
        try {
            const response = await fetch('news.json');
            const newsData = await response.json();

            renderNewsSection('breaking-news-container', newsData.breakingNews);
            
            const moreNewsContainer = document.getElementById('more-news-container');
            moreNewsContainer.classList.add('more-news-section');

            const categories = ['world', 'technology', 'sports'];
            categories.forEach(category => {
                const sectionTitle = document.createElement('h2');
                sectionTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                moreNewsContainer.appendChild(sectionTitle);

                newsData[category].forEach(news => {
                    const newsItem = createListNewsItem(news);
                    moreNewsContainer.appendChild(newsItem);
                });
            });
        } catch (err) {
            console.error('Error loading news JSON:', err);        
        }

    }

    function addScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.news-card, .more-news-item').forEach(card => observer.observe(card));
    }
    window.addEventListener('DOMContentLoaded', () => {
        loadNews().then(() => addScrollAnimation());
    });