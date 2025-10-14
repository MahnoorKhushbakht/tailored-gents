import cheerio from 'cheerio';

export const parseHTMLContent = (htmlContent) => {
  const $ = cheerio.load(htmlContent);
const contentArray = [];
  $('details').each((index, element) => {
    const summary = $(element).find('summary').text().trim();
    const price = $('p').last().text().trim();
    const paragraph = $(element).find('p').eq(1).text().trim();
    const regex = /<img.*?src="(.*?)".*?>/g;
    const match = regex.exec(htmlContent);
    const imageUrl = match ? match[1] : null;
    const feature = $('figure.wp-block-image.size-full img').eq(1).attr('src');
    const $content = $('<div>').html(htmlContent);
    const table = $content.find('figure.wp-block-table').html();

    contentArray.push({ summary, paragraph, imageUrl,table,feature,price });

  });

  return contentArray;
};



