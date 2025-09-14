// generate-articles-json.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(__dirname, 'content/actualites');
const outputFile = path.join(articlesDir, 'articles.json');

function generateJSON() {
    const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.md'));
    const articles = files.map(file => {
        const filePath = path.join(articlesDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent); // front matter + markdown

        return {
            title: data.title || 'Sans titre',
            date: data.date || new Date().toISOString().split('T')[0],
            body: content,
            image: data.image || ''
        };
    });

    // Tri par date décroissante
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2), 'utf8');
    console.log(`✅ articles.json généré avec ${articles.length} article(s)`);
}

generateJSON();
