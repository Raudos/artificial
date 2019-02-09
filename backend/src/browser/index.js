const puppeteer = require('puppeteer');
const $ = require('cheerio');

const OfferModel = require('../models/Offer');

const moreButtonSelector = 'td a.morelink';

async function getComments(page, comments = []) {
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  
  $('.comment-tree > tbody > tr', bodyHTML).each(function() {
    if ($('.ind img', this).attr('width') === '0') {
      comments.push(new OfferModel($('.comment', this).text()));
    }
  });

  const showMoreButton = $(moreButtonSelector, bodyHTML);
  if (showMoreButton.length) {
    await page.click(moreButtonSelector);
    await page.waitFor(2000);
    await getComments(page, comments);
  }
  
  return comments;
}

module.exports = async (id = '') => {
  if (!id) {
    throw { message: 'No ID provided' };
  }
  
  const browser = await puppeteer.launch({ headless: true });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`https://news.ycombinator.com/item?id=${id}`);
    await page.waitForSelector('#hnmain', { timeout: 3000 });

    const comments = await getComments(page);
    
    await browser.close();
    
    return comments;
  } catch (error) {
    await browser.close();

    throw { message: `${error.name}: ${error.message}` };
  }
};
