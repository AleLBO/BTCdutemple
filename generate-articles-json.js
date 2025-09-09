const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(__dirname, 'content/actualites');
const outputFile = path.join(articlesDir, 'articles.json');

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
const articles = files.map(file => {
  const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
  const { data, content: body } = matter(content);
  return {
    title: data.title,
    date: data.date,
    body
  };
});

fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
console.log('articles.json généré !');